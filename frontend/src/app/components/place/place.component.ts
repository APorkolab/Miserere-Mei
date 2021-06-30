import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/entities/place';
import { Player } from 'src/app/entities/player';
import { FightService } from 'src/app/services/fight.service';
import { PlaceService } from 'src/app/services/place.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  place: Place;
  player: Player = new Player();
  harcUzenet: string[];

  constructor(private placeService: PlaceService, private playerService: PlayerService, private fightService: FightService) { }

  ngOnInit(): void {
    this.gotoPlace('GameBeginning');
    this.getPlayer();
  }

  clickLocation(event) {
    console.log(event);
    this.gotoPlace(event.target.id);
    this.getHarcuzenet(event.target.id);
  }

  gotoPlace(locationName: string) {
    this.placeService.getPlace(locationName).subscribe(value => this.place = value);

  }

  getPlayer(){
    this.playerService.getPlayer().subscribe(value => this.player = value);
  }

  getHarcuzenet(locationName: string){
    if (locationName == "protagonistStrike"){
      this.fightService.getHarcuzenet().subscribe(value => this.harcUzenet = value);
    }

  }

}
