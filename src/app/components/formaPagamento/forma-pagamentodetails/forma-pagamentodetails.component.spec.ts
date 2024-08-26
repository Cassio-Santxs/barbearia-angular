import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentodetailsComponent } from './forma-pagamentodetails.component';

describe('FormaPagamentodetailsComponent', () => {
  let component: FormaPagamentodetailsComponent;
  let fixture: ComponentFixture<FormaPagamentodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormaPagamentodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormaPagamentodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
