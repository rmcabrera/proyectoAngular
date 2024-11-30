import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
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
      declarations: [ HeaderComponent, TestHostComponent,  ],
      imports : [ToolbarModule, AvatarModule]
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
