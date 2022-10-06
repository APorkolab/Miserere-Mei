import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Place } from '../model/place';
import { Player } from '../model/player';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<
  T extends { _id: string | number; [key: string]: any }
> {
  apiUrl: string = environment.apiUrl;
  entity: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(private http: HttpClient, public config: ConfigService) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.entity}`);
  }

  // getOnePlace(locationName: String): Observable<Place> {
  //   return this.http
  //     .get<Place>('/places/' + locationName)
  //     .pipe(map((response) => new Place()));
  // }

  getPlayer(): Observable<Player> {
    return this.http
      .get<Player>('/player')
      .pipe(map((response) => new Player()));
  }

  getOne(_id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.entity}/${_id}`);
  }

  getOnePlace(location: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/place/${location}`);
  }

  create(entity: T): Observable<T> {
    const newEntity = { ...entity, _id: null };
    return this.http.post<T>(`${this.apiUrl}/${this.entity}`, newEntity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}/${this.entity}/${entity._id}`,
      entity
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.entity}/${entity._id}`);
  }
}
