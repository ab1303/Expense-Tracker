import { Component, OnInit } from '@angular/core';

import { UsersService } from "./users.service";
import { TrackByService } from "../../../core/trackby.service";
@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  rows = [];
	selected = [];
	temp = [];
	searchValue: string = null;
	isSearchActive: boolean = false;
	isToolbarActive: boolean = false;
	itemsSelected: string = "";
	itemCount: number = 0;
  constructor(
    private usersService: UsersService,
    public trackby: TrackByService) { }

    ngOnInit() {
      this.usersService.getUsers().subscribe(data => {
        // this.transactions = data.transactions;
        this.rows = data.userDetails;
      }); 
    }
  

}
