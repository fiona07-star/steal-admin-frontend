import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DonHang {
  stt: number;
  maDon: string;
  ngay: string;
  game: string;
  tongTien: number;
  phuongThucThanhToan: string;
  trangThai: 'Thành công' | 'Đã hủy' | 'Đã hoàn tiền';
}

export interface ChiTietKhachHang {
  maTaiKhoanNguoiDung: string;
  tenTaiKhoanNguoiDung: string;
  hoTen: string;
  ngayThamGia: string;
  email: string;
  sdt: string;
  anhDaiDien: string | null;
  trangThaiKhoa: boolean;
  tongDonHang: number;
  tongChiTieu: number;
  gameSoHuu: number;
  soNgayDaKhoa: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaiKhoan {
  // Thay url này bằng đường dẫn API thực tế từ Backend của bạn
  private baseUrl = 'https://api.yourdomain.com/api/v1/tai-khoan';

  constructor(private http: HttpClient) {}

  // Lấy chi tiết khách hàng theo mã tài khoản
  layChiTietKhachHang(id: string): Observable<ChiTietKhachHang> {
    return this.http.get<ChiTietKhachHang>(`${this.baseUrl}/${id}`);
  }

  // Lấy lịch sử đơn hàng của khách hàng
  layLichSuDonHang(id: string): Observable<DonHang[]> {
    return this.http.get<DonHang[]>(`${this.baseUrl}/${id}/don-hang`);
  }

  // Cập nhật trạng thái khóa/mở khóa tài khoản
  capNhatTrangThaiKhoa(id: string, trangThaiKhoa: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/trang-thai-khoa`, { trangThaiKhoa });
  }
}