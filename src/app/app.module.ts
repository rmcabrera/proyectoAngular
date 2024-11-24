import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule aquí

import { AngularFireModule} from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found/page-not-found.component';
import { AuthService } from './core/services/auth/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { TaskModule } from './features/tasks/tasks.module';
import { AuthModule } from './features/auth/auth.module';
import { environment } from '../environments/environment';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SharedsModule } from './shared/shareds.module';
import { PanelModule } from 'primeng/panel';

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
    SharedsModule,
    ButtonModule,
    CardModule,
    AuthModule,
    PanelModule,
    AngularFireModule.initializeApp(environment.firebase),    
  ],
  exports : [
    
  ],
  providers: [
    AuthService, 
    AuthGuard,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
