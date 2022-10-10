import { Player } from 'src/app/model/player';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  player$!: Observable<Player>;
  player: Player = new Player();

  health = this.player.protagonistHealthPoint;
  weapon = this.player.currentWeaponName;
  minDamage = this.player.currentWeaponMinDamage;
  maxDamage = this.player.currentWeaponMaxDamage;
  bulletsNumber = this.player.playerAmmo;
  youAreDead = false;
  inBattle = false;

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService
  ) {}

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

  onSelectOne(player: Player): void {
    this.router.navigate(['/', 'player', player._id]);
  }

  onUpdate(player: Player) {
    this.playerService.update(player).subscribe({
      next: (category) => console.log(category),
      error: (err) => console.log(err),
    });
  }

  oneRound(player: Player) {
    this.inBattle = true;
    this.healthCheck(player);
    this.bulletCheck(player);
    this.health -= this.randomDamage(player);
    this.healthCheck(player);
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

  enemyHealthCheck(enemy: []) {}
}
