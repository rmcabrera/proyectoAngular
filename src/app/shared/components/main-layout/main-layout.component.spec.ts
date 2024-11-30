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
      imports: [RouterTestingModule, SidebarModule, BrowserAnimationsModule, ButtonModule, AvatarModule]
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
