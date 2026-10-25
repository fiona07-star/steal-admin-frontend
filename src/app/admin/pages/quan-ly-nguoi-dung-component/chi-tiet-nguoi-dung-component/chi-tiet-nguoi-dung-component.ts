import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanTri } from '../../../../services/quan-tri';
import { DonHangKhach, RefundRequestEntity, ReviewEntity } from '../../../../models/tai-khoan';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chi-tiet-nguoi-dung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chi-tiet-nguoi-dung-component.html',
  styleUrl: './chi-tiet-nguoi-dung-component.css'
})
export class ChiTietNguoiDungComponent implements OnInit {
  maKhachHang = '';
  tabHienTai: 'lich-su' | 'thu-vien' | 'danh-gia' = 'lich-su';
  isLoading = false;

  khachHang: any = {
    maTaiKhoanNguoiDung: 'CUS-002',
    hoTen: 'Trần Thị Ly',
    tenTaiKhoanNguoiDung: 'lycute14',
    ngayDangKy: '02/08/2026',
    email: 'lytran14@gmail.com',
    soDienThoai: '0873652333',
    trangThaiKhoa: false,
    soNgayDaKhoa: 0,
    danhSachDonHang: [
      { stt: 1, maDonHang: 'ORD-2026-09', ngayTao: '02/09/2026', danhsachGame: 'Black Myth: Wukong', tongTien: 1299000, phuongThucThanhToan: 'Paypal', trangThaiDonHang: 'thanh_cong' },
      { stt: 2, maDonHang: 'ORD-2026-09', ngayTao: '02/09/2026', danhsachGame: 'It Takes Two', tongTien: 400000, phuongThucThanhToan: 'Paypal', trangThaiDonHang: 'thanh_cong' },
      { stt: 3, maDonHang: 'ORD-2026-22', ngayTao: '15/09/2026', danhsachGame: 'Lethal Company', tongTien: 140000, phuongThucThanhToan: 'Momo', trangThaiDonHang: 'da_huy' },
      { stt: 4, maDonHang: 'ORD-2026-26', ngayTao: '17/09/2026', danhsachGame: 'Elden Ring', tongTien: 891000, phuongThucThanhToan: 'Vnpay', trangThaiDonHang: 'thanh_cong' },
      { stt: 5, maDonHang: 'ORD-2026-33', ngayTao: '18/09/2026', danhsachGame: 'Dead by Daylight', tongTien: 115000, phuongThucThanhToan: 'Paypal', trangThaiDonHang: 'thanh_cong' },
      { stt: 6, maDonHang: 'ORD-2026-44', ngayTao: '24/09/2026', danhsachGame: 'Civilization VI', tongTien: 792000, phuongThucThanhToan: 'Vnpay', trangThaiDonHang: 'hoan_tien' },
      { stt: 7, maDonHang: 'ORD-2026-46', ngayTao: '27/09/2026', danhsachGame: 'Hades II', tongTien: 1299000, phuongThucThanhToan: 'Momo', trangThaiDonHang: 'da_huy' },
      { stt: 8, maDonHang: 'ORD-2026-47', ngayTao: '28/09/2026', danhsachGame: 'Elden Ring, Terraria', tongTien: 499000, phuongThucThanhToan: 'Paypal', trangThaiDonHang: 'thanh_cong' },
      { stt: 9, maDonHang: 'ORD-2026-50', ngayTao: '30/09/2026', danhsachGame: 'Stray', tongTien: 378000, phuongThucThanhToan: 'Paypal', trangThaiDonHang: 'thanh_cong' }
    ]
  };

