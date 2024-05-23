import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentolistComponent } from './pagamentolist.component';

describe('PagamentolistComponent', () => {
  let component: PagamentolistComponent;
  let fixture: ComponentFixture<PagamentolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagamentolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
