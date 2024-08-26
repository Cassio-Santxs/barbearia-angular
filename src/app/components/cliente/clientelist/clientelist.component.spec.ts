import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientelistComponent } from './clientelist.component';

describe('ClientelistComponent', () => {
  let component: ClientelistComponent;
  let fixture: ComponentFixture<ClientelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
