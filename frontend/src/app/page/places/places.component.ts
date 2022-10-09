import { PlaceService } from './../../service/place.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { INgxTableColumn } from 'src/app/common/data-table/ngx-data-table/ngx-data-table.component';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  @Input()
  currentPlace!: Place;
  // @Input()
  // playerData!: Player;

  @Input() columns: INgxTableColumn[] = [];
  @Input() entity: string = '';

  @Output() selectOne: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() deleteOne: EventEmitter<Place> = new EventEmitter<Place>();

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.getPlace(this.route.snapshot.params['location']);
  }

  getPlace(location: string): void {
    this.placeService.getOnePlace(location).subscribe({
      next: (data) => {
        this.currentPlace = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
