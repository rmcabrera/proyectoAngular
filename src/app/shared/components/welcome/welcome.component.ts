import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  backgroundImageUrl: string = '';

  ngOnInit(): void {
    this.backgroundImageUrl = 'https://www.wimi-teamwork.com/static/medias/logiciels-gestion-des-taches-1280x640-1.png';
  }
}
