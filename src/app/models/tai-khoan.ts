// Interface yêu cầu dữ liệu gửi lên khi đăng nhập
export interface DangNhapRequest {
  email: string;
  matKhau: string;
}

// Interface dữ liệu trả về sau khi đăng nhập thành công
export interface DangNhapResponse {
  token: string;
  adminInfo: {
    id: string;
    email: string;
    hoTen: string;
  };
}

// Interface lưu thông tin Session phiên làm việc
export interface PhienLamViec {
  token: string;
  ngayTao: string;
  ngayHetHan: string;
}

export interface DonHangKhach {
  stt: number;
  maDon: string;
  ngay: string;
  game: string;
  tongTien: number;
  phuongThuc: string;
  trangThai: 'Thành công' | 'Đã hủy' | 'Đã hoàn tiền';
  nguoiNhan?: string;
}

export interface KhachHang {
  maTaiKhoanNguoiDung: string;
  tenTaiKhoanNguoiDung: string;
  hoTen: string;
  email: string;
  anhDaiDien: string | null;
  trangThaiKhoa: boolean;
  tongChiTieu: number;
  tongDon: number;
  soNgayDaKhoa: number;
}

export interface ReviewEntity {
  maTaiKhoanNguoiDung: string;
  tenTaiKhoanNguoiDung?: string;
  anhDaiDien?: string;
  maGame: string;
  tenGame: string;
  danhGia: 'khuyen_dung' | 'khong_khuyen_dung' | string;
  noiDung: string;
  ngayDanhGia: string;
  trangThai: 'hien_thi' | 'an' | string;
  
  // UI fallback compatibility
  anhGame?: string;
  isKhuyenDung?: boolean;
  isHienThi?: boolean;
}

// Interface chuẩn theo Sheet refund_request & refect_orders
export interface RefundRequestEntity {
  maDonHang: string;
  maTaiKhoan: string;
  lyDoKhachHang: string;
  trangThaiDonHang: 'cho_xu_ly' | 'hoan_tien' | 'tu_choi' | string;
  lyDoTuChoi?: string;
  adminXuLy?: string;
  ngayYeuCau: string;
  ngayXuLy?: string;
  ngayHoanTien?: string;
  
  // UI fallback compatibility
  game?: string;
  tenGame?: string;
}