import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleButtonComponent } from './google-button.component';
import { By } from '@angular/platform-browser';

describe('GoogleButtonComponent', () => {
  let component: GoogleButtonComponent;
  let fixture: ComponentFixture<GoogleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleButtonComponent],  
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should emit onClick event when button is clicked', () => {
    spyOn(component.onClick, 'emit');  
   
    const button = fixture.debugElement.query(By.css('button'));
    
    button.triggerEventHandler('click', null); 


    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
