import { NotificationService } from 'src/app/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { time } from 'console';
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

  //Player data

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

  private playerInventory = new BehaviorSubject<Array<any>>([]);
  currentPlayerInventory = this.playerInventory.asObservable();

  itemName: string = '';

  constructor(private message: NotificationService) {

  }

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

  changePlayerInventory(data: any) {
    this.playerInventory.next(data);
  }

  addItem(dataObj: any) {
    const currentValue = this.playerInventory.value;
    const updatedValue = [...currentValue, dataObj];
    this.playerInventory.next(updatedValue);
  }

  inventoryUsing(itemName: string) {
    this.itemName = itemName;
    switch (itemName) {
      case "Gyógyszer":
        if (this.playerHealth.value >= 80) {
          this.message.showInfo('Cantus kirobbanó formában van, nincs szüksége gyógyszerre.', 'Miserere Mei v.1.0.0');
          break;
        } else {
          this.consumeItem(itemName);
          this.changePlayerHealth(this.playerHealth.value + 20);
        }
        break;
      case "Lőszer":
        if (this.playerBulletsNumber.value >= 15) {
          this.message.showInfo('Cantus fegyvere tele van töltve. Nem lehet újratölteni.', 'Miserere Mei v.1.0.0');
          break;
        } else {
          this.consumeItem(itemName);
          this.changePlayerBulletsNumber(this.playerBulletsNumber.value + 10);
          break;
        }

      default:
        this.message.showError('Ezt a tárgyat nem így kell használni!', 'Miserere Mei v.1.0.0');
    }
  }

  consumeItem(itemName: any) {
    let item = this.playerInventory.value.find(item => item.name === itemName)
    if (item == null) {
      this.message.showError('Nincs ilyen tárgy!', 'Miserere Mei v.1.0.0')
    }
    if (item.numberOfItems <= 1) {
      const index = this.playerInventory.value.indexOf(item);
      if (index > -1) {
        this.message.showWarning(item.name + ' elfogyott.', 'Miserere Mei v.1.0.0')
        this.playerInventory.value.splice(index, 1);
      }
    }
    item.numberOfItems -= 1;
    this.message.showInfo(item.name + ' felhasználva.', 'Miserere Mei v.1.0.0')
  }
}
