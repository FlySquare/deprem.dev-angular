import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Location} from "../../models/Location";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  locations: Location[] = [];
  locationDetail: Location;
  constructor(
    private globalService: GlobalService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.globalService.getLocations().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  getLocationDetail(content:any,location: Location){
    this.globalService.getLocationDetail(location).subscribe((location: Location) => {
      this.locationDetail = location;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    });
  }

}
