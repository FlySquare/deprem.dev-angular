import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable, map} from "rxjs";
import {Location} from "../models/Location";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(
    private apiService: ApiService,

  ) { }

  getLocations(): Observable<Location[]> {
    return this.apiService.get('/locations')
      .pipe(
        map((response: Response) => response.data.map((location: any) => new Location().prepare(location)))
      );
  }

  getLocationDetail(location: Location): Observable<Location> {
    return this.apiService.get('/locations/get/'+location.id)
      .pipe(
        map((response: Response) => new Location().prepare(response.data))
      );
  }

  addLocation(formParams: any): Observable<{status: string, message: string}> {
    return this.apiService.post('/locations/add', formParams)
      .pipe(
        map((response: Response) => response.data)
      );
  }

}
