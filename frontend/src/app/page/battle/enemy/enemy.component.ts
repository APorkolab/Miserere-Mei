import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  health!: number;
  @Output() healthChange = new EventEmitter<number>();

  @Input()
  weapon!: string;
  @Output() weaponChange = new EventEmitter<string>();

  @Input()
  minDamage!: number;
  @Output() minDamageChange = new EventEmitter<number>();

  @Input()
  maxDamage!: number;
  @Output() maxDamageChange = new EventEmitter<number>();

  @Input()
  bulletsNumber!: number;
  @Output() bulletsNumberChange = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
