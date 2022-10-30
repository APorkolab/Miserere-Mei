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
  constructor(http: HttpClient, config: ConfigService, public router: Router) {
    super(http, config);
    this.entity = 'player';
  }

}
