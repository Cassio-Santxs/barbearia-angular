import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoreslistComponent } from './autoreslist.component';

describe('AutoreslistComponent', () => {
  let component: AutoreslistComponent;
  let fixture: ComponentFixture<AutoreslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoreslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoreslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
