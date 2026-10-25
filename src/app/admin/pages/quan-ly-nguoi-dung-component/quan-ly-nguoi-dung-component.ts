import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuanTri } from '../../../services/quan-tri';

export interface KhachHang {
  maTaiKhoanNguoiDung: string;
  tenTaiKhoanNguoiDung: string;
  hoTen: string;
  email: string;
  anhDaiDien: string | null;
  trangThaiKhoa: boolean;
  tongChiTieu: number;
  tongDon: number;
  soNgayDaKhoa: number;
}

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quan-ly-nguoi-dung-component.html',
  styleUrl: './quan-ly-nguoi-dung-component.css'
})
export class QuanLyNguoiDungComponent implements OnInit {
  tuKhoa = '';
  trangThaiTam = '';
  chiTieuTam = '';
  trangHienTai = 1;
  soDongMoiTrang = 12;

  // 1. Khai báo gán sẵn dữ liệu mẫu
  danhSachKhachHang: KhachHang[] = this.taoDuLieuMau();

  constructor(
    private router: Router,
    private quanTriService: QuanTri
  ) {}

  ngOnInit(): void {
    this.taiDanhSachKhachHang();
  }

  // TẢI DANH SÁCH KHÁCH HÀNG
  taiDanhSachKhachHang(): void {
    this.quanTriService.layDanhSachKhachHang().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // SỬA LỖI: Cập nhật đúng biến danhSachKhachHang
          this.danhSachKhachHang = data;
        }
      },
      error: (err) => {
        console.error('Lỗi tải danh sách người dùng:', err);
      }
    });
  }

  // Hàm tạo dữ liệu mẫu 25 khách hàng
  private taoDuLieuMau(): KhachHang[] {
    const tenMaus = ['Trần Thị Ly', 'Nguyễn Minh Anh', 'Lê Hoàng Nam', 'Phạm Đức Huy', 'Vũ Bích Phương', 'Hoàng Anh Tuấn'];
    const userMaus = ['lycute14', 'minhanh_99', 'namgamer', 'huypro2026', 'phuong_vu', 'tuan_stealth'];

    return Array.from({ length: 25 }, (_, index) => {
      const isLocked = index % 4 === 1;
      return {
        maTaiKhoanNguoiDung: index === 0 ? '0654362' : `CUS-${(index + 1).toString().padStart(3, '0')}`,
        tenTaiKhoanNguoiDung: `${userMaus[index % userMaus.length]}${index > 5 ? index : ''}`,
        hoTen: tenMaus[index % tenMaus.length],
        email: `user${index + 1}@gmail.com`,
        anhDaiDien: null,
        trangThaiKhoa: isLocked,
        tongChiTieu: (index + 1) * 450000 + 500000,
        tongDon: (index % 10) + 1,
        soNgayDaKhoa: isLocked ? (index % 7) + 1 : 0
      };
    });
  }

  get tongTaiKhoan(): number {
    return this.danhSachKhachHang.length;
  }

  get danhSachDaLoc(): KhachHang[] {
    return this.danhSachKhachHang.filter(kh => {
      const khopTuKhoa = this.khopTuKhoa(kh);

      const khopTrangThai =
        !this.trangThaiTam ||
        (this.trangThaiTam === 'hoat-dong' && !kh.trangThaiKhoa) ||
        (this.trangThaiTam === 'da-khoa' && kh.trangThaiKhoa);

      const khopChiTieu =
        !this.chiTieuTam ||
        (this.chiTieuTam === 'duoi-1m' && kh.tongChiTieu < 1000000) ||
        (this.chiTieuTam === '1m-5m' &&
          kh.tongChiTieu >= 1000000 &&
          kh.tongChiTieu <= 5000000) ||
        (this.chiTieuTam === 'tren-5m' && kh.tongChiTieu > 5000000);

      return khopTuKhoa && khopTrangThai && khopChiTieu;
    });
  }

  private khopTuKhoa(kh: KhachHang): boolean {
    const tuKhoa = this.tuKhoa.trim().toLowerCase();
    return (
      !tuKhoa ||
      kh.tenTaiKhoanNguoiDung.toLowerCase().includes(tuKhoa) ||
      kh.hoTen.toLowerCase().includes(tuKhoa) ||
      kh.email.toLowerCase().includes(tuKhoa)
    );
  }

  get danhSachHienThi(): KhachHang[] {
    return this.danhSachDaLoc;
  }

  locKhachHang(): void {
    this.trangHienTai = 1;
  }

  datLaiBoLoc(): void {
    this.tuKhoa = '';
    this.trangThaiTam = '';
    this.chiTieuTam = '';
    this.trangHienTai = 1;
  }

  lamMoi(): void {
    this.datLaiBoLoc();
    this.taiDanhSachKhachHang();
  }

  layChuCaiDaiDien(kh: KhachHang): string {
    return kh.hoTen.charAt(0).toUpperCase();
  }

  dinhDangTien(soTien: number): string {
    return new Intl.NumberFormat('vi-VN').format(soTien) + 'đ';
  }

  xemKhachHang(kh: KhachHang): void {
    this.router.navigate(['/admin/users', kh.maTaiKhoanNguoiDung]);
  }
}