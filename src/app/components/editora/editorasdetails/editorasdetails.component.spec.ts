import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorasdetailsComponent } from './editorasdetails.component';

describe('EditorasdetailsComponent', () => {
  let component: EditorasdetailsComponent;
  let fixture: ComponentFixture<EditorasdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorasdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
