import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  // columns = this.config.;

  list$ = this.placeService.getAll();
  entity = 'Place';
  place!: Place;
  player: Player = new Player();
  whereTo = '';

  constructor(
    private placeService: PlaceService,
    private config: ConfigService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.gotoPlace('GameBeginning');
  }

  showSuccessDelete() {
    this.notifyService.showSuccess(
      `${this.entity} delete successfully!`,
      'NyelvSzó v.2.0.0'
    );
  }

  showError(err: String) {
    this.notifyService.showError(
      'Something went wrong. Details:' + err,
      'NyelvSzó v.2.0.0'
    );
  }

  onSelectOne(place: Place): void {
    this.router.navigate(['/', 'entries', 'edit', place._id]);
  }

  onDeleteOne(place: Place): void {
    this.placeService.delete(place).subscribe({
      next: () => (this.list$ = this.placeService.getAll()),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessDelete(),
    });
  }

  gotoPlace(locationName: string) {
    this.placeService
      .getPlace(locationName)
      .subscribe((value) => (this.place = value));
  }

  clickLocation(event: Event) {
    console.log(event);
    this.gotoPlace((event.target as HTMLBodyElement).id);
  }
}
