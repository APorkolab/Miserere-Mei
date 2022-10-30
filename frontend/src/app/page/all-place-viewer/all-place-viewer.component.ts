import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllPlace } from 'src/app/model/allplace';
import { AllPlaceViewerService } from 'src/app/service/all-place-viewer.service';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-all-place-viewer',
  templateUrl: './all-place-viewer.component.html',
  styleUrls: ['./all-place-viewer.component.scss'],
})
export class AllPlaceViewerComponent implements OnInit {
  columns = this.config.placesTableColumns;
  list$ = this.allPlaceViewerService.getAll();
  entity = 'allplace';

  constructor(
    private config: ConfigService,
    private allPlaceViewerService: AllPlaceViewerService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void { }

  showSuccessDelete() {
    this.notifyService.showSuccess(
      `${this.entity} delete successfully!`,
      'Miserere Mei v.1.0.0'
    );
  }

  showError(err: String) {
    this.notifyService.showError(
      'Something went wrong. Details:' + err,
      'Miserere Mei v.1.0.0'
    );
  }

  onSelectOne(allPlace: AllPlace): void {
    this.router.navigate(['/allplace', 'select', allPlace._id]);
  }

  onDeleteOne(allPlace: AllPlace): void {
    this.allPlaceViewerService.delete(allPlace).subscribe({
      next: () => (this.list$ = this.allPlaceViewerService.getAll()),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessDelete(),
    });
  }
}
