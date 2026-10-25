import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface NotificationItem {
  id: number;
  tieuDe: string;
  noiDungNgan: string;
  loaiNotification: 'admin' | 'system';
  trangThai: 'Đã gửi' | 'Đã lên lịch' | 'Nháp' | 'Tự động';
  ngayGui: string;
  doiTuong?: 'all' | 'specific';
  nguoiNhanCuThe?: string;
  lichGuiType?: 'now' | 'schedule';
  
  // Dữ liệu mở rộng cho Thông báo Hệ thống tự động
  maSuKien?: string;
  loaiSuKien?: string;
  thoiGianPhatSinh?: string;
  noiDungChiTietSystem?: string;
  selected?: boolean;
}

export interface NotificationForm {
  id?: number;
  tieuDe: string;
  noiDung: string;
  doiTuong: 'all' | 'specific';
  nguoiNhanCuThe: string;
  lichGuiType: 'now' | 'schedule';
  ngayHenGio: string;
}

@Component({
  selector: 'app-thong-bao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thong-bao-component.html',
  styleUrl: './thong-bao-component.css'
})
export class ThongBaoComponent implements OnInit {

  // Mặc định mở Tab Admin gửi
  activeCategory: 'all' | 'admin' | 'system' = 'all';

  danhSachThongBao: NotificationItem[] = [
    // --- GIỮ NGUYÊN TOÀN BỘ DỮ LIỆU ADMIN GỬI ---
    {
      id: 1,
      tieuDe: 'Cyberpunk 2077 giảm 50%',
      noiDungNgan: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn...',
      loaiNotification: 'admin',
      trangThai: 'Đã gửi',
      ngayGui: '03/10/2026 10:00',
      doiTuong: 'all'
    },
    {
      id: 2,
      tieuDe: 'Cyberpunk 2077 giảm 50%',
      noiDungNgan: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn...',
      loaiNotification: 'admin',
      trangThai: 'Đã lên lịch',
      ngayGui: '15/10/2026 02:00',
      doiTuong: 'specific',
      nguoiNhanCuThe: 'Adminphu, Staff01'
    },
    {
      id: 3,
      tieuDe: 'Cyberpunk 2077 giảm 50%',
      noiDungNgan: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn...',
      loaiNotification: 'admin',
      trangThai: 'Nháp',
      ngayGui: '15/10/2026 02:00',
      doiTuong: 'all'
    },
    {
      id: 4,
      tieuDe: 'Cyberpunk 2077 giảm 50%',
      noiDungNgan: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn...',
      loaiNotification: 'admin',
      trangThai: 'Đã gửi',
      ngayGui: '03/10/2026 10:00',
      doiTuong: 'all'
    },
    {
      id: 5,
      tieuDe: 'Cyberpunk 2077 giảm 50%',
      noiDungNgan: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn...',
      loaiNotification: 'admin',
      trangThai: 'Đã lên lịch',
      ngayGui: '15/10/2026 02:00',
      doiTuong: 'specific'
    },
    {
      id: 6,
      tieuDe: 'Cyberpunk 2077 giảm 50%',
      noiDungNgan: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn...',
      loaiNotification: 'admin',
      trangThai: 'Nháp',
      ngayGui: '15/10/2026 02:00',
      doiTuong: 'all'
    },

    // --- BỔ SUNG THÊM DỮ LIỆU THÔNG BÁO HỆ THỐNG TỰ ĐỘNG ---
    {
      id: 101,
      tieuDe: 'Đơn hàng mới #HD-20261014-089',
      noiDungNgan: 'Khách hàng quynh.nguyen vừa thanh toán 800,000 VNĐ qua MoMo',
      loaiNotification: 'system',
      trangThai: 'Tự động',
      ngayGui: '03/10/2026 10:00',
      maSuKien: '#NOTI-004',
      loaiSuKien: 'Đơn hàng mới thanh toán',
      thoiGianPhatSinh: '14/10/2026 - 22:00:00',
      noiDungChiTietSystem: 'Khách hàng Nguyễn Thị Quỳnh (CUS-001) vừa hoàn tất thanh toán đơn hàng #HD-20261014-089 trị giá 800,000 VNĐ bằng ví MoMo. Hệ thống đã tự động xuất 01 Game Key Cyberpunk 2077.'
    },
    {
      id: 102,
      tieuDe: 'Đơn hàng mới #HD-20261014-089',
      noiDungNgan: 'Khách hàng quynh.nguyen vừa thanh toán 800,000 VNĐ qua MoMo',
      loaiNotification: 'system',
      trangThai: 'Tự động',
      ngayGui: '15/10/2026 02:00',
      maSuKien: '#NOTI-005',
      loaiSuKien: 'Đơn hàng mới thanh toán',
      thoiGianPhatSinh: '15/10/2026 - 02:00:00',
      noiDungChiTietSystem: 'Khách hàng Nguyễn Thị Quỳnh (CUS-001) vừa hoàn tất thanh toán đơn hàng #HD-20261014-089 trị giá 800,000 VNĐ bằng ví MoMo.'
    }
  ];

  searchKey: string = '';
  filterTrangThai: string = 'all';
  sortOrder: string = 'newest';
  selectAll: boolean = false;

  // Trạng thái trọn bộ 6 Popup Modal
  showCreateModal: boolean = false;
  showDetailModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showCancelScheduleModal: boolean = false;
  showSendNowModal: boolean = false;

  selectedItem: NotificationItem | null = null;

  formData: NotificationForm = {
    tieuDe: '',
    noiDung: '',
    doiTuong: 'all',
    nguoiNhanCuThe: '',
    lichGuiType: 'now',
    ngayHenGio: '15/10/2026 02:00'
  };

