import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AllPlace } from 'src/app/model/allplace';
import { AllPlaceService } from 'src/app/service/allplace.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-all-place-editor',
  templateUrl: './all-place-editor.component.html',
  styleUrls: ['./all-place-editor.component.scss'],
})
export class AllPlaceEditorComponent implements OnInit {
  allplace$!: Observable<AllPlace>;
  allplace: AllPlace = new AllPlace();
  entity = 'allplace';
  constructor(
    private placeService: AllPlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param) => {
        if (param['id'] == '0') {
          return of(new AllPlace());
        }
        this.allplace$ = this.placeService.getOne(param['id']);
        return this.placeService.getOne(param['id']);
      },
    });
    this.allplace$.subscribe({
      next: (allplace) => (this.allplace = allplace ? allplace : this.allplace),
    });
  }

  onUpdate(allplace: AllPlace) {
    this.placeService.update(allplace).subscribe({
      next: (category) => this.router.navigate(['/', 'allplace']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate(allplace: AllPlace) {
    this.placeService.create(allplace).subscribe({
      next: (category) => this.router.navigate(['/', 'allplace']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessCreate(),
    });
  }

  showSuccessEdit() {
    this.notifyService.showSuccess(
      `The place edited successfully!`,
      'Miserere Mei v.1.0.0'
    );
  }

  showSuccessCreate() {
    this.notifyService.showSuccess(
      `The place created successfully!`,
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
