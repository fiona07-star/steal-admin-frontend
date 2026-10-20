import { Component, ElementRef, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  standalone: true,
  selector: 'app-thanh-ben-admin-component',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './thanh-ben-admin-component.css',
  templateUrl: './thanh-ben-admin-component.html',
})
export class ThanhBenAdminComponent {
 isProductMenuOpen: boolean = false;
  isProductRouteActive: boolean = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef // Inject ElementRef để tham chiếu đến HTML của Component
  ) {}

  ngOnInit(): void {
    this.checkActiveRoute(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkActiveRoute(event.urlAfterRedirects || event.url);
      });
  }

  // Lắng nghe sự kiện click trên toàn màn hình
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    // Nếu menu đang mở và vị trí click NẰM NGOÀI menu Sản phẩm
    const productMenuElement = this.elementRef.nativeElement.querySelector('#product-menu-item');
    
    if (this.isProductMenuOpen && productMenuElement && !productMenuElement.contains(event.target as Node)) {
      // Chỉ thu gọn nếu trang hiện tại KHÔNG PHẢI là trang con của Sản phẩm
      if (!this.isProductRouteActive) {
        this.isProductMenuOpen = false;
      }
    }
  }

  private checkActiveRoute(url: string): void {
    if (
      url.includes('/admin/games') ||
      url.includes('/admin/categories') ||
      url.includes('/admin/promotions')
    ) {
      this.isProductMenuOpen = true;
      this.isProductRouteActive = true;
    } else {
      this.isProductRouteActive = false;
    }
  }

  toggleProductMenu(): void {
    this.isProductMenuOpen = !this.isProductMenuOpen;
  }
}
