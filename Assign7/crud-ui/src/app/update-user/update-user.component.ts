import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  // userData: any = {};

  editUser = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    cname: new FormControl(''),
    website: new FormControl(''),
    customer_address: new FormControl(''),
    role: new FormControl('')
  })
  constructor(private route: ActivatedRoute, private crud: CrudService) {

  }



  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.crud.getCurrentUser(this.route.snapshot.params.id).subscribe((result: any) => {
      console.log(result);
      // this.userData = result;
      this.editUser = new FormGroup({
        uid: new FormControl(result[0].uid),
        name: new FormControl(result[0].name),
        email: new FormControl(result[0].email),
        contact: new FormControl(result[0].contact),
        cname: new FormControl(result[0].cname),
        website: new FormControl(result[0].website),
        customer_address: new FormControl(result[0].customer_address),
        role: new FormControl(result[0].role)
      })
    }, (err: Error) => {
      console.log(err);
    })
  }

  collectUser() {
    this.crud.updateUser(this.route.snapshot.params.id, this.editUser.value).subscribe((result: any) => {
      console.log(result);
    }, (err: Error) => {
      console.log(err);
    })
  }

}
