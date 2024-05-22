import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariodetailsComponent } from './funcionariodetails.component';

describe('FuncionariodetailsComponent', () => {
  let component: FuncionariodetailsComponent;
  let fixture: ComponentFixture<FuncionariodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
