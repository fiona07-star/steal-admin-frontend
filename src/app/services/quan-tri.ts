import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { KhachHang, RefundRequestEntity } from '../models/tai-khoan';

@Injectable({
  providedIn: 'root'
})
export class QuanTri {
  private apiUrl = 'https://your-backend-domain.com/api/admin'; // URL Backend
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    // Kiểm tra môi trường thực thi là Browser hay Node.js Server
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Helper an toàn đọc localStorage
  private getLocalData<T>(key: string): T[] {
    if (this.isBrowser) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  // Helper an toàn ghi localStorage
  private setLocalData(key: string, data: any): void {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  // 1. Lấy danh sách toàn bộ khách hàng
  layDanhSachKhachHang(): Observable<KhachHang[]> {
    // Khi chạy API backend thực tế:
    // return this.http.get<KhachHang[]>(`${this.apiUrl}/danh-sach-khach-hang`);

    // Đồng bộ mock data từ localStorage an toàn SSR
    const dsLocal = this.getLocalData<KhachHang>('danhSachNguoiDung');
    return of(dsLocal);
  }

  // 2. Lấy chi tiết thông tin khách hàng theo ID
  layChiTietKhachHang(id: string): Observable<KhachHang | null> {
    return this.http.get<KhachHang>(`${this.apiUrl}/khach-hang/${id}`).pipe(
      catchError(() => {
        const dsLocal = this.getLocalData<KhachHang>('danhSachNguoiDung');
        const found = dsLocal.find(u => u.maTaiKhoanNguoiDung === id);
        return of(found || null);
      })
    );
  }

  // 3. Cập nhật trạng thái khóa/mở khóa tài khoản khách hàng
  capNhatTrangThaiKhoa(id: string, isKhoa: boolean, lyDo: string = '', ngayKhoa: string = ''): Observable<any> {
    // Đồng bộ dữ liệu xuống localStorage an toàn SSR
    const dsLocal = this.getLocalData<KhachHang>('danhSachNguoiDung');
    const index = dsLocal.findIndex(u => u.maTaiKhoanNguoiDung === id);

    if (index !== -1) {
      dsLocal[index].trangThaiKhoa = isKhoa;
      dsLocal[index].soNgayDaKhoa = isKhoa ? 1 : 0;
      this.setLocalData('danhSachNguoiDung', dsLocal);
    }

    // Khi có API backend thực tế:
    // return this.http.put<any>(`${this.apiUrl}/khach-hang/${id}/khoa`, { trangThaiKhoa: isKhoa, lyDo, ngayKhoa });

    return of({ success: true, isKhoa });
  }

  // 4. Cập nhật trạng thái ẩn/hiện đánh giá
  capNhatHienThiDanhGia(idDanhGia: string | number, isHienThi: boolean): Observable<any> {
    // return this.http.put<any>(`${this.apiUrl}/danh-gia/${idDanhGia}`, { isHienThi });
    return of({ success: true, isHienThi });
  }

  // 5. Lấy danh sách yêu cầu hoàn tiền
  layDanhSachRefund(): Observable<RefundRequestEntity[]> {
    // return this.http.get<RefundRequestEntity[]>(`${this.apiUrl}/refund-requests`);
    return of([]);
  }
}