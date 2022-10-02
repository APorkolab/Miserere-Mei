import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesEditorComponent } from './places-editor.component';

describe('PlacesEditorComponent', () => {
  let component: PlacesEditorComponent;
  let fixture: ComponentFixture<PlacesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
