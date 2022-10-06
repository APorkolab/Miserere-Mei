import { PlaceService } from './../../service/place.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { INgxTableColumn } from 'src/app/common/data-table/ngx-data-table/ngx-data-table.component';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  @Input() currentPlace: Place = {
    _id: '633e15dc54bf40eac48ee597',
    location: 'GameBeginning',
    narrationZoneText:
      'Cantus Planus idegesen szívta a fogát: túl hamar ért ide. A koszosbarna, valaha katonai köpeny és az   erősen javított katonai felszerelés Cantus részévé vált. A negyven év körüli harcos arcát mélyen barázdálták azok az események, melyeket a múltban meg kellett tennie. Piszkosszőke, őszülő haja, ovális arca és vékony testalkata a környéken szinte legendává tette a szótlan, látszólag érzelmek nélküli zsoldost. Az Öreggel csak napnyugtakor kell találkoznia. A zsoldos negyvenvalahány évével már idősnek számított egy olyan korban, ahol mindenki az ereje alapján ítéltetik meg. Azt mondják, hogy a világ régebben más volt, de arra nem emlékezhetett.',
    opponentName: '',
    decision1: 'Eltöltöd az időt valamivel',
    decision2: 'Elalszol',
    decision3: '',
    decision4: '',
    furtherLocation1: 'spendTime',
    furtherLocation2: 'takeANap',
    furtherLocation3: '',
    furtherLocation4: '',
  };

  @Input() columns: INgxTableColumn[] = [];
  @Input() entity: string = '';

  @Output() selectOne: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() deleteOne: EventEmitter<Place> = new EventEmitter<Place>();

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.getPlace(this.route.snapshot.params['location']);
  }

  getPlace(location: string): void {
    this.placeService.getOnePlace(location).subscribe({
      next: (data) => {
        this.currentPlace = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
