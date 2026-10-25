import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PaymentMethod {
  maPhuongThuc: string;
  congTichHop: string;
  tenHienThi: string;
  moTaNgan: string;
  logo: string;
  moiTruong: 'Sandbox' | 'Production';
  tinhPhiCongThanhToan: boolean;
  mucPhiPhanTram: number;
  phiCoDinh: number;
  trangThaiKichHoat: boolean;
  ngayCapNhat?: string;
  capNhatBoiAdmin?: string;
}

export interface NewPaymentMethodForm {
  congTichHop: string;
  tenHienThi: string;
  moTaNgan: string;
  logo: string;
  trangThaiKichHoat: boolean;
}

export interface PaymentHistoryLog {
  id: string;
  thoiGian: string;
  nguoiThucHien: string;
  thaoTac: string;
  congTacDong: string;
  chiTiet: string;
  loaiThaoTac: 'kich-hoat' | 'cap-nhat' | 'tat'; // Để phân biệt màu icon (Xanh / Bánh răng / Đỏ)
}

@Component({
  selector: 'app-thanh-toan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thanh-toan-component.html',
  styleUrl: './thanh-toan-component.css'
})
export class ThanhToanComponent implements OnInit {

  // TRẠNG THÁI HIỂN THỊ MAN HÌNH ('list': Danh sách thanh toán | 'history': Lịch sử thay đổi)
  currentView: 'list' | 'history' = 'list';

  // Dữ liệu danh sách phương thức thanh toán
  danhSachThanhToan: PaymentMethod[] = [
    {
      maPhuongThuc: 'PAY-001',
      congTichHop: 'PAYPAL',
      tenHienThi: 'PayPal',
      moTaNgan: 'Thanh toán quốc tế qua tài khoản PayPal và các phương thức được PayPal hỗ trợ.',
      logo: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992488/54958031-c288-4926-acdc-9b0393091c1f.png',
      moiTruong: 'Production',
      tinhPhiCongThanhToan: false,
      mucPhiPhanTram: 0,
      phiCoDinh: 0,
      trangThaiKichHoat: true
    },
    {
      maPhuongThuc: 'PAY-002',
      congTichHop: 'MOMO',
      tenHienThi: 'Ví điện tử MoMo',
      moTaNgan: 'Thanh toán nhanh chóng, quét mã QR qua ứng dụng MoMo',
      logo: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992513/8b70cd9c-6676-4dde-97de-801ad7b6f054.png',
      moiTruong: 'Sandbox',
      tinhPhiCongThanhToan: true,
      mucPhiPhanTram: 1.5,
      phiCoDinh: 2000,
      trangThaiKichHoat: true
    },
    {
      maPhuongThuc: 'PAY-003',
      congTichHop: 'VNPAY',
      tenHienThi: 'Cổng thanh toán VNPay',
      moTaNgan: 'VNPay - An toàn, ổn định đa dạng ngân hàng nội địa.',
      logo: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992540/6622870c-0de9-43b7-bacb-902a48cd55d9.png',
      moiTruong: 'Production',
      tinhPhiCongThanhToan: false,
      mucPhiPhanTram: 0,
      phiCoDinh: 0,
      trangThaiKichHoat: true
    }
  ];

  // Danh sách cổng tích hợp phục vụ Modal thêm mới
  danhSachCongTichHop = [
    { code: 'VIETQR', label: 'VietQR (Chuyển khoản Ngân hàng tự động)' },
    { code: 'ZALOPAY', label: 'Ví điện tử ZaloPay' },
    { code: 'SHOPEEPAY', label: 'Ví điện tử ShopeePay' },
    { code: 'STRIPE', label: 'Cổng thanh toán quốc tế Stripe' }
  ];

  // DỮ LIỆU MẪU LỊCH SỬ THAY ĐỔI
  danhSachLichSu: PaymentHistoryLog[] = [
    {
      id: 'LOG-001',
      thoiGian: '03/10/2026 - 15:45',
      nguoiThucHien: 'Admin (admin01)',
      thaoTac: 'Kích hoạt cổng thanh toán',
      congTacDong: 'PayPal',
      chiTiet: 'Thay đổi trạng thái [kichHoat] từ false -> true',
      loaiThaoTac: 'kich-hoat'
    },
    {
      id: 'LOG-002',
      thoiGian: '02/10/2026 - 10:15',
      nguoiThucHien: 'Admin (admin01)',
      thaoTac: 'Cập nhật cấu hình cổng',
      congTacDong: 'VNPay',
      chiTiet: 'Đổi môi trường [moiTruong] từ Sandbox -> Production',
      loaiThaoTac: 'cap-nhat'
    },
    {
      id: 'LOG-003',
      thoiGian: '01/10/2026 - 08:30',
      nguoiThucHien: 'Tran Van B (staff01)',
      thaoTac: 'Tắt cổng thanh toán',
      congTacDong: 'MoMo',
      chiTiet: 'Thay đổi trạng thái [kichHoat] từ true -> false',
      loaiThaoTac: 'tat'
    }
  ];

