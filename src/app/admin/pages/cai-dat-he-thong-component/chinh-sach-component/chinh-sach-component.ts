import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PolicyItem {
  id: number;
  tenChinhSach: string;
  slug: string;
  ngayCapNhat: string;
  trangThai: boolean; // true: Đang áp dụng, false: Tạm ẩn
  noiDung: string;
  iconClass: string;
  nguoiCapNhat?: string;
}

@Component({
  selector: 'app-chinh-sach',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chinh-sach-component.html',
  styleUrl: './chinh-sach-component.css'
})
export class ChinhSachComponent implements OnInit {

  danhSachChinhSach: PolicyItem[] = [
    {
      id: 1,
      tenChinhSach: 'Chính sách hoàn tiền',
      slug: 'stealgame.vn/policy/chinh-sach-hoan-tien',
      ngayCapNhat: '03/10/2026',
      trangThai: true,
      iconClass: 'bi-cash-coin icon-green',
      nguoiCapNhat: 'ADMIN001',
      noiDung: `Chúng tôi mong muốn mang đến cho người dùng trải nghiệm mua và sử dụng trò chơi thuận tiện, minh bạch. Trong trường hợp trò chơi không phù hợp hoặc phát sinh vấn đề sau khi mua, người dùng có thể gửi yêu cầu hoàn tiền theo các điều kiện được quy định dưới đây.\n1. Điều kiện hoàn tiền\nNgười dùng có thể yêu cầu hoàn tiền đối với trò chơi đã mua nếu đáp ứng đồng thời các điều kiện sau:\n• Yêu cầu hoàn tiền được gửi trong vòng 14 ngày kể từ thời điểm giao dịch được xác nhận thành công.\n• ........`
    },
    {
      id: 2,
      tenChinhSach: 'Chính sách thỏa thuận NĐK',
      slug: 'stealgame.vn/policy/dieu-khoan-su-dung',
      ngayCapNhat: '01/10/2026',
      trangThai: true,
      iconClass: 'bi-people-fill icon-purple',
      nguoiCapNhat: 'ADMIN001',
      noiDung: 'Các điều khoản sử dụng và thỏa thuận người dùng giữa StealGame và khách hàng khi đăng ký sử dụng dịch vụ...'
    },
    {
      id: 3,
      tenChinhSach: 'Chính sách quyền riêng tư',
      slug: 'stealgame.vn/policy/quyen-rieng-tu',
      ngayCapNhat: '01/10/2026',
      trangThai: true,
      iconClass: 'bi-shield-check icon-orange',
      nguoiCapNhat: 'ADMIN002',
      noiDung: 'Cam kết bảo mật thông tin cá nhân của người dùng trên hệ thống StealGame...'
    },
    {
      id: 4,
      tenChinhSach: 'Chính sách hỗ trợ tiếp cận',
      slug: 'stealgame.vn/policy/ho-tro-tiep-can',
      ngayCapNhat: '15/09/2026',
      trangThai: false,
      iconClass: 'bi-person-fill-check icon-blue',
      nguoiCapNhat: 'ADMIN001',
      noiDung: 'Hướng dẫn tiếp cận các tính năng dành cho người dùng...'
    }
  ];

  selectedPolicy: PolicyItem | null = null;

  // POPUP THÊM MỚI
  showAddModal: boolean = false;
  newPolicyForm = {
    tenChinhSach: '',
    trangThai: true,
    noiDung: ''
  };

  ngOnInit(): void {
    if (this.danhSachChinhSach.length > 0) {
      this.selectedPolicy = this.danhSachChinhSach[0];
    }
  }

  chonChinhSach(item: PolicyItem): void {
    this.selectedPolicy = item;
  }

  luuThayDoi(): void {
    alert('Đã lưu thay đổi thông tin chính sách thành công!');
  }

  // CÁC HÀM XỬ LÝ MODAL POPUP
  moModalThemMoi(): void {
    this.newPolicyForm = {
      tenChinhSach: 'Chính sách Bảo mật Thanh toán',
      trangThai: true,
      noiDung: ''
    };
    this.showAddModal = true;
  }

  dongModalThemMoi(): void {
    this.showAddModal = false;
  }

  xacNhanTaoMoi(): void {
    if (!this.newPolicyForm.tenChinhSach.trim()) {
      alert('Vui lòng nhập tên chính sách!');
      return;
    }

    const newSlugName = this.newPolicyForm.tenChinhSach
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-");

    const newItem: PolicyItem = {
      id: Date.now(),
      tenChinhSach: this.newPolicyForm.tenChinhSach,
      slug: `stealgame.vn/policy/${newSlugName}`,
      ngayCapNhat: '25/10/2026',
      trangThai: this.newPolicyForm.trangThai,
      noiDung: this.newPolicyForm.noiDung || 'Nội dung điều khoản đang cập nhật...',
      iconClass: 'bi-file-earmark-text-fill icon-purple',
      nguoiCapNhat: 'ADMIN001'
    };

    this.danhSachChinhSach.unshift(newItem);
    this.selectedPolicy = newItem;
    alert('Thêm chính sách mới thành công!');
    this.dongModalThemMoi();
  }
}