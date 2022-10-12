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
export class BattleService {
  private monsterName = new BehaviorSubject('Nincs');
  currentMessage = this.monsterName.asObservable();

  private inBattle = new BehaviorSubject<boolean>(false);
  currentBattleState = this.inBattle.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.monsterName.next(message);
  }

  changeCurrentBattleState(state: boolean) {
    this.inBattle.next(state);
  }

}
