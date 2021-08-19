import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';

const routes: Routes = [
  {
    component: AddUserComponent,
    path: 'add'
  },
  {
    component: ListUsersComponent,
    path: 'list/:id'
  },
  {
    component: UpdateUserComponent,
    path: 'update/:id'
  },
  {
    component:AddCustomerComponent,
    path:'add-customer'
  },
  {
    component:ListCustomerComponent,
    path:'list-customer'
  },
  {
    component:UpdateCustomerComponent,
    path:'update-customer/:id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
