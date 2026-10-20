import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-thanh-tren-admin-component',
  styleUrl: './thanh-tren-admin-component.css',
  templateUrl: './thanh-tren-admin-component.html',
})
export class ThanhTrenAdminComponent {
  logoUrl: string = '';
  hasLogoError: boolean = false;
  brandName: string = 'STEAL';
  isUserMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  onLogoError(): void {
    this.hasLogoError = true;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Tự động đóng dropdown khi click ra ngoài
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const dropdownElement = this.elementRef.nativeElement.querySelector('#admin-user-dropdown');
    if (this.isUserMenuOpen && dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.isUserMenuOpen = false;
    }
}
dangXuat(): void {
    this.isUserMenuOpen = false;
    localStorage.removeItem('admin_token');
    this.router.navigate(['/admin/login']);
  }
}