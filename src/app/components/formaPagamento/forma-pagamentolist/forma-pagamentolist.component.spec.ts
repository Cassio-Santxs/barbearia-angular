import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentolistComponent } from './forma-pagamentolist.component';

describe('FormaPagamentolistComponent', () => {
  let component: FormaPagamentolistComponent;
  let fixture: ComponentFixture<FormaPagamentolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormaPagamentolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormaPagamentolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
