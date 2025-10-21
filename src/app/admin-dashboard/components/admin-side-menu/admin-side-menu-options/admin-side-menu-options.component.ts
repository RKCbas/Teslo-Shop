import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

interface MenuOptions {
  icon: string
  label: string,
  route: string,
  subLabel: string,
  borderB: boolean
}

@Component({
  selector: 'admin-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './admin-side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuOptionsComponent {

  authService = inject(AuthService);

  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Productos',
      subLabel: 'lista de productos',
      route: '/admin/products',
      borderB: true
    },
    // {
    //   icon: 'fa-solid fa-magnifying-glass',
    //   label: 'Place Holder',
    //   subLabel: 'navegación temporal',
    //   route: '/admin/products',
    //   borderB: false
    // }
  ]

}
