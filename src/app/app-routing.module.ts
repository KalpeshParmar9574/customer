import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinsDataComponent } from './components/pins-data/pins-data.component';
import { AddCustomersComponent } from './components/add-customers/add-customers.component';
import { AddPinsComponent } from './components/add-pins/add-pins.component';

const routes: Routes = [

  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'home',
    component:PinsDataComponent
  },
  {
    path:'addCustomer',
    component:AddCustomersComponent,
  },
  {
    path:'addPins',
  component:AddPinsComponent
  },
  {
    path:'**',
    component:PinsDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
