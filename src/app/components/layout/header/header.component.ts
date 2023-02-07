import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {GlobalService} from "../../../services/global.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cantAdd = true;
  cities:{name:string} [] = [];
  locationForm = {
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    google_maps_url: '',
  }

  reCAPTCHA = false;

  constructor(
    private modalService: NgbModal,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {
    this.globalService.cities$.subscribe((cities: any) => {
      this.cities = cities;
    });
  }

  addLocation() {
    this.globalService.addLocation(this.locationForm).subscribe({
      next: (result) => {
        if (result.message) {
          this.locationForm = {
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            google_maps_url: ''
          };
          alert(result.message);
          this.globalService.updateTrigger();
        }
      }, error: (e) => {
        if (e.message) {
          alert(e.message);
        }
      }
    });
  }

  canAddValidate() {
    this.cantAdd = (!this.locationForm.name || this.locationForm.name.length < 4) ||
      (!this.locationForm.city || this.locationForm.city.length < 4) ||
      (!this.locationForm.state || this.locationForm.state.length < 2) ||
      (!this.locationForm.address || this.locationForm.address.length < 6) ||
      !this.reCAPTCHA
  }

  resolved(captchaResponse: string) {
    this.reCAPTCHA = true;
    this.canAddValidate();
  }

  openAddLocationModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
