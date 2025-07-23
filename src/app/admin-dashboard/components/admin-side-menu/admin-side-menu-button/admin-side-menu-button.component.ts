import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SideMenuService } from '../sideMenu.service';

@Component({
  selector: 'admin-side-menu-button',
  imports: [],
  templateUrl: './admin-side-menu-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuButtonComponent {

  sideMenuService = inject(SideMenuService)

}
