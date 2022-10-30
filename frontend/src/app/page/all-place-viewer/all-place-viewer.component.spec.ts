import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaceViewerComponent } from './all-place-viewer.component';

describe('AllPlaceViewerComponent', () => {
  let component: AllPlaceViewerComponent;
  let fixture: ComponentFixture<AllPlaceViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlaceViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlaceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
