import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();  
  @Output() logoutEvent = new EventEmitter<void>();   

  toggleSidebar() {
    this.sidebarToggle.emit();  
  }

  // Llamado cuando el usuario hace clic en el botón de logout
  logout() {
    this.logoutEvent.emit();  
  }
}
