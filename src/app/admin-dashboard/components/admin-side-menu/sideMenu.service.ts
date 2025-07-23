import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  isSideMenuOpen = signal(false);

  changeMenu(){
    this.isSideMenuOpen.set(!this.isSideMenuOpen())
  }

}
