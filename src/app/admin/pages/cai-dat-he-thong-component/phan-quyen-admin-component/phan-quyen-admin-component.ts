import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdminUser {
  stt: number;
  username: string;
  avatar: string;
  hoTen: string;
  email?: string;
  vaiTro: 'Super Admin' | 'Editor' | 'Staff';
  trangThai: 'Hoạt động' | 'Đã khóa';
  lanCuoiCapNhat: string;
}

export interface NewAdminForm {
  username: string;
  hoTen: string;
  email: string;
  matKhau: string;
  xacNhanMatKhau: string;
  vaiTro: 'Super Admin' | 'Editor' | 'Staff';
}

export interface EditAdminForm {
  stt: number;
  username: string;
  hoTen: string;
  email: string;
  matKhauMoi: string;
  vaiTro: 'Super Admin' | 'Editor' | 'Staff';
}

@Component({
  selector: 'app-phan-quyen-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phan-quyen-admin-component.html',
  styleUrl: './phan-quyen-admin-component.css'
})
export class PhanQuyenAdminComponent implements OnInit {

  // Danh sách tài khoản Admin mẫu
  danhSachAdmin: AdminUser[] = [
    {
      stt: 1,
      username: 'Admin01',
      avatar: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992488/54958031-c288-4926-acdc-9b0393091c1f.png',
      hoTen: 'AdminSteal',
      email: 'admin01@stealgame.vn',
      vaiTro: 'Super Admin',
      trangThai: 'Hoạt động',
      lanCuoiCapNhat: '28/09/2026'
    },
    {
      stt: 2,
      username: 'Adminphu',
      avatar: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992513/8b70cd9c-6676-4dde-97de-801ad7b6f054.png',
      hoTen: 'Trần Thị Ly',
      email: 'ly.tran@stealgame.vn',
      vaiTro: 'Editor',
      trangThai: 'Đã khóa',
      lanCuoiCapNhat: '28/09/2026'
    },
    {
      stt: 3,
      username: 'Staffadmin',
      avatar: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992540/6622870c-0de9-43b7-bacb-902a48cd55d9.png',
      hoTen: 'Mai Khánh Đông',
      email: 'dong.mai@stealgame.vn',
      vaiTro: 'Staff',
      trangThai: 'Hoạt động',
      lanCuoiCapNhat: '28/09/2026'
    }
  ];

  // Bộ lọc
  searchKey: string = '';
  filterTrangThai: string = 'all';
  filterVaiTro: string = 'all';

  // 1. TRẠNG THÁI MODAL THÊM ADMIN MỚI
  showAddModal: boolean = false;
  showAddPassword1: boolean = false;
  showAddPassword2: boolean = false;
  newAdminData: NewAdminForm = {
    username: '',
    hoTen: '',
    email: '',
    matKhau: '',
    xacNhanMatKhau: '',
    vaiTro: 'Staff'
  };

  // 2. TRẠNG THÁI MODAL CẬP NHẬT ADMIN
  showEditModal: boolean = false;
  showEditPassword: boolean = false;
  selectedAdminToEdit: AdminUser | null = null;
  editAdminData: EditAdminForm = {
    stt: 0,
    username: '',
    hoTen: '',
    email: '',
    matKhauMoi: '',
    vaiTro: 'Staff'
  };

  // 3. TRẠNG THÁI MODAL XÓA ADMIN
  showDeleteModal: boolean = false;
  selectedAdminToDelete: AdminUser | null = null;

  ngOnInit(): void {}

  get filteredAdmins(): AdminUser[] {
    return this.danhSachAdmin.filter(item => {
      const matchKey = !this.searchKey.trim() || 
        item.username.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        item.hoTen.toLowerCase().includes(this.searchKey.toLowerCase());
      
      const matchStatus = this.filterTrangThai === 'all' || item.trangThai === this.filterTrangThai;
      const matchRole = this.filterVaiTro === 'all' || item.vaiTro === this.filterVaiTro;

      return matchKey && matchStatus && matchRole;
    });
  }

