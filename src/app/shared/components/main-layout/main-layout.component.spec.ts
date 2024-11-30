import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { Component, EventEmitter, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

// Mock de AngularFireAuth
class MockAngularFireAuth {
  currentUser = of({ displayName: 'Test User', email: 'test@example.com' });
}

// Mock de AuthService
class MockAuthService {
  currentUser = new MockAngularFireAuth().currentUser; 
}

@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
}

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent, MockHeaderComponent, SidebarComponent],
      imports: [RouterTestingModule, SidebarModule, BrowserAnimationsModule, ButtonModule, AvatarModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService }, 
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }, 
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar visibility when sidebarToggle event is emitted', () => {
    const headerDe = fixture.debugElement.query(By.directive(MockHeaderComponent));
    const headerComponent = headerDe.componentInstance as MockHeaderComponent;

    expect(component.sidebarVisible).toBeFalse();

    headerComponent.sidebarToggle.emit();
    fixture.detectChanges();

    expect(component.sidebarVisible).toBeTrue();

    headerComponent.sidebarToggle.emit();
    fixture.detectChanges();

    expect(component.sidebarVisible).toBeFalse();
  });
});
