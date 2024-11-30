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
import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { TimestampToDatePipe } from './pipes/timestamp-to-date.pipe';
import { SharedModule } from 'primeng/api';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    WelcomeComponent,
    SidebarComponent,
    TimestampToDatePipe,
    TruncatePipe
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
    AvatarModule,
    BadgeModule,
    MenuModule,
    SharedModule,
    AngularFireModule
  ],
  exports: [
    SidebarModule,
    ToolbarModule,
    ButtonModule, 
    RouterModule,
    MainLayoutComponent,
    PanelModule,
    AvatarModule, 
    SidebarComponent,
    BadgeModule,
    MenuModule,
    TimestampToDatePipe,
    SharedModule,
    TruncatePipe
  ],
})
export class SharedsModule { }
