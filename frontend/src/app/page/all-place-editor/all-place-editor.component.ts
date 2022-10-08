import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Place } from 'src/app/model/place';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-all-place-editor',
  templateUrl: './all-place-editor.component.html',
  styleUrls: ['./all-place-editor.component.scss'],
})
export class AllPlaceEditorComponent implements OnInit {
  place$!: Observable<Place>;
  place: Place = new Place();
  entity = 'allPlace';
  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param) => {
        if (param['id'] == '0') {
          return of(new Place());
        }
        this.place$ = this.placeService.getOne(param['id']);
        return this.placeService.getOne(param['id']);
      },
    });
    this.place$.subscribe({
      next: (place) => (this.place = place ? place : this.place),
    });
  }

  onUpdate(place: Place) {
    this.placeService.update(place).subscribe({
      next: (category) => this.router.navigate(['/', 'all-place']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate(place: Place) {
    this.placeService.create(place).subscribe({
      next: (category) => this.router.navigate(['/', 'all-place']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessCreate(),
    });
  }

  showSuccessEdit() {
    this.notifyService.showSuccess(
      `${this.entity} edited successfully!`,
      'Miserere Mei v.1.0.0'
    );
  }

  showSuccessCreate() {
    this.notifyService.showSuccess(
      `${this.entity} created successfully!`,
      'Miserere Mei v.1.0.0'
    );
  }

  showError(err: String) {
    this.notifyService.showError(
      'Something went wrong. Details:' + err,
      'Miserere Mei v.1.0.0'
    );
  }
}
