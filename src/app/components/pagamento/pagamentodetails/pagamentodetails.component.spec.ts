import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentodetailsComponent } from './pagamentodetails.component';

describe('PagamentodetailsComponent', () => {
  let component: PagamentodetailsComponent;
  let fixture: ComponentFixture<PagamentodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagamentodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
