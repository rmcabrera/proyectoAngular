import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarModule } from 'primeng/sidebar';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [ RouterTestingModule, SidebarModule ], 
      providers: [
        { provide: Router, useValue: mockRouter }, 
        { provide: ActivatedRoute, useValue: {} }
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

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
