import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PanelModule } from 'primeng/panel';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    PanelModule,
  ],
  exports: [
    SidebarModule,
    ToolbarModule,
    ButtonModule, 
    RouterModule,
    MainLayoutComponent,
    PanelModule,
  ],
})
export class SharedsModule { }
