import { PlaceService } from './../../service/place.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { INgxTableColumn } from 'src/app/common/data-table/ngx-data-table/ngx-data-table.component';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlayerService } from 'src/app/service/player.service';
import { BattleService } from 'src/app/service/battle.service';

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
  // monsterName = '';
  @Input() columns: INgxTableColumn[] = [];
  @Input() entity: string = '';

  @Output() selectOne: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() deleteOne: EventEmitter<Place> = new EventEmitter<Place>();

  // @Input()
  // @Output()

  monsterName = '';

  monsterSubscription!: Subscription;
  inBattle!: boolean;
  inBattleSubscription!: Subscription;
  monsterMinDamage = 0;
  monsterMaxDamage = 0;
  monsterHealth = 0;
  monsterMinDamageSubscription!: Subscription;
  monsterMaxDamageSubscription!: Subscription;
  monsterHealthSubscription!: Subscription;

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService,
    private data: BattleService
  ) { }

  ngOnInit(): void {
    this.getPlace(this.route.snapshot.params['location']);
    this.monsterMinDamageSubscription = this.data.currentMinDamage.subscribe(monsterMinDamage => this.monsterMinDamage = monsterMinDamage)
    this.monsterMaxDamageSubscription = this.data.currentMaxDamage.subscribe(monsterMaxDamage => this.monsterMaxDamage = monsterMaxDamage)
    this.monsterHealthSubscription = this.data.currentMonsterHealth.subscribe(monsterHealth => this.monsterHealth = monsterHealth)
    this.monsterSubscription = this.data.currentMessage.subscribe(message => this.monsterName = message)
    this.inBattleSubscription = this.data.currentBattleState.subscribe((state: boolean) => this.inBattle = state)
  }


  getPlace(location: string): void {
    this.placeService.getOnePlace(location).subscribe({
      next: (data) => {
        this.currentPlace = data;
        if (this.currentPlace.opponentName != '') {
          this.data.changeMessage(this.currentPlace.opponentName);
          this.data.changeMonsterHealth(this.currentPlace.opponenthealth);
          this.data.changeMonsterMinDamage(this.currentPlace.opponentMinDamage);
          this.data.changeMonsterMaxDamage(this.currentPlace.opponentMaxDamage);
          this.data.changeCurrentBattleState(true);
        } else {
          this.data.changeMessage('Nincs');
          this.data.changeCurrentBattleState(false);
        }
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  ngOnDestroy() {
    this.monsterSubscription.unsubscribe();
    this.inBattleSubscription.unsubscribe();
  }

}
