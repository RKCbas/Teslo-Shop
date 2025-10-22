import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'admin-side-menu-header',
  imports: [RouterLink],
  templateUrl: './admin-side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuHeaderComponent {

  envs = environment

  authService = inject(AuthService)

  user = computed( () => this.authService.user() )

}
