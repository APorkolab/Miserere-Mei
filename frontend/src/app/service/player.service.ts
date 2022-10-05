import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends BaseService<Player> {
  constructor(http: HttpClient, config: ConfigService) {
    super(http, config);
    this.entity = 'player';
  }
}
