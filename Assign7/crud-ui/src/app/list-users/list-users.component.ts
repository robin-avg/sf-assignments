import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private crud: CrudService) { }
  collection: any = [];
  ngOnInit(): void {
    this.crud.getList().subscribe((result) => {
      console.log(result);
      this.collection = result;
    })
  }
  deleteUser(id: any) {
    this.crud.deleteUser(id).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err)
    })
  }
}
