import { AllPlaceService } from './../../service/allplace.service';
import { PlaceService } from 'src/app/service/place.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllPlace } from 'src/app/model/allplace';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Place } from 'src/app/model/place';

@Component({
  selector: 'app-all-place-viewer',
  templateUrl: './all-place-viewer.component.html',
  styleUrls: ['./all-place-viewer.component.scss'],
})
export class AllPlaceViewerComponent implements OnInit {
  columns = this.config.placesTableColumns;
  list$: Observable<AllPlace[]> = this.allPlaceService.getAll();
  entity = 'allplace';

  constructor(
    private config: ConfigService,
    private placeService: PlaceService,
    private allPlaceService: AllPlaceService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  loadPlaces(): void {
    this.list$ = this.allPlaceService.getAll();
  }

  showSuccessDelete() {
    this.notifyService.showSuccess(
      `${this.entity} deleted successfully!`,
      'Miserere Mei v.1.0.0'
    );
  }

  showError(err: string) {
    this.notifyService.showError(
      'Something went wrong. Details: ' + err,
      'Miserere Mei v.1.0.0'
    );
  }

  onSelectOne(allPlace: AllPlace): void {
    this.router.navigate(['/place', 'select', allPlace.location]);
  }

  onDeleteOne(allPlace: AllPlace): void {
    this.placeService.delete(allPlace).subscribe({
      next: () => this.loadPlaces(),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessDelete(),
    });
  }
}
