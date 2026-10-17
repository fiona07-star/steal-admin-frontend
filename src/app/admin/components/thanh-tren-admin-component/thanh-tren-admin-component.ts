import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-thanh-tren-admin-component',
  styleUrl: './thanh-tren-admin-component.scss',
  templateUrl: './thanh-tren-admin-component.html',
})
export class ThanhTrenAdminComponent {
  private platformId = inject(PLATFORM_ID);

  logoUrl: string = '';
  brandName: string = 'STEAL';
  hasLogoError: boolean = false;

  ngOnInit(): void {
    // Chỉ đọc localStorage phía Browser để tránh lỗi crash trên SSR (Node.js)
    if (isPlatformBrowser(this.platformId)) {
      this.logoUrl = localStorage.getItem('steal_admin_logo') || '';
      this.brandName = localStorage.getItem('steal_admin_brand') || 'STEAL';
    }
  }

  onLogoError(): void {
    this.hasLogoError = true;
  }
}
