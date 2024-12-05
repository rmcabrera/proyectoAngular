import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AngularFireModule} from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedsModule } from './shared/shareds.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),  
    BrowserAnimationsModule,
    CoreModule
  ],
  exports : [
    
  ],
  providers: [
  
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
