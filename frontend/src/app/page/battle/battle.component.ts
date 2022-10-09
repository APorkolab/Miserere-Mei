import { Player } from 'src/app/model/player';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void {}

  onSelectOne(player: Player): void {
    this.router.navigate(['/', 'player', player._id]);
  }

  onUpdate(player: Player) {
    this.playerService.update(player).subscribe({
      next: (category) => this.router.navigate(['/', 'player']),
      error: (err) => console.log(err),
    });
  }
}
