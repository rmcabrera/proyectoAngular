import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
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

@Component({
  template: `<app-header (sidebarToggle)="onSidebarToggle()"></app-header>`
})
class TestHostComponent {
  sidebarToggled = false;

  onSidebarToggle() {
    this.sidebarToggled = true;
  }
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let headerComponent: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, TestHostComponent],
      imports: [
        ToolbarModule,
        AvatarModule,
        AngularFireModule.initializeApp(firebaseConfig) 
      ],
      providers: [
        AuthService,
        {
          provide: AngularFireAuth,
          useValue: {
            currentUser: of({ displayName: 'Test User', email: 'test@example.com' }), 
            authState: of({ displayName: 'Test User', email: 'test@example.com' })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    headerComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should emit sidebarToggle event and trigger parent method', () => {
    spyOn(hostComponent, 'onSidebarToggle').and.callThrough();

    headerComponent.sidebarToggle.emit();

    expect(hostComponent.onSidebarToggle).toHaveBeenCalled();
    expect(hostComponent.sidebarToggled).toBeTrue();
  });
});
