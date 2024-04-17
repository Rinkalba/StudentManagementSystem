import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  isforgotPasswordClicks:boolean = false;
  // formGroupControl = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),

  // });
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      id: ['',[ Validators.required]],
      username: ['',[ Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]],
     

    });
  }
  hide = true;
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

  isRegistrationSuccessful = false;
  durationInSeconds = 3; 

  openSnackBar() {
    if(this.isRegistrationSuccessful){
      this.snackBar.open('Error in inputs !', 'Dismiss', {
        duration: this.durationInSeconds * 1000,
      });
  
    }
  }
 

  onsubmit(){

   
    if (this.loginForm.valid) {
      this.authService.generateToken(this.loginForm.value).subscribe(
        {
          next: (data) => {
           
           const payload=this.authService.loginUser(data.token);
           if(payload.authorities=='ROLE_ADMIN'){
            this.router.navigate(['/admin'])  
           }else{
            this.router.navigate(['/user'])
           }
           
          
          },
          error: (error) => {
            console.log("Error occurred during login:", error);
            this.isRegistrationSuccessful=true;
            this.openSnackBar();
            
          }
        }
      )
    }

  }
  forgotClick(){
    this.isforgotPasswordClicks =!this.isforgotPasswordClicks;
   
  }
}
