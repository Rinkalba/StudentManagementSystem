import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl='http://localhost:8080/user';
  constructor(private http:HttpClient) { }

  registerUser(userData:any){
    return this.http.post<any>(`${this.baseUrl}/register`,userData,{responseType:'text' as 'json'});
  }

  getUserDetail(id:any){
    return this.http.get<any>(`${this.baseUrl}/getUser/${id}`,{responseType:'json'});
  }

  updateUser(id:any,userList:any){
    return this.http.post<any>(`${this.baseUrl}/updateUser/${id}`,userList,{responseType:'json'});
  }


}
