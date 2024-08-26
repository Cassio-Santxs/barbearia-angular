import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdetailsComponent } from './logdetails.component';

describe('FuncionariodetailsComponent', () => {
  let component: LogdetailsComponent;
  let fixture: ComponentFixture<LogdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
