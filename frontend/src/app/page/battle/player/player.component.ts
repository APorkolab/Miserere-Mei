import { state } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { INgxTableColumn } from 'src/app/common/data-table/ngx-data-table/ngx-data-table.component';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { BattleService } from 'src/app/service/battle.service';
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

  // @Input()
  // health!: number;
  // @Output() healthChange = new EventEmitter<number>();

  // @Input()
  // weapon!: string;
  // @Output() weaponChange = new EventEmitter<string>();

  // @Input()
  // minDamage!: number;
  // @Output() minDamageChange = new EventEmitter<number>();

  // @Input()
  // maxDamage!: number;
  // @Output() maxDamageChange = new EventEmitter<number>();

  // @Input()
  // bulletsNumber!: number;
  // @Output() bulletsNumberChange = new EventEmitter<number>();


  weaponName!: string;
  playerMinDamage !: number;
  playerMaxDamage !: number;
  playerHealth !: number;
  playerBulletsNumber !: number;
  playerMinDamageSubscription!: Subscription;
  playerMaxDamageSubscription!: Subscription;
  playerHealthSubscription!: Subscription;
  playerWeaponSubscription!: Subscription;
  playerBulletsNumberSubscription!: Subscription;


  monsterName!: string;
  subscription!: Subscription;
  monsterMinDamage!: number;
  monsterMaxDamage!: number;
  monsterHealth!: number;
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
    this.subscription = this.data.currentMessage.subscribe(monsterName => this.monsterName = monsterName)
    this.monsterMinDamageSubscription = this.data.currentMinDamage.subscribe(monsterMinDamage => this.monsterMinDamage = monsterMinDamage)
    this.monsterMaxDamageSubscription = this.data.currentMaxDamage.subscribe(monsterMaxDamage => this.monsterMaxDamage = monsterMaxDamage)
    this.monsterHealthSubscription = this.data.currentMonsterHealth.subscribe(monsterHealth => this.monsterHealth = monsterHealth)
    this.playerHealthSubscription = this.data.currentPlayerHealth.subscribe(playerHealth => this.playerHealth = playerHealth)
    this.playerMinDamageSubscription = this.data.currentPlayerMinDamage.subscribe(playerMinDamage => this.playerMinDamage = playerMinDamage)
    this.playerMaxDamageSubscription = this.data.currentPlayerMaxDamage.subscribe(playerMaxDamage => this.playerMaxDamage = playerMaxDamage)
    this.playerBulletsNumberSubscription = this.data.currentPlayerBulletsNumber.subscribe(playerBulletsNumber => this.playerBulletsNumber = playerBulletsNumber)
    this.playerWeaponSubscription = this.data.currentWeapon.subscribe(weaponName => this.weaponName = weaponName)

    // this.route.params.subscribe({
    //   next: (param) => {
    //     this.player$ = this.playerService.getPlayer('63429c0c2a50f89e873e0ede');
    //     return this.playerService.getPlayer('63429c0c2a50f89e873e0ede');
    //   },
    // });
    // this.player$.subscribe({
    //   next: (player) => (this.player = player ? player : this.player),
    // });
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
