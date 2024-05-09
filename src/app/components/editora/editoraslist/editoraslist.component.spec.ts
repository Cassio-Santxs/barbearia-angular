import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoraslistComponent } from './editoraslist.component';

describe('EditoraslistComponent', () => {
  let component: EditoraslistComponent;
  let fixture: ComponentFixture<EditoraslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditoraslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditoraslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
