import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PinsDataService {
  pinsApi = environment.pins
  baseURL = environment.baseURL
  constructor(
    private http: HttpClient
  ) { }
  _addPins(data: any) { // for addng pins in json-server 
    try {
      return this.http.post<any>(this.baseURL+this.pinsApi,data)
    } catch (error) {
      return throwError((err:any)=>{err})
    }
  }

  _getPinsData() { 
    try {
      return this.http.get<any>(this.baseURL+this.pinsApi)
    } catch (error) {
      return throwError((err:any)=>{err})
    }
  }
}
