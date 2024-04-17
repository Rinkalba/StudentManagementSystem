import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/admin';
 // private baseMsUrl = 'http://localhost:8080/admin';
  constructor(private http:HttpClient) { }

  registerAdmin(data:any){
    return this.http.post<any>(`${this.baseUrl}/register`,data,{responseType:'text' as 'json'});
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getAllUser`);  
  }

  getAdmin(id:any){
    return this.http.get<any>(`${this.baseUrl}/getAdmin/${id}`,{responseType:'json'});
  }
  getEducationDetail(id:any){
    return this.http.get<any>(`${this.baseUrl}/getEducationDetails/${id}`,{responseType:'json'});
  }

  deleteUser(id:any){
    return this.http.post<any>(`${this.baseUrl}/deleteUser/${id}`,{responseType:'bool'});
  }

}
