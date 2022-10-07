import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaceEditorComponent } from './all-place-editor.component';

describe('AllPlaceEditorComponent', () => {
  let component: AllPlaceEditorComponent;
  let fixture: ComponentFixture<AllPlaceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlaceEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
