import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class FightService {
  
    constructor(private http:HttpClient) { }
  
    getHarcuzenet(): Observable<string[]> {
      return this.http.get<string[]>('/api/misere/fight')
        .pipe(map(response => response));
    }
  }