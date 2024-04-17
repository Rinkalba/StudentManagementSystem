import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // passwordControl = new FormControl('', [Validators.required]);
  // usernameControl = new FormControl('', [Validators.required]);

  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id:['', Validators.required],
      email: ['',[ Validators.required,Validators.email]],
      dob: ['',[ Validators.required]],
      username: ['', [Validators.required,Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      securityKey: ['', Validators.required],
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
    this.snackBar.open('Registerd Successfully!', 'Dismiss', {
      duration: this.durationInSeconds * 1000,
    });

  }else{
    this.snackBar.open('Registration Failed!', 'Dismiss', {
      duration: this.durationInSeconds * 1000,
    });
  }
}

  onsubmit() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value).subscribe({
        next: (data) => {
          if (data) {
            console.log(data)
            console.log("Registration successful");
            this.isRegistrationSuccessful = true; 
            this.openSnackBar();
            this.router.navigate(['/login']);
          } else {
            this.openSnackBar();
            console.log("Registration failed!Try Again!");
           
          }
        },
        error: (error) => {
          console.log("Error occurred during registration:", error);
          
        }
      });
    }
  }
  
  
  
}
