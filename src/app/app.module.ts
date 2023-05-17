import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCustomersComponent } from './components/add-customers/add-customers.component';
import { AddPinsComponent } from './components/add-pins/add-pins.component';
import { PinsDataComponent } from './components/pins-data/pins-data.component';
import { LayoutsComponent } from './layouts/layouts.component';
import{HttpClientModule}from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
@NgModule({
  declarations: [
    AppComponent,
    AddCustomersComponent,
    AddPinsComponent,
    PinsDataComponent,
    LayoutsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
