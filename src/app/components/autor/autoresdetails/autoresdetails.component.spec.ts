import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresdetailsComponent } from './autoresdetails.component';

describe('AutoresdetailsComponent', () => {
  let component: AutoresdetailsComponent;
  let fixture: ComponentFixture<AutoresdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoresdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
