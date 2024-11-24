import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  sidebarVisible = false;

  constructor(private router: Router) {
  }
  
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
  
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
}
