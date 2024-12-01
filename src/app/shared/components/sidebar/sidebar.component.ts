import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    userName: string | null = null; 

    constructor(private router: Router, private route: ActivatedRoute,
        private authService: AuthService
    ) {}


    ngOnInit() {
      const userName = localStorage.getItem('userName');
      this.userName = userName ? userName : 'Invitado'; 
    }

    navigateTo(childRoute: string): void {
      console.log(childRoute)
      this.router.navigate([`/main/${childRoute}`]); 
    }
    onClose() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    logout() {
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('userName'); 
      this.router.navigate(['/login']); 
    }
}
