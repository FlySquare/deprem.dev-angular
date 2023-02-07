import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable, map} from "rxjs";
import {Location} from "../models/Location";
import {Response} from "../models/Response";
import {Link} from "../models/Link";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  cities$ =new BehaviorSubject([
    {name:'Adana'},
    {name:'Adıyaman'},
    {name:'Diyarbakır'},
    {name:'Gaziantep'},
    {name:'Hatay'},
    {name:'Kahramanmaraş'},
    {name:'Kilis'},
    {name:'Malatya'},
    {name:'Osmaniye'},
    {name:'Şanlıurfa'},
  ]);
  triggerLocation$ = new BehaviorSubject(null);
  constructor(
    private apiService: ApiService,
  ) { }

  updateTrigger(){
    this.triggerLocation$.next(new Date());
  }

  getLocations(data?:any): Observable<Location[]> {
    return this.apiService.get('/locations',data)
      .pipe(
        map((response: Response) => response.data.map((location: any) => new Location().prepare(location)))
      );
  }

  getLinks(): Observable<Link[]> {
    return this.apiService.get('/links')
      .pipe(
        map((response: Response) => response.data.map((link: any) => new Link().prepare(link)))
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
