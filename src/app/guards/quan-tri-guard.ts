import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const quanTriGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 1. Nếu đang chạy trên Trình duyệt (Client) -> Kiểm tra Auth thực tế
  if (isPlatformBrowser(platformId)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      return true; // Đã đăng nhập -> Cho phép vào trang Admin
    }

    // Chưa đăng nhập -> Chuyển về trang login
    router.navigate(['/admin/login']);
    return false;
  }

  // 2. Nếu đang render trên Server (SSR) -> Bỏ qua redirect để tránh AbortError
  return true;
};