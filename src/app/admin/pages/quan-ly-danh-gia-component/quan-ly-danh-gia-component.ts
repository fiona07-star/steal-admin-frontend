import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReviewEntity } from '../../../models/tai-khoan';
import { QuanTri } from '../../../services/quan-tri';

@Component({
  selector: 'app-quan-ly-danh-gia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quan-ly-danh-gia-component.html',
  styleUrl: './quan-ly-danh-gia-component.css'
})
export class QuanLyDanhGiaComponent implements OnInit {
  // Trạng thái bật/tắt các Dropdown
  isGameOpen = false;
  isStatusOpen = false;
  isSortOpen = false;

  // Từ khóa & giá trị bộ lọc
  tuKhoa = '';
  tuKhoaTimGame = '';
  
  boLocGame = '';
  boLocTrangThai = '';
  boLocSapXep = 'moi_nhat';

  // Thống kê số liệu
  tongDanhGia = 0;
  tyLeKhuyenDung = 0;
  soHienThi = 0;
  soDaAn = 0;
  soKhuyenDung = 0;
  soKhongKhuyenDung = 0;

  // Biến phục vụ Popup Modal xem chi tiết
  selectedReview: ReviewEntity | null = null;

  // Danh sách game hiển thị trong dropdown
  danhSachTenGame: string[] = ['Stray', 'Elden Ring', 'Cyberpunk 2077', 'God of War', 'Red Dead Redemption 2'];

