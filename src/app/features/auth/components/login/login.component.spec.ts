import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { GoogleButtonComponent } from '../../../../ui/google-button/google-button.component';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id'
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: Partial<AuthService>;
  let toastrServiceStub: Partial<ToastrService>;

  beforeEach(async () => {
    authServiceStub = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve('fake-token')),
      loginWithGoogle: jasmine.createSpy('loginWithGoogle').and.returnValue(of({ getIdToken: () => 'fake-google-token' }))
    };

    toastrServiceStub = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        GoogleButtonComponent,
        FormsModule,DividerModule,
        ToastrModule.forRoot(),
        CheckboxModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: ToastrService, useValue: toastrServiceStub },
        AngularFireAuth
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
