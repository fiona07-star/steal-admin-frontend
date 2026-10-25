import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export type AuthStep = 
  | 'gate_waiting' 
  | 'gate_success' 
  | 'login_form' 
  | 'login_error' 
  | 'locked' 
  | '2fa' 
  | 'forgot_password';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dang-nhap-admin-component.html',
  styleUrl: './dang-nhap-admin-component.css'
})
export class DangNhapAdminComponent implements OnInit, OnDestroy {

  // Màn hình khởi tạo mặc định là Cổng bảo mật
  currentStep: AuthStep = 'gate_waiting';
  private stepHistory: AuthStep[] = [];

  // Chuỗi gõ bàn phím bí mật mở cổng
  private SECRET_CODE: string = 'STEAL2026';
  private typedSequence: string = '';

  // Form Đăng nhập
  loginEmail: string = '';
  loginPassword: string = '';
  failedAttempts: number = 0;
  attemptsLeft: number = 3;
  loginEmptyError: boolean = false; // Cờ báo lỗi bỏ trống thông tin

  // Khóa tạm thời 5 phút (300 giây)
  lockCountdown: number = 300;
  lockTimer: any = null;

  // 2FA RSA Hardware Token
  tokenDigits: string[] = ['', '', '', '', '', ''];
  rsaCountdown: number = 18;
  rsaTimer: any = null;

  // Form Khôi phục mật khẩu
  forgotForm = {
    email: '',
    otp: '',
    token2fa: '',
    newPassword: '',
    confirmPassword: ''
  };
  resendOtpCountdown: number = 59;
  otpTimer: any = null;

  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkLockStateOnLoad(); // Kiểm tra nếu đang trong thời gian 5 phút tạm khóa (chống F5)
      this.startRsaTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  // --- KIỂM TRA TRẠNG THÁI KHÓA 5 PHÚT KHI F5 RELOAD TRANG ---
  private checkLockStateOnLoad(): void {
    const lockUntil = localStorage.getItem('admin_lock_until');
    if (lockUntil) {
      const remainingSeconds = Math.ceil((parseInt(lockUntil, 10) - Date.now()) / 1000);
      if (remainingSeconds > 0) {
        this.lockCountdown = remainingSeconds;
        this.currentStep = 'locked';
        this.startLockTimer(false); // Tiếp tục đếm ngược
      } else {
        localStorage.removeItem('admin_lock_until');
      }
    }
  }

  // --- CHUYỂN MÀN HÌNH VÀ LƯU LỊCH SỬ DÙNG CHO NÚT QUAY LẠI ---
  chuyenStep(nextStep: AuthStep): void {
    if (this.currentStep !== nextStep) {
      this.stepHistory.push(this.currentStep);
      this.currentStep = nextStep;
    }

    if (this.isBrowser) {
      if (nextStep === 'locked') this.startLockTimer(true);
      if (nextStep === 'forgot_password') this.startOtpTimer();
    }
  }

  // --- NÚT QUAY LẠI TRANG TRƯỚC ĐÓ ---
  quayLai(): void {
    // Vô hiệu hóa nút quay lại khi đang trong thời gian tạm khóa 5 phút
    if (this.currentStep === 'locked' && this.lockCountdown > 0) {
      return;
    }

    if (this.stepHistory.length > 0) {
      const previousStep = this.stepHistory.pop()!;
      this.currentStep = previousStep;
    } else {
      this.currentStep = 'login_form';
    }
  }

