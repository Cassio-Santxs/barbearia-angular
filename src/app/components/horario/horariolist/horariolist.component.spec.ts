import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariolistComponent } from './horariolist.component';

describe('HorariolistComponent', () => {
  let component: HorariolistComponent;
  let fixture: ComponentFixture<HorariolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorariolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
