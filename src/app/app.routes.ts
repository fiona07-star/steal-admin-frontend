import { Routes } from '@angular/router';

// LAYOUT & GUARD
import { AdminLayoutComponent} from './admin/admin-layout-component/admin-layout-component';

// PAGES
import { QuanLyNguoiDungComponent } from './admin/pages/quan-ly-nguoi-dung-component/quan-ly-nguoi-dung-component';
import { ChiTietNguoiDungComponent } from './admin/pages/quan-ly-nguoi-dung-component/chi-tiet-nguoi-dung-component/chi-tiet-nguoi-dung-component';
import { QuanLyDanhGiaComponent } from './admin/pages/quan-ly-danh-gia-component/quan-ly-danh-gia-component';
import { CaiDatHeThongComponent} from './admin/pages/cai-dat-he-thong-component/cai-dat-he-thong-component';
import { quanTriGuardGuard } from './guards/quan-tri-guard';
import { QuanLyTroChoiComponent } from './admin/pages/san-pham/quan-ly-tro-choi-component/quan-ly-tro-choi-component';
import{QuanLyDanhMucComponent} from './admin/pages/san-pham/quan-ly-danh-muc-component/quan-ly-danh-muc-component';
import { ChiTietDanhMucComponent } from './admin/pages/san-pham/quan-ly-danh-muc-component/chi-tiet-danh-muc-component/chi-tiet-danh-muc-component';
import{ThongKeDoanhThuComponent} from './admin/pages/thong-ke-doanh-thu-component/thong-ke-doanh-thu-component';
import{ChiTietTroChoiComponent} from './admin/pages/san-pham/chi-tiet-tro-choi-component/chi-tiet-tro-choi-component';
import{QuanLyKhuyenMaiComponent} from './admin/pages/san-pham/quan-ly-khuyen-mai-component/quan-ly-khuyen-mai-component';
import{ChiTietKhuyenMaiComponent} from './admin/pages/san-pham/quan-ly-khuyen-mai-component/chi-tiet-khuyen-mai-component/chi-tiet-khuyen-mai-component';
import { TongQuanAdminComponent } from './admin/pages/tong-quan-admin-component/tong-quan-admin-component';
import { QuanLyDonHangComponent } from './admin/pages/quan-ly-don-hang-component/quan-ly-don-hang-component';
import { ChiTietDonHangComponent } from './admin/pages/quan-ly-don-hang-component/chi-tiet-don-hang-component/chi-tiet-don-hang-component';

export const routes: Routes = [
  // MẶC ĐỊNH MỞ TRANG ADMIN
  { path: '', redirectTo: 'admin', pathMatch: 'full' },

  // KHU VỰC ADMIN LAYOUT
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: TongQuanAdminComponent },
      { path: 'users', component: QuanLyNguoiDungComponent },
      {path:'users/:id', component: ChiTietNguoiDungComponent},
      { path: 'reviews', component: QuanLyDanhGiaComponent },
      { path: 'settings', component: CaiDatHeThongComponent },
      { path: 'games', component: QuanLyTroChoiComponent },
      { path: 'categories', component: QuanLyDanhMucComponent },
      { path:'categories/:id', component: ChiTietDanhMucComponent},
      { path: 'games/:id', component: ChiTietTroChoiComponent },
      { path: 'promotions', component: QuanLyKhuyenMaiComponent },
      { path: 'promotions/:id', component: ChiTietKhuyenMaiComponent },
      {path:'orders', component: QuanLyDonHangComponent},
      {path:'orders/:id', component: ChiTietDonHangComponent},
      {path:'analytics', component: ThongKeDoanhThuComponent}

    ]
  }
];