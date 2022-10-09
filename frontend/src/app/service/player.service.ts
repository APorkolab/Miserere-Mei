import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../model/player';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends BaseService<Player> {
  player$: BehaviorSubject<Player | null> = new BehaviorSubject<Player | null>(
    null
  );
  constructor(http: HttpClient, config: ConfigService, public router: Router) {
    super(http, config);
    this.entity = 'player';
  }

  // this.player$.subscribe({
  //   next: (player) => {
  //     if (player) {
  //       this.router.navigate(['/']);
  //     } else {
  //       this.access_token$.next('');
  //       sessionStorage.removeItem('login');
  //     }
  //     // this.router.navigate(['/', 'login']);
  //   },
  // });
}

// heathCheck() {
//   if (this.player$ .value?.protagonistHealthPoint >= 0) {
//     this.router.navigate(['/place/GameOver']);
//   }
// }
