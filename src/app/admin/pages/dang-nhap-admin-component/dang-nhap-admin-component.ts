import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export type AdminStep = 'RSA_GATE' | 'STEALTH_PIN' | 'LOGIN_FORM' | 'LOCKED' | '2FA_RSA' | 'FORGOT_PASSWORD';

@Component({
  selector: 'app-dang-nhap-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './dang-nhap-admin-component.html',
  styleUrl: './dang-nhap-admin-component.css'
})
export class DangNhapAdminComponent implements OnInit, OnDestroy {
  currentStep: AdminStep = 'RSA_GATE';
  rsaStatus: 'WAITING' | 'DENIED' | 'SUCCESS' = 'WAITING';

  private typedBuffer: string = '';

  loginForm: FormGroup;
  forgotForm: FormGroup;
  isSubmitted: boolean = false;

  loginAttempts: number = 0;
  isLoginError: boolean = false;
  errorMessage: string = '';

  lockTimeLeft: number = 300;
  lockTimerInterval: any;

  otpRsa: string = '';
  otpError: string = '';

  otpResendCountdown: number = 59;
  otpTimerInterval: any;
  forgotSuccessMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      matKhau: ['', [Validators.required]]
    });

    this.forgotForm = this.fb.group({
      emailAdmin: ['', [Validators.required, Validators.email]],
      maOtpEmail: ['', [Validators.required]],
      maToken2FA: ['', [Validators.required]],
      matKhauMoi: ['', [Validators.required, Validators.minLength(6)]],
      nhapLaiMatKhauMoi: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.chayKiemTraRsa();

    // 🟢 LẮNG NGHE SỰ THAY ĐỔI FORM: Nếu đang sửa lại thông tin, tự xóa thông báo lỗi chung
    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage === 'Vui lòng điền đầy đủ thông tin bên dưới!' && this.loginForm.valid) {
        this.errorMessage = '';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.lockTimerInterval) clearInterval(this.lockTimerInterval);
    if (this.otpTimerInterval) clearInterval(this.otpTimerInterval);
  }

  // 🟢 GETTER KIỂM TRA LỖI Ô EMAIL (Dynamic Real-time)
  get emailInvalid(): boolean {
    const control = this.loginForm.get('email');
    return !!(control && control.invalid && (control.touched || control.dirty || this.isSubmitted));
  }

  // 🟢 GETTER KIỂM TRA LỖI Ô MẬT KHẨU (Dynamic Real-time)
  get matKhauInvalid(): boolean {
    const control = this.loginForm.get('matKhau');
    return !!(control && control.invalid && (control.touched || control.dirty || this.isSubmitted));
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Không xử lý chuỗi bí mật bằng bàn phím ở frontend.
  }
  chayKiemTraRsa(): void {
  this.rsaStatus = 'WAITING';
  this.typedBuffer = '';
  }

  // 🟢 XỬ LÝ ĐĂNG NHẬP
  xuLyDangNhap(): void {
    this.isSubmitted = true;

    // Nếu để trống hoặc sai định dạng -> Tô đỏ ô lỗi + Hiện dòng cảnh báo chung
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin bên dưới!';
      return;
    }

    const { email, matKhau } = this.loginForm.value;

    // Đăng nhập thành công
    if (email === 'admin@steam.com' && matKhau === '123456') {
      this.isLoginError = false;
      this.errorMessage = '';
      this.loginAttempts = 0;
      this.currentStep = '2FA_RSA';
    } else {
      // Đăng nhập sai tài khoản/mật khẩu
      this.loginAttempts++;
      this.isLoginError = true;

      if (this.loginAttempts >= 3) {
        this.currentStep = 'LOCKED';
        this.batDauDemNguocKhoa();
      } else {
        this.errorMessage = 'Mật khẩu hoặc email không chính xác!';
      }
    }
  }

  batDauDemNguocKhoa(): void {
    this.lockTimeLeft = 300;
    if (this.lockTimerInterval) clearInterval(this.lockTimerInterval);

    this.lockTimerInterval = setInterval(() => {
      if (this.lockTimeLeft > 0) {
        this.lockTimeLeft--;
      } else {
        clearInterval(this.lockTimerInterval);
      }
    }, 1000);
  }

  get formatLockTime(): string {
    const minutes = Math.floor(this.lockTimeLeft / 60);
    const seconds = this.lockTimeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  thuLaiKhiBiKhoa(): void {
    if (this.lockTimeLeft <= 0) {
      this.loginAttempts = 0;
      this.isLoginError = false;
      this.isSubmitted = false;
      this.errorMessage = '';
      this.currentStep = 'LOGIN_FORM';
    }
  }

  xacNhanOtpRsa(): void {
    if (this.otpRsa.length < 6) {
      this.otpError = 'Vui lòng nhập đủ 6 chữ số mã Token RSA!';
      return;
    }

    localStorage.setItem('admin_token', 'stealth-rsa-authenticated-token-2026');
    this.router.navigate(['/admin/dashboard']);
  }

  moQuenMatKhau(): void {
    this.currentStep = 'FORGOT_PASSWORD';
    this.batDauDemNguocOtp();
  }

  batDauDemNguocOtp(): void {
    this.otpResendCountdown = 59;
    if (this.otpTimerInterval) clearInterval(this.otpTimerInterval);

    this.otpTimerInterval = setInterval(() => {
      if (this.otpResendCountdown > 0) {
        this.otpResendCountdown--;
      } else {
        clearInterval(this.otpTimerInterval);
      }
    }, 1000);
  }

  guiLaiOtpEmail(): void {
    this.batDauDemNguocOtp();
  }

  xuLyDatLaiMatKhau(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.forgotSuccessMessage = '📌 Đặt lại mật khẩu thành công!';
    setTimeout(() => {
      this.forgotSuccessMessage = '';
      this.quayLaiLoginForm();
    }, 1200);
  }

  quayLaiLoginForm(): void {
    this.currentStep = 'LOGIN_FORM';
    this.isLoginError = false;
    this.isSubmitted = false;
    this.errorMessage = '';
    this.otpError = '';
  }
}