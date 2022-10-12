import { Player } from 'src/app/model/player';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';
import { Observable, Subscription } from 'rxjs';
import { Enemy } from 'src/app/model/enemy';
import { BattleService } from 'src/app/service/battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  @ViewChild('roundNumbers')
  roundNumbers!: ElementRef;
  @ViewChild('damagePlayer')
  damagePlayer!: ElementRef;
  @ViewChild('damageEnemy')
  damageEnemy!: ElementRef;
  player$!: Observable<Player>;
  player: Player = new Player();
  enemy$!: Observable<Enemy>;
  enemy: Enemy = new Enemy();

  health = this.player.protagonistHealthPoint;
  weapon = this.player.currentWeaponName;
  minDamage = this.player.currentWeaponMinDamage;
  maxDamage = this.player.currentWeaponMaxDamage;
  bulletsNumber = this.player.playerAmmo;
  youAreDead = false;
  inBattle = false;
  roundDamageByPlayer = 0;
  roundNumber = 0;
  monsterName!: string;
  monsterhealth = this.enemy.monsterhealth;

  inBattleSubscription!: Subscription;
  subscription!: Subscription;
  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService,
    private data: BattleService
  ) { }

  ngOnInit(): void {
    this.inBattleSubscription = this.data.currentBattleState.subscribe((state: boolean) => this.inBattle = state)
    if (this.monsterhealth! >= 0) {
      this.data.changeCurrentBattleState(true)
    }
    this.subscription = this.data.currentMessage.subscribe(monsterName => this.monsterName = monsterName)
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

  // onSelectOne(player: Player): void {
  //   this.router.navigate(['/', 'player', player._id]);
  // }

  // onUpdate(player: Player) {
  //   this.playerService.update(player).subscribe({
  //     next: (category) => console.log(category),
  //     error: (err) => console.log(err),
  //   });
  // }


  oneRound(player: Player) {
    this.roundNumber += 1;
    this.inBattle = true;
    this.healthCheck(player);
    this.bulletCheck(player);
    this.roundDamageByPlayer = this.randomDamage(player);
    this.health -= this.roundDamageByPlayer;
    this.healthCheck(player);
    this.battleMessage();
  }

  randomDamage(player: Player) {
    return (
      Math.floor(
        Math.random() *
        (player.currentWeaponMaxDamage - player.currentWeaponMinDamage)
      ) + player.currentWeaponMinDamage
    );
  }

  healthCheck(player: Player): void {
    if (this.health <= 0) {
      this.youAreDead = true;
      this.notifyService.showError('Vége a játéknak!', 'MEGHALTÁL!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  bulletCheck(player: Player) {
    if (this.bulletsNumber <= 1) {
      this.notifyService.showError(
        'Cantusnak elfogyott a lőszere, ezért a jó öreg Bowie-késére vált át!',
        'NINCS LŐSZER!'
      );
      this.minDamage = 1;
      this.maxDamage = 3;
      (this.weapon = 'Bowie-kés'), (this.bulletsNumber = Infinity);
    } else {
      this.bulletsNumber -= 1;
    }
  }

  enemyHealthCheck(enemy: []) { }

  battleMessage() {
    // Add a new span every round
    // const roundP: HTMLParagraphElement = this.renderer.createElement('p');
    // roundP.innerHTML = `<br><b>A(z) ${this.roundNumber}. harci kör eseményei:</b>`;
    // const damagePlayerP: HTMLParagraphElement =
    //   this.renderer.createElement('span');
    // damagePlayerP.innerHTML = `${this.roundDamageByPlayer} sebzést okoztál az ellenségnek.<br>`;
    // const damageEnemyP: HTMLParagraphElement =
    //   this.renderer.createElement('span');
    // damageEnemyP.innerHTML = `Az ellenfeled ${this.roundDamageByPlayer} sebzést okozott neked.<br>`;
    // this.renderer.appendChild(this.battleMessage.nativeElement, roundP);
    // this.renderer.appendChild(this.battleMessage.nativeElement, damagePlayerP);
    // this.renderer.appendChild(this.battleMessage.nativeElement, damageEnemyP);

    this.roundNumbers.nativeElement.innerHTML = `<br><b>A(z) ${this.roundNumber}. harci kör eseményei:</b>`;
    this.damagePlayer.nativeElement.innerHTML = `${this.roundDamageByPlayer} sebzést okoztál az ellenségnek.<br>`;
    this.damageEnemy.nativeElement.innerHTML = `Az ellenfeled ${this.roundDamageByPlayer} sebzést okozott neked.<br>`;
  }

}
