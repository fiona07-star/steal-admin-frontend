import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThanhBenAdminComponent } from '../components/thanh-ben-admin-component/thanh-ben-admin-component';
import { ThanhTrenAdminComponent } from '../components/thanh-tren-admin-component/thanh-tren-admin-component';

@Component({
  imports: [
    RouterOutlet,
    ThanhTrenAdminComponent,
    ThanhBenAdminComponent
  ],
  selector: 'app-admin-layout-component',
  styleUrl: './admin-layout-component.css',
  templateUrl: './admin-layout-component.html',
})
export class AdminLayoutComponent {
  adminEmail: string = 'admin@steam.com';
  adminHoTen: string = 'Quản Trị Viên Trưởng';
  isSidebarCollapsed: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  dangXuat(): void {
    // Xóa Token và đẩy quay về màn hình Đăng nhập
    localStorage.removeItem('admin_token');
    this.router.navigate(['/admin/login']);
  }
}