  // Tìm kiếm & Lọc Lịch sử
  searchHistoryKey: string = '';
  filterTimeRange: string = 'all';
    fromDate: string = '';
    toDate: string = '';

  // TRẠNG THÁI MODALS POPUP
  showConfigModal: boolean = false;
  selectedMethod: PaymentMethod | null = null;
  editingData: PaymentMethod = {} as PaymentMethod;

  showAddModal: boolean = false;
  newMethodData: NewPaymentMethodForm = {
    congTichHop: 'VIETQR',
    tenHienThi: 'Chuyển khoản qua Mã QR Ngân hàng (VietQR)',
    moTaNgan: 'Quét mã QR bằng App ngân hàng, hệ thống tự động duyệt key trong 30s',
    logo: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992540/6622870c-0de9-43b7-bacb-902a48cd55d9.png',
    trangThaiKichHoat: true
  };

  ngOnInit(): void {}

  // Chuyển đổi giữa View Danh sách & View Lịch sử
  xemLichSu(): void {
    this.currentView = 'history';
  }

  quayLaiDanhSach(): void {
    this.currentView = 'list';
  }

  toggleTrangThai(item: PaymentMethod): void {
    item.trangThaiKichHoat = !item.trangThaiKichHoat;
  }

  // LOGIC MODAL CẤU HÌNH
  openConfigModal(item: PaymentMethod): void {
    this.selectedMethod = item;
    this.editingData = JSON.parse(JSON.stringify(item));
    this.showConfigModal = true;
  }

  closeConfigModal(): void {
    this.showConfigModal = false;
    this.selectedMethod = null;
  }

  saveModalConfig(): void {
    if (this.selectedMethod) {
      Object.assign(this.selectedMethod, this.editingData);
      alert(`Đã lưu cấu hình cho ${this.selectedMethod.congTichHop}!`);
    }
    this.closeConfigModal();
  }

  xoaPhuongThuc(): void {
    if (this.selectedMethod) {
      const xacNhan = confirm(`Bạn có chắc chắn muốn xóa phương thức "${this.selectedMethod.tenHienThi}" không?`);
      if (xacNhan) {
        this.danhSachThanhToan = this.danhSachThanhToan.filter(
          p => p.maPhuongThuc !== this.selectedMethod?.maPhuongThuc
        );
        alert('Đã xóa phương thức thanh toán thành công!');
        this.closeConfigModal();
      }
    }
  }

  onCheckboxChange(): void {
    if (!this.editingData.tinhPhiCongThanhToan) {
      this.editingData.mucPhiPhanTram = 0;
      this.editingData.phiCoDinh = 0;
    }
  }

  onFeeInput(): void {
    if ((this.editingData.mucPhiPhanTram && this.editingData.mucPhiPhanTram > 0) || 
        (this.editingData.phiCoDinh && this.editingData.phiCoDinh > 0)) {
      this.editingData.tinhPhiCongThanhToan = true;
    }
  }

  // LOGIC MODAL THÊM MỚI
  openAddModal(): void {
    this.newMethodData = {
      congTichHop: 'VIETQR',
      tenHienThi: 'Chuyển khoản qua Mã QR Ngân hàng (VietQR)',
      moTaNgan: 'Quét mã QR bằng App ngân hàng, hệ thống tự động duyệt key trong 30s',
      logo: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791992540/6622870c-0de9-43b7-bacb-902a48cd55d9.png',
      trangThaiKichHoat: true
    };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onAddLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newMethodData.logo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addNewMethod(): void {
    if (!this.newMethodData.tenHienThi.trim()) {
      alert('Vui lòng nhập Tên phương thức hiển thị!');
      return;
    }

    const newId = `PAY-00${this.danhSachThanhToan.length + 1}`;
    const newItem: PaymentMethod = {
      maPhuongThuc: newId,
      congTichHop: this.newMethodData.congTichHop,
      tenHienThi: this.newMethodData.tenHienThi,
      moTaNgan: this.newMethodData.moTaNgan,
      logo: this.newMethodData.logo,
      moiTruong: 'Sandbox',
      tinhPhiCongThanhToan: false,
      mucPhiPhanTram: 0,
      phiCoDinh: 0,
      trangThaiKichHoat: this.newMethodData.trangThaiKichHoat
    };

    this.danhSachThanhToan.push(newItem);
    alert('Thêm phương thức thanh toán thành công!');
    this.closeAddModal();
  }

    
}