  // --- LOGIC MODAL THÊM ADMIN ---
  openAddAdminModal(): void {
    this.newAdminData = {
      username: '',
      hoTen: '',
      email: '',
      matKhau: '',
      xacNhanMatKhau: '',
      vaiTro: 'Staff'
    };
    this.showAddPassword1 = false;
    this.showAddPassword2 = false;
    this.showAddModal = true;
  }

  closeAddAdminModal(): void {
    this.showAddModal = false;
  }

  createAdmin(): void {
    if (!this.newAdminData.username.trim() || !this.newAdminData.hoTen.trim() || !this.newAdminData.email.trim()) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
      return;
    }

    if (this.newAdminData.matKhau !== this.newAdminData.xacNhanMatKhau) {
      alert('Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    const newAdmin: AdminUser = {
      stt: this.danhSachAdmin.length + 1,
      username: this.newAdminData.username,
      avatar: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992540/6622870c-0de9-43b7-bacb-902a48cd55d9.png',
      hoTen: this.newAdminData.hoTen,
      email: this.newAdminData.email,
      vaiTro: this.newAdminData.vaiTro,
      trangThai: 'Hoạt động',
      lanCuoiCapNhat: '25/10/2026'
    };

    this.danhSachAdmin.push(newAdmin);
    alert(`Thêm tài khoản admin ${newAdmin.username} thành công!`);
    this.closeAddAdminModal();
  }

  // --- LOGIC MODAL CẬP NHẬT ADMIN ---
  editAdmin(item: AdminUser): void {
    this.selectedAdminToEdit = item;
    this.editAdminData = {
      stt: item.stt,
      username: item.username,
      hoTen: item.hoTen,
      email: item.email || `${item.username.toLowerCase()}@stealgame.vn`,
      matKhauMoi: '',
      vaiTro: item.vaiTro
    };
    this.showEditPassword = false;
    this.showEditModal = true;
  }

  closeEditAdminModal(): void {
    this.showEditModal = false;
    this.selectedAdminToEdit = null;
  }

  updateAdmin(): void {
    if (!this.editAdminData.hoTen.trim() || !this.editAdminData.email.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên và Email!');
      return;
    }

    if (this.selectedAdminToEdit) {
      this.selectedAdminToEdit.hoTen = this.editAdminData.hoTen;
      this.selectedAdminToEdit.email = this.editAdminData.email;
      this.selectedAdminToEdit.vaiTro = this.editAdminData.vaiTro;
      this.selectedAdminToEdit.lanCuoiCapNhat = '25/10/2026';

      alert(`Đã cập nhật thông tin tài khoản ${this.selectedAdminToEdit.username} thành công!`);
    }
    this.closeEditAdminModal();
  }

  // --- LOGIC MODAL XÓA ADMIN ---
  openDeleteModal(item: AdminUser): void {
    if (item.vaiTro === 'Super Admin') {
      alert('Không thể xóa tài khoản Super Admin!');
      return;
    }
    this.selectedAdminToDelete = item;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedAdminToDelete = null;
  }

  confirmDeleteAdmin(): void {
    if (this.selectedAdminToDelete) {
      this.danhSachAdmin = this.danhSachAdmin.filter(a => a.stt !== this.selectedAdminToDelete?.stt);
      alert(`Đã xóa vĩnh viễn tài khoản admin ${this.selectedAdminToDelete.username}!`);
    }
    this.closeDeleteModal();
  }

  // KHÓA / MỞ KHÓA
  toggleLockStatus(item: AdminUser): void {
    if (item.trangThai === 'Hoạt động') {
      item.trangThai = 'Đã khóa';
      alert(`Đã khóa tài khoản ${item.username}!`);
    } else {
      item.trangThai = 'Hoạt động';
      alert(`Đã mở khóa tài khoản ${item.username}!`);
    }
  }
}