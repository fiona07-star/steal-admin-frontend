import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThanhBenAdminComponent } from '../components/thanh-ben-admin-component/thanh-ben-admin-component';
import { ThanhTrenAdminComponent } from '../components/thanh-tren-admin-component/thanh-tren-admin-component';

@Component({
  imports: [
    RouterOutlet,
    ThanhTrenAdminComponent,
    ThanhBenAdminComponent
  ],
  selector: 'app-admin-layout-component',
  styleUrl: './admin-layout-component.scss',
  templateUrl: './admin-layout-component.html',
})
export class AdminLayoutComponent {}
