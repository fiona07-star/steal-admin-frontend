import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CauHinhThongTinChung {
  tenWebsite: string;
  urlWebsite: string;
  emailHoTro: string;
  hotline: string;
  moTaWebsite: string;
  logoStore: string;
  logoAdmin: string;
  capNhatLanCuoi: string;
}

@Component({
  selector: 'app-thong-tin-chung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thong-tin-chung-component.html',
  styleUrl: './thong-tin-chung-component.css'
})
export class ThongTinChungComponent implements OnInit {
  // Dữ liệu mẫu chuẩn mapped từ bảng system_settings
  cauHinhData: CauHinhThongTinChung = {
    tenWebsite: 'STEAL GAME STORE',
    urlWebsite: 'https://stealgame.vn',
    emailHoTro: 'support@stealgame.vn',
    hotline: '0983622544',
    moTaWebsite: 'Nền tảng mua bán game bản quyền giá tốt, uy tín, nhanh chóng.',
    logoStore: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605267/admin1.png',
    logoAdmin: 'https://res.cloudinary.com/dhbnmxe6t/image/upload/v1791605267/admin1.png',
    capNhatLanCuoi: '02/10/2026 16:45'
  };

  private cauHinhGoc!: CauHinhThongTinChung;

  ngOnInit(): void {
    // Lưu lại dữ liệu ban đầu để phục vụ khôi phục
    this.cauHinhGoc = JSON.parse(JSON.stringify(this.cauHinhData));
  }

  // Khôi phục về dữ liệu ban đầu
  khoiPhucMacDinh(): void {
    this.cauHinhData = JSON.parse(JSON.stringify(this.cauHinhGoc));
    alert('Đã khôi phục dữ liệu ban đầu!');
  }

  // Lưu thay đổi cấu hình
  luuThayDoi(): void {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.cauHinhData.capNhatLanCuoi = `${day}/${month}/${year} ${hours}:${minutes}`;
    this.cauHinhGoc = JSON.parse(JSON.stringify(this.cauHinhData));

    alert('Lưu thông tin chung hệ thống thành công!');
  }

  // Xử lý chọn file ảnh logo mới
  onFileSelected(event: any, type: 'store' | 'admin'): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'store') {
          this.cauHinhData.logoStore = e.target.result;
        } else {
          this.cauHinhData.logoAdmin = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}