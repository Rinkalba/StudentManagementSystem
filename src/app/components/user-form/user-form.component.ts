import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

function contactLengthValidator(control: FormControl) {
  const contact = control.value;
  if (contact && contact.length !== 10) {
    return { invalidLength: true };
  }
  return null;
}
function pincodeLengthValidator(control: FormControl) {
  const pincode = control.value;
  if (pincode && pincode.length !== 6) {
    return { invalidLength: true };
  }
  return null;
}
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  loginForm!:FormGroup;
  city!: string;
  apiUrl="https://api.postalpincode.in/pincode/";

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private http:HttpClient,private authService:AuthService,private userService:UserService) {
    this.loginForm = this.fb.group({
      id: [],
      username: [localStorage.getItem('username')],
      gender:['',[ Validators.required]],
      dob: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$'),contactLengthValidator]],
      address: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]*$'),pincodeLengthValidator]],
      city:['',]

    });

    this.authService.getId(this.loginForm.get('username')?.value).subscribe({
      next: (data) => {
        this.loginForm.get('id')?.setValue(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }
  fonts:any={
    fontFamily: 'Montserrat,Helvetica, sans-serif',
    textTransform: 'uppercase',
    backgroundColor:'#f8f8fc',
    fontWeight: 'bold',
    color:"#3f51b5"
  }
  btn:any = {
    padding:'1rem',
    backgroundColor:'#f8f8fc'
  }

  onPincodeInput() {
    const pincode = this.loginForm.get('pinCode')?.value;
    if (pincode.length === 6) {
      this.getCityFromPincode();
    } else {
     
      this.loginForm.get('city')?.setValue('');
    }
  }
  getCityFromPincode() {
    const pincode = this.loginForm.get('pinCode')?.value;
    console.log("pincode: " + pincode);
    if (pincode) {
      this.http.get<any>(this.apiUrl + pincode).subscribe(
        (response: any[]) => {
          
          if (response && response.length > 0 && response[0].PostOffice && response[0].PostOffice.length > 0) {
            this.city = response[0].PostOffice[0].District;
          } else {
            this.city = 'City not found';
          }
          this.loginForm.get('city')?.setValue(this.city);
          console.log("city: " + this.city);
        },
        error => {
          console.error('Error fetching city:', error);
          this.city = 'Error fetching city';
        }
      );
    }
  }

  onsubmit(){
    this.userService.registerUser(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
