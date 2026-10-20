
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const quanTriGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Chỉ truy cập localStorage trên trình duyệt
  if (!isPlatformBrowser(platformId)) {
    return router.parseUrl('/admin/login');
  }

  const adminToken = localStorage.getItem('admin_token');

  if (adminToken) {
    return true;
  }

  // Thông báo giống ví dụ trong slide
  alert('Bạn cần đăng nhập để truy cập trang quản trị!');

  return router.parseUrl('/admin/login');
};
