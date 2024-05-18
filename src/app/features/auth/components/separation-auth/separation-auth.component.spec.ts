import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationAuthComponent } from './separation-auth.component';

describe('SeparationAuthComponent', () => {
  let component: SeparationAuthComponent;
  let fixture: ComponentFixture<SeparationAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparationAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeparationAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
