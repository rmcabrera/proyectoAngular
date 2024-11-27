import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    constructor(private router: Router, private route: ActivatedRoute) {}
/*
    navigateTo(childRoute: string): void {
      console.log(childRoute)
      this.router.navigate([childRoute], { relativeTo: this.route }); 
    }*/
    navigateTo(childRoute: string): void {
      console.log(childRoute)
      this.router.navigate([`/main/${childRoute}`]); 
    }
    onClose() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    logout() {
      localStorage.removeItem('token'); 
      this.router.navigate(['/login']); 
    }
}
