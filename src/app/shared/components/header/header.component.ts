import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();

  userName: string | null = null; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userName = localStorage.getItem('userName');
    this.userName = userName ? userName : 'Invitado'; 
  }
  
}
