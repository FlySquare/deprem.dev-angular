import {Component, OnInit} from '@angular/core';
import {Link} from "../../models/Link";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit{
  links: Link[] = [];
  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
    this.globalService.getLinks().subscribe((links)=>{
      this.links = links;
    });
  }
}
