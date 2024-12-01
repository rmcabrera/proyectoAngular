import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

// Configuración mock de Firebase
const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake-auth-domain',
  projectId: 'fake-project-id',
  storageBucket: 'fake-storage-bucket',
  messagingSenderId: 'fake-messaging-sender-id',
  appId: 'fake-app-id'
};

// Simulación de un usuario para AngularFireAuth
class MockAngularFireAuth {
  currentUser = of({ displayName: 'Test User', email: 'test@example.com' });
  authState = of({ displayName: 'Test User', email: 'test@example.com' });
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockRouter: MockRouter;
  let authService: AuthService;

  beforeEach(async () => {
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [ RouterTestingModule, SidebarModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: AuthService, useValue: {} } 
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sidebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit visibleChange event when onClose is called', () => {
    spyOn(component.visibleChange, 'emit');

    component.onClose();

    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
    expect(component.visible).toBeFalse();
  });

  it('should navigate to the correct route when navigateTo is called', () => {
    const route = 'dashboard';
    component.navigateTo(route);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main/dashboard']);
  });

  it('should remove token and navigate to login when logout is called', () => {
    spyOn(localStorage, 'removeItem');
    
    component.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
