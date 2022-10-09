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
  @Output() selectOne: EventEmitter<Player> = new EventEmitter<Player>();
  player$!: Observable<Player>;
  player: Player = new Player();

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.player$.subscribe({
      next: (player) => (this.player = player ? player : this.player),
    });
  }

  // getPlayer(): void {
  //   this.playerService.getOne('63429c0c2a50f89e873e0ede').subscribe({
  //     next: (playerData) => {
  //       this.playerData = playerData;
  //       console.log(playerData);
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }

  // updatePlayer(player: Player) {
  //   this.playerService.update(player).subscribe({
  //     next: (category) => this.router.navigate(['/', 'player']),
  //     error: (err) => console.log(err),
  //   });
  // }

  onSelect(player: Player): void {
    this.selectOne.emit(player);
  }
}
