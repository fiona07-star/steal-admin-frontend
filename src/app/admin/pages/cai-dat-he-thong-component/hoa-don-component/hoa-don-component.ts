import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface InvoiceConfig {
  tenCuaHang: string;
  emailHoTro: string;
  hotline: string;
  ghiChu: string;
}

@Component({
  selector: 'app-hoa-don',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hoa-don-component.html',
  styleUrl: './hoa-don-component.css'
})
export class HoaDonComponent implements OnInit {

  // Dữ liệu ban đầu mặc định
  defaultConfig: InvoiceConfig = {
    tenCuaHang: 'STEAL GAME STORE',
    emailHoTro: 'support@stealgame.vn',
    hotline: '0983622544',
    ghiChu: 'Cảm ơn bạn đã mua sắm tại STEAL! Mọi hỗ trợ xin liên hệ hotline.'
  };

  invoiceData: InvoiceConfig = { ...this.defaultConfig };

  ngOnInit(): void {}

  luuThayDoi(): void {
    alert('Đã lưu thông tin cấu hình hóa đơn thành công!');
  }

  khoiPhucMacDinh(): void {
    if (confirm('Bạn có chắc chắn muốn khôi phục về cấu hình hóa đơn mặc định?')) {
      this.invoiceData = { ...this.defaultConfig };
    }
  }

  xuatPDF(): void {
    alert('Hệ thống đang tiến hành xuất mẫu hóa đơn ra file PDF...');
  }

  // Xử lý khi hình ảnh logo lỗi thì dùng ảnh svg thế chỗ
  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="%236C57A3"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
  }
}