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

  private inBattle = new BehaviorSubject<boolean>(false);
  currentBattleState = this.inBattle.asObservable();


  //Monster data

  private monsterName = new BehaviorSubject('Nincs');
  currentMessage = this.monsterName.asObservable();

  private monsterMinDamage = new BehaviorSubject<number>(0);
  currentMinDamage = this.monsterMinDamage.asObservable();

  private monsterMaxDamage = new BehaviorSubject<number>(0);
  currentMaxDamage = this.monsterMaxDamage.asObservable();

  private monsterHealth = new BehaviorSubject<number>(0);
  currentMonsterHealth = this.monsterHealth.asObservable();

  //Player Date

  private weaponName = new BehaviorSubject('Beretta 92FS');
  currentWeapon = this.weaponName.asObservable();

  private playerMinDamage = new BehaviorSubject<number>(2);
  currentPlayerMinDamage = this.playerMinDamage.asObservable();

  private playerMaxDamage = new BehaviorSubject<number>(6);
  currentPlayerMaxDamage = this.playerMaxDamage.asObservable();

  private playerHealth = new BehaviorSubject<number>(100);
  currentPlayerHealth = this.playerHealth.asObservable();

  private playerBulletsNumber = new BehaviorSubject<number>(15);
  currentPlayerBulletsNumber = this.playerBulletsNumber.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.monsterName.next(message);
  }

  changeCurrentBattleState(state: boolean) {
    this.inBattle.next(state);
  }

  changeMonsterMinDamage(value: number) {
    this.monsterMinDamage.next(value);
  }

  changeMonsterMaxDamage(value: number) {
    this.monsterMaxDamage.next(value);
  }

  changeMonsterHealth(value: number) {
    this.monsterHealth.next(value);
  }

  //Player

  changePlayerMinDamage(value: number) {
    this.playerMinDamage.next(value);
  }

  changePlayerMaxDamage(value: number) {
    this.playerMaxDamage.next(value);
  }

  changePlayerHealth(value: number) {
    this.playerHealth.next(value);
  }

  changePlayerWeapon(message: string) {
    this.weaponName.next(message);
  }

  changePlayerBulletsNumber(value: number) {
    this.playerBulletsNumber.next(value);
  }

}
