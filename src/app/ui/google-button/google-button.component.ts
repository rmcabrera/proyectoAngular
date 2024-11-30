import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-button',
  standalone: true,
  templateUrl: './google-button.component.html',
})
export class GoogleButtonComponent {
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>(); 

  triggerClick() {
    this.onClick.emit(); 
  }
}
