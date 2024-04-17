import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordServiceService {
  private email: string = '';
  private dob:string = '';
  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
  setDob(dob: string) {
    this.dob = dob;
  }
  getDob(): string {
    return this.dob;
  }
  constructor() { }
}
