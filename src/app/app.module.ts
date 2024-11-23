import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule aquí

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found/page-not-found.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { TaskModule } from './features/tasks/tasks.module';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TaskModule,
    AuthModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
