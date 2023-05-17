import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  countryData = environment.countryData
  userAPI= environment.user
  constructor(private http:HttpClient) { }

  _get_country_data(){
    try {
    return this.http.get(this.countryData)
    } catch (error) {
      return throwError((error:any)=>error)
    }
  }

  _addCustomer(data:any){
    try {
      return  this.http.post(this.userAPI,data)
    } catch (error) {
      return throwError((error:any)=>error)
    }
  }

  getCustomer(){
    try {
      return this.http.get(this.userAPI)

    } catch (error) {
      return throwError((error:any)=>error)
    }
  }

}