  // --- LẮNG NGHE SỰ KIỆN GÕ PHÍM BÍ MẬT MỞ CỔNG AN NINH ---
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.currentStep !== 'gate_waiting') return;

    if (event.key.length === 1) {
      this.typedSequence += event.key.toUpperCase();

      if (this.typedSequence.length > this.SECRET_CODE.length) {
        this.typedSequence = this.typedSequence.substring(1);
      }

      if (this.typedSequence === this.SECRET_CODE) {
        this.currentStep = 'gate_success';
        setTimeout(() => {
          this.chuyenStep('login_form');
          this.typedSequence = '';
        }, 1200);
      }
    }
  }

  // --- BƯỚC 1: XỬ LÝ ĐĂNG NHẬP (CHECK RỖNG & KHÓA 5 PHÚT KHI SAI 3 LẦN) ---
  xuLyDangNhap(): void {
    this.loginEmptyError = false;

    // Kiểm tra bỏ trống thông tin
    if (!this.loginEmail.trim() || !this.loginPassword.trim()) {
      this.loginEmptyError = true;
      return;
    }

    if (this.loginEmail === 'admin@stealgame.vn' && this.loginPassword === '123456') {
      this.failedAttempts = 0;
      this.attemptsLeft = 3;
      this.chuyenStep('2fa');
    } else {
      this.failedAttempts++;
      this.attemptsLeft = 3 - this.failedAttempts;

      // Nhập sai 3 lần liên tiếp -> TẠM KHÓA 5 PHÚT
      if (this.failedAttempts >= 3) {
        this.chuyenStep('locked');
      } else {
        this.currentStep = 'login_error';
      }
    }
  }

  onTokenKeyup(event: any, index: number): void {
    const input = event.target;
    if (input.value && index < 5) {
      const nextInput = input.nextElementSibling;
      if (nextInput) nextInput.focus();
    }
  }

  // --- BƯỚC 2: XÁC THỰC 2FA RSA TOKEN ---
  xacNhan2FA(): void {
    const token = this.tokenDigits.join('');
    if (token.length < 6) {
      alert('Vui lòng nhập đủ 6 chữ số mã Token!');
      return;
    }

    if (this.isBrowser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify({ email: this.loginEmail }));
      localStorage.removeItem('admin_lock_until');
    }

    alert('Xác thực RSA thành công! Đang chuyển hướng vào Dashboard...');
    this.router.navigate(['/admin/dashboard']);
  }

  // --- BƯỚC 3: KHÔI PHỤC MẬT KHẨU ---
  datLaiMatKhau(): void {
    if (!this.forgotForm.email || !this.forgotForm.otp || !this.forgotForm.newPassword) {
      alert('Vui lòng nhập đầy đủ các thông tin bắt buộc (*)!');
      return;
    }
    if (this.forgotForm.newPassword !== this.forgotForm.confirmPassword) {
      alert('Mật khẩu nhập lại không khớp!');
      return;
    }

    this.failedAttempts = 0;
    this.attemptsLeft = 3;
    alert('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
    this.chuyenStep('login_form');
  }

  guiLaiOTP(): void {
    this.resendOtpCountdown = 59;
    if (this.isBrowser) this.startOtpTimer();
    alert('Đã gửi lại mã OTP về Email!');
  }

  // --- LOGIC BỘ ĐẾM NGƯỢC KHÓA 5 PHÚT ---
  startLockTimer(createNewTimestamp: boolean = true): void {
    if (createNewTimestamp) {
      this.lockCountdown = 300; // 5 phút = 300 giây
      const lockUntil = Date.now() + 300 * 1000;
      localStorage.setItem('admin_lock_until', lockUntil.toString());
    }

    clearInterval(this.lockTimer);
    this.lockTimer = setInterval(() => {
      if (this.lockCountdown > 0) {
        this.lockCountdown--;
      } else {
        clearInterval(this.lockTimer);
        localStorage.removeItem('admin_lock_until');
        
        // Reset lại lượt thử và TỰ ĐỘNG CHUYỂN VỀ FORM ĐĂNG NHẬP
        this.failedAttempts = 0;
        this.attemptsLeft = 3;
        this.currentStep = 'login_form';
      }
    }, 1000);
  }

  startRsaTimer(): void {
    this.rsaCountdown = 18;
    clearInterval(this.rsaTimer);
    this.rsaTimer = setInterval(() => {
      if (this.rsaCountdown > 0) this.rsaCountdown--;
      else this.rsaCountdown = 18;
    }, 1000);
  }

  startOtpTimer(): void {
    clearInterval(this.otpTimer);
    this.otpTimer = setInterval(() => {
      if (this.resendOtpCountdown > 0) this.resendOtpCountdown--;
      else clearInterval(this.otpTimer);
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  clearAllTimers(): void {
    clearInterval(this.lockTimer);
    clearInterval(this.rsaTimer);
    clearInterval(this.otpTimer);
  }

  onLogoError(event: any): void {
    event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="81" height="85" viewBox="0 0 24 24" fill="%2350407A"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
  }
}