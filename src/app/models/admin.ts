export interface AdminAccount {
  maTaiKhoanAdmin: string;
  tenTaiKhoanAdmin: string;
  email: string;
  hoTen: string;
  anhDaiDien: string;
  maVaiTro: string;
  tenVaiTro: string;
  khoaCongKhaiRSA: string;
  maThietBiToken: string;
  bat2FA: boolean;
  maOTPEmail?: number;
  thoiGianHetHanOTP?: string;
  soLanDangNhapSai: number;
  thoiGianKhoaDen?: string;
  trangThaiKhoa: boolean;
  lyDoKhoa?: string;
  ngayKhoa?: string;
  taoBoiAdmin?: string;
  ngayTao: string;
}

export type LoginStep = 
  | 'RSA_CHECK' 
  | 'LOGIN_FORM' 
  | 'LOCKED' 
  | '2FA_VERIFY' 
  | 'FORGOT_PASSWORD';

export interface CauHinhHeThong {
  tenWebsite: string;
  urlWebsite: string;
  emailHoTro: string;
  hotline: string;
  moTaWebsite: string;
  logoStore: string;
  logoAdmin: string;
  capNhatLanCuoi: string;
}
export interface SystemSettingItem {
  maKhoa: string;
  nhomCauHinh: string;
  giaTri: string;
  ngayCapNhat?: string;
  capNhatBoiAdmin?: string;
}

export interface PaymentMethod {
  maPhuongThuc: string;
  congTichHop: string;
  tenHienThi: string;
  moTaNgan: string;
  logo: string;
  moiTruong?: 'Production' | 'Sandbox';
  tinhPhiCongThanhToan?: boolean;
  mucPhiPhanTram?: number;
  phiCoDinh?: number;
  trangThaiKichHoat: boolean;
  ngayCapNhat?: string;
  capNhatBoiAdmin?: string;
}