  // DỮ LIỆU GỐC REVIEWENTITY
  danhSachGoc: ReviewEntity[] = [
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      tenTaiKhoanNguoiDung: 'lycute14',
      anhDaiDien: 'assets/images/user1.png',
      maGame: 'G01',
      tenGame: 'Stray',
      anhGame: 'assets/images/stray.png',
      danhGia: 'khuyen_dung',
      noiDung: 'Thế giới mở The Lands Between quá đẹp và sống động...',
      ngayDanhGia: '28/09/2026',
      trangThai: 'hien_thi'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      tenTaiKhoanNguoiDung: 'lycute14',
      anhDaiDien: 'assets/images/user1.png',
      maGame: 'G01',
      tenGame: 'Stray',
      anhGame: 'assets/images/stray.png',
      danhGia: 'khong_khuyen_dung',
      noiDung: 'Game bị giật lag trên card đồ họa GTX 1050...',
      ngayDanhGia: '25/09/2026',
      trangThai: 'an'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      tenTaiKhoanNguoiDung: 'lycute14',
      anhDaiDien: 'assets/images/user1.png',
      maGame: 'G01',
      tenGame: 'Stray',
      anhGame: 'assets/images/stray.png',
      danhGia: 'khuyen_dung',
      noiDung: 'Cốt truyện chú mèo đi lạc vô cùng xúc động.',
      ngayDanhGia: '30/09/2026',
      trangThai: 'hien_thi'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      tenTaiKhoanNguoiDung: 'lycute14',
      anhDaiDien: 'assets/images/user1.png',
      maGame: 'G01',
      tenGame: 'Stray',
      anhGame: 'assets/images/stray.png',
      danhGia: 'khuyen_dung',
      noiDung: 'Đồ họa chân thực, âm thanh ma mị ấn tượng.',
      ngayDanhGia: '28/09/2026',
      trangThai: 'hien_thi'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      tenTaiKhoanNguoiDung: 'lycute14',
      anhDaiDien: 'assets/images/user1.png',
      maGame: 'G01',
      tenGame: 'Stray',
      anhGame: 'assets/images/stray.png',
      danhGia: 'khong_khuyen_dung',
      noiDung: 'Nội dung ngắn so với mức giá đưa ra.',
      ngayDanhGia: '28/09/2026',
      trangThai: 'an'
    },
    {
      maTaiKhoanNguoiDung: 'CUS-002',
      tenTaiKhoanNguoiDung: 'lycute14',
      anhDaiDien: 'assets/images/user1.png',
      maGame: 'G01',
      tenGame: 'Stray',
      anhGame: 'assets/images/stray.png',
      danhGia: 'khuyen_dung',
      noiDung: 'Lối chơi giải đố vừa sức, nhẹ nhàng.',
      ngayDanhGia: '28/09/2026',
      trangThai: 'hien_thi'
    }
  ];

  danhSachHienThi: ReviewEntity[] = [];

  constructor(
    private router: Router,
    private quanTriService: QuanTri
  ) {}

  ngOnInit(): void {
    this.tinhThongKe();
    this.locDanhSach();
  }

  // ===== LOGIC DROPDOWN FILTER =====
  get danhSachGameLoc(): string[] {
    if (!this.tuKhoaTimGame.trim()) {
      return this.danhSachTenGame;
    }
    return this.danhSachTenGame.filter(g => 
      g.toLowerCase().includes(this.tuKhoaTimGame.toLowerCase())
    );
  }

  toggleDropdown(type: 'game' | 'status' | 'sort', event: Event) {
    event.stopPropagation();
    if (type === 'game') {
      this.isGameOpen = !this.isGameOpen;
      this.isStatusOpen = false;
      this.isSortOpen = false;
    } else if (type === 'status') {
      this.isStatusOpen = !this.isStatusOpen;
      this.isGameOpen = false;
      this.isSortOpen = false;
    } else if (type === 'sort') {
      this.isSortOpen = !this.isSortOpen;
      this.isGameOpen = false;
      this.isStatusOpen = false;
    }
  }

  selectGame(game: string) {
    this.boLocGame = game;
    this.isGameOpen = false;
    this.locDanhSach();
  }

  selectStatus(status: string) {
    this.boLocTrangThai = status;
    this.isStatusOpen = false;
    this.locDanhSach();
  }

  selectSort(sort: string) {
    this.boLocSapXep = sort;
    this.isSortOpen = false;
    this.locDanhSach();
  }

  @HostListener('document:click')
  closeAllDropdowns() {
    this.isGameOpen = false;
    this.isStatusOpen = false;
    this.isSortOpen = false;
  }

  // ===== TÍNH THỐNG KÊ TỰ ĐỘNG =====
  tinhThongKe() {
    this.tongDanhGia = this.danhSachGoc.length;
    
    this.soHienThi = this.danhSachGoc.filter(x => x.trangThai === 'hien_thi').length;
    this.soDaAn = this.danhSachGoc.filter(x => x.trangThai === 'an' || x.trangThai === 'da_an').length;
    
    this.soKhuyenDung = this.danhSachGoc.filter(x => x.danhGia === 'khuyen_dung').length;
    this.soKhongKhuyenDung = this.danhSachGoc.filter(x => x.danhGia === 'khong_khuyen_dung').length;

    this.tyLeKhuyenDung = this.tongDanhGia > 0 
      ? Math.round((this.soKhuyenDung / this.tongDanhGia) * 100) 
      : 0;
  }

  // ===== LỌC DANH SÁCH BẢNG =====
  locDanhSach() {
    let ketQua = [...this.danhSachGoc];

    // 1. Lọc theo từ khóa tìm kiếm
    if (this.tuKhoa.trim()) {
      const k = this.tuKhoa.toLowerCase();
      ketQua = ketQua.filter(item => 
        (item.tenGame?.toLowerCase() || '').includes(k) ||
        (item.tenTaiKhoanNguoiDung?.toLowerCase() || '').includes(k) ||
        (item.noiDung?.toLowerCase() || '').includes(k)
      );
    }

    // 2. Lọc theo Game
    if (this.boLocGame) {
      ketQua = ketQua.filter(item => item.tenGame === this.boLocGame);
    }

    // 3. Lọc theo Trạng thái
    if (this.boLocTrangThai) {
      ketQua = ketQua.filter(item => item.trangThai === this.boLocTrangThai);
    }

    // 4. BỔ SUNG: SẮP XẾP THEO THỜI GIAN (NGÀY ĐÁNH GIÁ)
    if (this.boLocSapXep === 'moi_nhat') {
      ketQua.sort((a, b) => this.parseDate(b.ngayDanhGia) - this.parseDate(a.ngayDanhGia));
    } else if (this.boLocSapXep === 'cu_nhat') {
      ketQua.sort((a, b) => this.parseDate(a.ngayDanhGia) - this.parseDate(b.ngayDanhGia));
    }

    this.danhSachHienThi = ketQua;
  }

  // Hàm phụ trợ chuyển chuỗi "dd/mm/yyyy" thành timestamp để so sánh chính xác
  private parseDate(dateStr?: string): number {
    if (!dateStr) return 0;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Chuyển "28/09/2026" thành định dạng "2026-09-28" để tạo Date
      const dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      return dateObj.getTime();
    }
    return 0;
  }

  // ===== LOGIC MODAL POPUP CHI TIẾT =====
  openModal(review: ReviewEntity): void {
    // Tạo bản sao đối tượng để hiển thị lên Popup
    this.selectedReview = { ...review };
  }

  closeModal(): void {
    this.selectedReview = null;
  }

  toggleReviewStatus(review: ReviewEntity): void {
  // 1. Đổi trạng thái Ẩn / Hiện
  const trangThaiMoi = review.trangThai === 'hien_thi' ? 'da_an' : 'hien_thi';
  review.trangThai = trangThaiMoi;

  // 2. Tự động cập nhật loại Đánh giá tương ứng với Trạng thái
  // Khi Hiển thị -> 'khuyen_dung'
  // Khi Đã ẩn -> 'khong_khuyen_dung'
  if (trangThaiMoi === 'hien_thi') {
    review.danhGia = 'khuyen_dung';
  } else {
    review.danhGia = 'khong_khuyen_dung';
  }

  // 3. Cập nhật lại đối tượng tương ứng trong mảng danhSachGoc
  const item = this.danhSachGoc.find(r => 
    r.maTaiKhoanNguoiDung === review.maTaiKhoanNguoiDung && 
    r.noiDung === review.noiDung
  );

  if (item) {
    item.trangThai = trangThaiMoi;
    item.danhGia = review.danhGia;
  }

  // 4. Tính toán lại số liệu thống kê và danh sách hiển thị
  this.tinhThongKe();
  this.locDanhSach();
}
}