  ngOnInit(): void {}

  get filteredNotifications(): NotificationItem[] {
    return this.danhSachThongBao.filter(item => {
      const matchCategory = this.activeCategory === 'all' || item.loaiNotification === this.activeCategory;
      const matchSearch = !this.searchKey.trim() || 
        item.tieuDe.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        item.noiDungNgan.toLowerCase().includes(this.searchKey.toLowerCase());
      const matchStatus = this.filterTrangThai === 'all' || item.trangThai === this.filterTrangThai;

      return matchCategory && matchSearch && matchStatus;
    });
  }

  selectCategory(cat: 'all' | 'admin' | 'system'): void {
    this.activeCategory = cat;
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    this.filteredNotifications.forEach(item => item.selected = this.selectAll);
  }

  // --- CÁC THAO TÁC MODAL ---
  xemThongBao(item: NotificationItem): void {
    this.selectedItem = item;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedItem = null;
  }

  denTrangDonHang(): void {
    alert('Chuyển hướng đến Màn hình Quản lý Đơn hàng...');
    this.closeDetailModal();
  }

  taoThongBaoMoi(): void {
    this.formData = {
      tieuDe: 'Cyberpunk 2077 giảm giá 50% cực HOT!',
      noiDung: 'Cyberpunk 2077 hiện đang được giảm giá với giá cực kỳ hấp dẫn. Sở hữu ngay hôm nay để nhận thêm quà tặng đặc biệt!',
      doiTuong: 'specific',
      nguoiNhanCuThe: '',
      lichGuiType: 'schedule',
      ngayHenGio: '15/10/2026 02:00'
    };
    this.showCreateModal = true;
  }

  closeCreateModal(): void { this.showCreateModal = false; }

  saveDraft(): void {
    if (!this.formData.tieuDe.trim()) return alert('Vui lòng nhập tiêu đề!');
    this.danhSachThongBao.unshift({
      id: Date.now(),
      tieuDe: this.formData.tieuDe,
      noiDungNgan: this.formData.noiDung,
      loaiNotification: 'admin',
      trangThai: 'Nháp',
      ngayGui: this.formData.ngayHenGio,
      doiTuong: this.formData.doiTuong
    });
    alert('Đã lưu nháp!');
    this.closeCreateModal();
  }

  sendNotification(): void {
    if (!this.formData.tieuDe.trim()) return alert('Vui lòng nhập tiêu đề!');
    const isSchedule = this.formData.lichGuiType === 'schedule';
    this.danhSachThongBao.unshift({
      id: Date.now(),
      tieuDe: this.formData.tieuDe,
      noiDungNgan: this.formData.noiDung,
      loaiNotification: 'admin',
      trangThai: isSchedule ? 'Đã lên lịch' : 'Đã gửi',
      ngayGui: isSchedule ? this.formData.ngayHenGio : '03/10/2026 10:00',
      doiTuong: this.formData.doiTuong
    });
    alert(isSchedule ? 'Đã lên lịch gửi thông báo thành công!' : 'Đã gửi thông báo!');
    this.closeCreateModal();
  }

  suaThongBao(item: NotificationItem): void {
    this.selectedItem = item;
    this.formData = {
      id: item.id,
      tieuDe: item.tieuDe,
      noiDung: item.noiDungNgan,
      doiTuong: item.doiTuong || 'specific',
      nguoiNhanCuThe: item.nguoiNhanCuThe || '',
      lichGuiType: item.lichGuiType || 'schedule',
      ngayHenGio: item.ngayGui || '15/10/2026 02:00'
    };
    this.showEditModal = true;
  }

  closeEditModal(): void { this.showEditModal = false; this.selectedItem = null; }

  updateNotification(): void {
    if (this.selectedItem) {
      this.selectedItem.tieuDe = this.formData.tieuDe;
      this.selectedItem.noiDungNgan = this.formData.noiDung;
      this.selectedItem.doiTuong = this.formData.doiTuong;
      this.selectedItem.nguoiNhanCuThe = this.formData.nguoiNhanCuThe;
      this.selectedItem.ngayGui = this.formData.ngayHenGio;
      alert('Đã cập nhật thay đổi!');
    }
    this.closeEditModal();
  }

  xoaThongBao(item: NotificationItem): void {
    this.selectedItem = item;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void { this.showDeleteModal = false; this.selectedItem = null; }

  confirmDelete(): void {
    if (this.selectedItem) {
      this.danhSachThongBao = this.danhSachThongBao.filter(n => n.id !== this.selectedItem?.id);
      alert('Đã xóa vĩnh viễn!');
    }
    this.closeDeleteModal();
  }

  huyLichGui(item: NotificationItem): void {
    this.selectedItem = item;
    this.showCancelScheduleModal = true;
  }

  closeCancelScheduleModal(): void { this.showCancelScheduleModal = false; this.selectedItem = null; }

  confirmCancelSchedule(): void {
    if (this.selectedItem) {
      this.selectedItem.trangThai = 'Nháp';
      alert('Đã hủy lịch gửi, chuyển về Nháp!');
    }
    this.closeCancelScheduleModal();
  }

  guiNgayThongBao(item: NotificationItem): void {
    this.selectedItem = item;
    this.showSendNowModal = true;
  }

  closeSendNowModal(): void { this.showSendNowModal = false; this.selectedItem = null; }

  confirmSendNow(): void {
    if (this.selectedItem) {
      this.selectedItem.trangThai = 'Đã gửi';
      this.selectedItem.ngayGui = '03/10/2026 10:00';
      alert('Đã phát hành gửi ngay!');
    }
    this.closeSendNowModal();
  }
}