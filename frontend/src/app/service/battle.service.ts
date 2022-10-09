import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../model/player';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService extends BaseService<Player> {
  constructor(http: HttpClient, config: ConfigService, player: PlayerService) {
    super(http, config);
    this.entity = 'player';
  }
}
