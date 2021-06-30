import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Place } from '../entities/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http:HttpClient) { }

  getPlace(locationName: String): Observable<Place> {
    return this.http.get<Place>('/api/misere/place/'+locationName)
      .pipe(map(response => new Place(response)));
  }
}
