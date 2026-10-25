import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongTinChungComponent } from './thong-tin-chung-component/thong-tin-chung-component';
import { ThanhToanComponent } from './thanh-toan-component/thanh-toan-component';
import { BaoTriComponent } from './bao-tri-component/bao-tri-component';
import { PhanQuyenAdminComponent } from './phan-quyen-admin-component/phan-quyen-admin-component';
import { ThongBaoComponent } from './thong-bao-component/thong-bao-component';
import { ChinhSachComponent } from './chinh-sach-component/chinh-sach-component';
import { HoaDonComponent } from './hoa-don-component/hoa-don-component';

@Component({
  selector: 'app-cai-dat-he-thong',
  standalone: true,
  imports: [
    CommonModule,
    ThongTinChungComponent,
    ThanhToanComponent,
    BaoTriComponent,
    PhanQuyenAdminComponent,
    ThongBaoComponent,
    ChinhSachComponent,
    HoaDonComponent
  ],
  templateUrl: './cai-dat-he-thong-component.html',
  styleUrl: './cai-dat-he-thong-component.css'
})
export class CaiDatHeThongComponent {
  activeTab: string = 'thong-tin-chung';

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }
}