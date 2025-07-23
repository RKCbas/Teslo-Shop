import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSideMenuComponent } from "@dashboard/components/admin-side-menu/admin-side-menu.component";

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [
    RouterOutlet,
    AdminSideMenuComponent
],
  templateUrl: './admin-dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardLayoutComponent { }
