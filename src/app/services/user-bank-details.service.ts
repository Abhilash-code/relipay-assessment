import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserBankDetailsService {

  constructor(private http: HttpClient) { }

  getAllUserDetails(){
    let authData = new FormData();
    authData.append("token", "e090c25187ee2b3f9f1f8a02747356641");
    authData.append("authToken", "e090c25187ee2j890890skjb3f9f1f8a027r7kjd99");

    return this.http.post<any>(environment.API_URL+'getDynamicform', authData);
  }

  updateUserDetails(userData: any){
    let bankDetailsData = new FormData();
    bankDetailsData.append("token", "e090c25187ee2b3f9f1f8a02747356641");
    bankDetailsData.append("authToken", "e090c25187ee2j890890skjb3f9f1f8a027r7kjd99");
    bankDetailsData.append("json", JSON.stringify(userData));

    return this.http.post<any>(environment.API_URL+'createDynamicform', bankDetailsData);
  }

}
