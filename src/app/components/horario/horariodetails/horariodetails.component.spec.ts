import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariodetailsComponent } from './horariodetails.component';

describe('HorariodetailsComponent', () => {
  let component: HorariodetailsComponent;
  let fixture: ComponentFixture<HorariodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorariodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
