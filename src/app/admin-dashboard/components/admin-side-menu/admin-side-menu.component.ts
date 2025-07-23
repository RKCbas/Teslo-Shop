import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminSideMenuButtonComponent } from "./admin-side-menu-button/admin-side-menu-button.component";
import { SideMenuService } from './sideMenu.service';
import { NgClass } from '@angular/common';
import { AdminSideMenuHeaderComponent } from "./admin-side-menu-header/admin-side-menu-header.component";
import { AdminSideMenuOptionsComponent } from "./admin-side-menu-options/admin-side-menu-options.component";

@Component({
  selector: 'admin-side-menu',
  imports: [
    AdminSideMenuButtonComponent,
    NgClass,
    AdminSideMenuHeaderComponent,
    AdminSideMenuOptionsComponent
],
  templateUrl: './admin-side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuComponent {

  sideMenuService = inject(SideMenuService)

}
