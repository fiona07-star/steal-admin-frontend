import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ThanhBenAdminComponent } from '../components/thanh-ben-admin-component/thanh-ben-admin-component';
import { ThanhTrenAdminComponent } from '../components/thanh-tren-admin-component/thanh-tren-admin-component';

@Component({
  selector: 'app-admin-layout-component',
  standalone: true,
  imports: [
    RouterOutlet,
    ThanhTrenAdminComponent,
    ThanhBenAdminComponent
  ],
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.css',
})
export class AdminLayoutComponent {
  adminEmail: string = 'admin@stealgame.vn';
  adminHoTen: string = 'Quản Trị Viên Trưởng';
  isSidebarCollapsed: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  dangXuat(): void {
    // 1. Kiểm tra an toàn cho môi trường SSR trước khi thao tác với localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('admin_token');
      localStorage.removeItem('adminUser');
    }

    // 2. Chuyển hướng người dùng quay lại màn hình đăng nhập
    this.router.navigate(['/admin/login']);
  }
}