import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Player } from "../entities/player";

@Injectable({
    providedIn: 'root'
  })
  export class PlayerService {
  
    constructor(private http:HttpClient) { }
  
    getPlayer(): Observable<Player> {
      return this.http.get<Player>('/api/misere/player')
        .pipe(map(response => new Player(response)));
    }
  }