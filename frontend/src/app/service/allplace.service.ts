import { PlayerService } from 'src/app/service/player.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Player } from '../model/player';
import { Router } from '@angular/router';
import { Place } from '../model/place';

@Injectable({
  providedIn: 'root',
})
export class AllPlaceService extends BaseService<Place> {
  constructor(http: HttpClient, config: ConfigService, player: PlayerService) {
    super(http, config);
    this.entity = 'allplace';
  }
}
