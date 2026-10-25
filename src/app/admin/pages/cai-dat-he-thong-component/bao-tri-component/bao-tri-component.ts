import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MaintenanceConfig {
  batBaoTri: boolean;
  thongBaoKhachHang: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}

@Component({
  selector: 'app-bao-tri',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bao-tri-component.html',
  styleUrl: './bao-tri-component.css'
})
export class BaoTriComponent implements OnInit {

  // Cấu hình trạng thái bảo trì mặc định
  maintenanceData: MaintenanceConfig = {
    batBaoTri: false,
    thongBaoKhachHang: 'Hệ thống đang tiến hành bảo trì nâng cấp định kỳ. Quý khách vui lòng quay lại sau!',
    thoiGianBatDau: '',
    thoiGianKetThuc: ''
  };

  ngOnInit(): void {}

  // Công tắc bật/tắt bảo trì
  toggleBaoTri(): void {
    this.maintenanceData.batBaoTri = !this.maintenanceData.batBaoTri;
  }

  // Lưu cấu hình bảo trì
  saveConfig(): void {
    if (this.maintenanceData.batBaoTri) {
      if (!this.maintenanceData.thongBaoKhachHang.trim()) {
        alert('Vui lòng nhập thông báo hiển thị cho khách hàng!');
        return;
      }
    }

    console.log('Dữ liệu bảo trì đã lưu:', this.maintenanceData);
    alert('Đã lưu cấu hình trạng thái bảo trì thành công!');
  }
}