  // ĐÃ SỬA: Đã bổ sung maGame đầy đủ cho mọi phần tử trong danhSachReviews
  danhSachReviews: ReviewEntity[] = [
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      maGame: 'ACT01',
      tenGame: 'Black Myth: Wukong',
      danhGia: 'khuyen_dung',
      noiDung: 'Đồ họa Unreal Engine 5 quá đỉnh cao, combat cực kỳ đã tay và đậm chất Tây Du Ký. Đáng đồng tiền bát gạo!',
      ngayDanhGia: '02/09/2026',
      trangThai: 'hien_thi',
      anhGame: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605034/3781973_rqamx9.png'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      maGame: 'ACT01',
      tenGame: 'Black Myth: Wukong',
      danhGia: 'khong_khuyen_dung',
      noiDung: 'Game dở, chơi lag mọi người đừng mua nha!',
      ngayDanhGia: '02/09/2026',
      trangThai: 'an',
      anhGame: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605034/3781973_rqamx9.png'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      maGame: 'ACT01',
      tenGame: 'Black Myth: Wukong',
      danhGia: 'khuyen_dung',
      noiDung: 'Đồ họa Unreal Engine 5 quá đỉnh cao, combat cực kỳ đã tay và đậm chất Tây Du Ký. Đáng đồng tiền bát gạo!',
      ngayDanhGia: '02/09/2026',
      trangThai: 'hien_thi',
      anhGame: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605034/3781973_rqamx9.png'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      maGame: 'ACT02',
      tenGame: 'Elden Ring',
      danhGia: 'khuyen_dung',
      noiDung: 'Siêu phẩm GOTY không còn gì để chê, thế giới mở rộng lớn và vô vàn bí ẩn.',
      ngayDanhGia: '17/09/2026',
      trangThai: 'hien_thi',
      anhGame: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605034/3781973_rqamx9.png'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      maGame: 'ADV01',
      tenGame: 'It Takes Two',
      danhGia: 'khuyen_dung',
      noiDung: 'Game co-op 2 người hay nhất từng chơi với bạn gái!',
      ngayDanhGia: '10/09/2026',
      trangThai: 'hien_thi',
      anhGame: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605034/3781973_rqamx9.png'
    }
  ];

  danhSachRefundRequests: RefundRequestEntity[] = [
    {
      maDonHang: 'ORD-2026-44',
      maTaiKhoan: 'CUS-002',
      tenGame: 'Civilization VI',
      lyDoKhachHang: 'Game bị lỗi crash, không khởi động được',
      trangThaiDonHang: 'cho_xu_ly',
      ngayYeuCau: '24/09/2026'
    },
    {
      maDonHang: 'ORD-2026-22',
      maTaiKhoan: 'CUS-002',
      tenGame: 'Lethal Company',
      lyDoKhachHang: 'Mua nhầm game, muốn đổi sang trò khác',
      trangThaiDonHang: 'tu_choi',
      ngayYeuCau: '16/09/2026'
    },
    {
      maDonHang: 'ORD-2026-11',
      maTaiKhoan: 'CUS-002',
      tenGame: 'Stray',
      lyDoKhachHang: 'Máy cấu hình yếu không chơi mượt được',
      trangThaiDonHang: 'hoan_tien',
      ngayYeuCau: '05/09/2026'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quanTriService: QuanTri
  ) {}

  ngOnInit(): void {
    this.maKhachHang = this.route.snapshot.paramMap.get('id') || 'CUS-002';
    this.taiChiTietKhachHang();
  }

  taiChiTietKhachHang(): void {
    if (!this.maKhachHang) return;
    this.isLoading = true;
    this.quanTriService.layChiTietKhachHang(this.maKhachHang).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res) {
          if (res.khachHang) this.khachHang = res.khachHang;
          if (res.danhSachReviews) this.danhSachReviews = res.danhSachReviews;
          if (res.danhSachRefundRequests) this.danhSachRefundRequests = res.danhSachRefundRequests;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
      }
    });
  }

  get tongDonHang(): number {
    if (!this.khachHang?.danhSachDonHang) return 0;
    return this.khachHang.danhSachDonHang.length;
  }

  get tongChiTieu(): number {
    if (!this.khachHang?.danhSachDonHang) return 0;
    return this.khachHang.danhSachDonHang
      .filter((item: any) => item.trangThaiDonHang === 'thanh_cong' || item.trangThai === 'Thành công')
      .reduce((sum: number, item: any) => sum + (Number(item.tongTien) || 0), 0);
  }

  get danhSachGameThuVien(): Array<{ tenGame: string; ngayMua: string; anhGame: string }> {
    if (!this.khachHang?.danhSachDonHang) return [];
    const result: Array<{ tenGame: string; ngayMua: string; anhGame: string }> = [];

    this.khachHang.danhSachDonHang.forEach((item: any) => {
      if (item.trangThaiDonHang === 'thanh_cong' || item.trangThai === 'Thành công') {
        const strGame = item.danhsachGame || item.game || '';
        const listGameName = strGame.split(',').map((g: string) => g.trim()).filter(Boolean);
        listGameName.forEach((gName: string) => {
          result.push({
            tenGame: gName,
            ngayMua: item.ngayTao || item.ngay,
            anhGame: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65"><rect width="65" height="65" fill="%23c0392b"/><circle cx="32" cy="32" r="20" fill="%23e67e22"/><circle cx="25" cy="27" r="3" fill="%23000"/><circle cx="39" cy="27" r="3" fill="%23000"/><polygon points="32,33 28,39 36,39" fill="%23f1c40f"/></svg>'
          });
        });
      }
    });
    return result;
  }

  get gameSoHuu(): number {
    return this.danhSachGameThuVien.length;
  }

  quayLai(): void {
    window.history.back();
  }

  chuyenTab(tab: 'lich-su' | 'thu-vien' | 'danh-gia'): void {
    this.tabHienTai = tab;
  }

  thayDoiTrangThaiKhoa(): void {
    this.khachHang.trangThaiKhoa = !this.khachHang.trangThaiKhoa;
    this.khachHang.soNgayDaKhoa = this.khachHang.trangThaiKhoa ? 1 : 0;
  }

  toggleHienThiDanhGia(item: any): void {
    if (item.trangThai === 'hien_thi' || item.isHienThi) {
      item.trangThai = 'an';
      item.isHienThi = false;
    } else {
      item.trangThai = 'hien_thi';
      item.isHienThi = true;
    }
  }

  cuonNgangSangPhai(element: HTMLElement): void {
    element.scrollBy({ left: 310, behavior: 'smooth' });
  }

  formatTrangThaiDonHang(order: any): string {
    const status = order.trangThaiDonHang || order.trangThai;
    if (status === 'thanh_cong' || status === 'Thành công') return 'Thành công';
    if (status === 'da_huy' || status === 'Đã hủy') return 'Đã hủy';
    if (status === 'hoan_tien' || status === 'Đã hoàn tiền') return 'Đã hoàn tiền';
    return status;
  }

  formatTrangThaiHoanTien(status: string): string {
    if (status === 'cho_xu_ly' || status === 'Chờ xử lý') return 'Chờ xử lý';
    if (status === 'hoan_tien' || status === 'Đã hoàn tiền') return 'Đã hoàn tiền';
    if (status === 'tu_choi' || status === 'Từ chối') return 'Từ chối';
    return status || 'Chờ xử lý';
  }

  dinhDangTien(val: number): string {
    return new Intl.NumberFormat('vi-VN').format(val || 0) + 'đ';
  }

  // Thêm state vào class ChiTietNguoiDungComponent

  hienModalHoanTien = false;
  thongTinHoanTienChon: any = null;

  moModalChiTietHoanTien(rfItem: any): void {
    this.thongTinHoanTienChon = rfItem;
    this.hienModalHoanTien = true;
  }

  dongModalHoanTien(): void {
    this.hienModalHoanTien = false;
    this.thongTinHoanTienChon = null;
  }

  // State điều khiển Modal Khóa tài khoản
  hienModalKhoa = false;
  lyDoKhoaInput = '';

  
  xuLyBamNutKhoaTaiKhoan(): void {
    if (this.khachHang.trangThaiKhoa) {
      // Logic mở khóa
      this.khachHang.trangThaiKhoa = false;
      this.khachHang.soNgayDaKhoa = 0;
      this.khachHang.lyDoKhoa = '';
      this.khachHang.ngayKhoa = '';

      const targetId = this.khachHang.maTaiKhoanNguoiDung || this.khachHang.id;
      this.quanTriService.capNhatTrangThaiKhoa(targetId, false).subscribe();
    } else {
      // Logic bật Modal nhập lý do khóa
      this.lyDoKhoaInput = '';
      this.hienModalKhoa = true;
    }
  }

  // HÀM XÁC NHẬN KHÓA TÀI KHOẢN KHI BẤM NÚT TRONG MODAL
  xacNhanKhoaTaiKhoan(): void {
    const today = new Date();
    const ngayDinhDang = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    this.khachHang.trangThaiKhoa = true;
    this.khachHang.soNgayDaKhoa = 1;
    this.khachHang.lyDoKhoa = this.lyDoKhoaInput.trim() || 'Vi phạm chính sách';
    this.khachHang.ngayKhoa = ngayDinhDang;

    const targetId = this.khachHang.maTaiKhoanNguoiDung || this.khachHang.id;

    this.quanTriService.capNhatTrangThaiKhoa(targetId, true, this.khachHang.lyDoKhoa, ngayDinhDang).subscribe({
      next: () => {
        this.hienModalKhoa = false;
        this.lyDoKhoaInput = '';
      }
    });
  }

  dongModalKhoa(): void {
    this.hienModalKhoa = false;
    this.lyDoKhoaInput = '';
  }

  chonLyDoMau(lyDo: string): void {
    this.lyDoKhoaInput = lyDo;
  }

  
}