import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss'],
})
export class EnemyComponent implements OnInit {
  public player$!: Observable<Player>;
  @Output()
  player: Player = new Player();

  @Input()
  monsterName!: string;
  @Output() monsterNameChange = new EventEmitter<string>();

  @Input()
  monsterhealth!: number;
  @Output() monsterhealthChange = new EventEmitter<number>();

  @Input()
  minDamage!: number;
  @Output() minDamageChange = new EventEmitter<number>();

  @Input()
  maxDamage!: number;
  @Output() maxDamageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  static readonly monsters = [
    {
      opponent: "Monster_FalsettosMinion",
      monsterName: "Falsetto egyik embere",
      monsterhealth: 20000,
      minDamage: 10,
      maxDamage: 30
    },
    {
      opponent: "Monster_Packofrat",
      monsterName: "csapat patkány",
      monsterhealth: 23,
      minDamage: 3,
      maxDamage: 8
    },
    {
      opponent: "Monster_Madman",
      monsterName: "Őrjöngő Mániákus",
      monsterhealth: 20,
      minDamage: 2,
      maxDamage: 6
    },
  ];


  searchMonster(monsterName: string): any {
    // console.log(index);
    return EnemyComponent.monsters.find(obj => obj.opponent === monsterName);
  }

}
