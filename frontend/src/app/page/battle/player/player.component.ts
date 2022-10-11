import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INgxTableColumn } from 'src/app/common/data-table/ngx-data-table/ngx-data-table.component';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  // @Output() selectOne: EventEmitter<Player> = new EventEmitter<Player>();
  public player$!: Observable<Player>;
  @Output()
  player: Player = new Player();

  @Input()
  health!: number;
  @Output() healthChange = new EventEmitter<number>();

  @Input()
  weapon!: string;
  @Output() weaponChange = new EventEmitter<string>();

  @Input()
  minDamage!: number;
  @Output() minDamageChange = new EventEmitter<number>();

  @Input()
  maxDamage!: number;
  @Output() maxDamageChange = new EventEmitter<number>();

  @Input()
  bulletsNumber!: number;
  @Output() bulletsNumberChange = new EventEmitter<number>();

  monsterName = "Tarara"
  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param) => {
        this.player$ = this.playerService.getPlayer('63429c0c2a50f89e873e0ede');
        return this.playerService.getPlayer('63429c0c2a50f89e873e0ede');
      },
    });
    this.player$.subscribe({
      next: (player) => (this.player = player ? player : this.player),
    });
  }

  // healthCheck(player: Player): void {
  //   if (this.health <= 0) {
  //     this.router.navigate(['/', 'place', 'warehouse_058_waitingfordeath']);
  //   }
  // }

  // randomDamage(player: Player) {
  //   this.healthCheck(player);
  //   return (
  //     Math.floor(
  //       Math.random() *
  //         (player.currentWeaponMaxDamage - player.currentWeaponMinDamage)
  //     ) + player.currentWeaponMinDamage
  //   );
  // }
}
