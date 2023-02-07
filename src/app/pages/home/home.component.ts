import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Location} from "../../models/Location";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];
  filterParams = {
    query: '',
    city: ''
  }
  cities: { name: string } [] = [];
  locationDetail: Location;

  constructor(
    private globalService: GlobalService,
    private modalService: NgbModal
  ) {
  }


  filter() {
   this.updateLocations(this.filterParams);
  }

  updateLocations(params?:any){
    this.globalService.getLocations(params).subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  ngOnInit() {
    this.globalService.cities$.subscribe((cities: any) => {
      this.cities = cities;
    });
    this.globalService.triggerLocation$.subscribe((response: any) => {
      this.updateLocations();
    });
  }

  getLocationDetail(content: any, location: Location) {
    this.globalService.getLocationDetail(location).subscribe((location: Location) => {
      this.locationDetail = location;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    });
  }

}
