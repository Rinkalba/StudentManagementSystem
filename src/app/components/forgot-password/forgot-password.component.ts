import { Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordServiceService } from 'src/app/services/forgot-password-service.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  otpForm!: FormGroup;
  showOTP: boolean = false;
  emailOtp:any;
  dobOtp:any;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,public toastr: ToastrService,private forgotPasswordService: ForgotPasswordServiceService){}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      dob: ['', [Validators.required]],
    });
    this.otpForm = this.fb.group({
      email:[this.emailOtp],
      dob:[this.dobOtp],
      otp:['',Validators.pattern('^[0-9]*$')]
    });
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
  showSuccess(){
    this.toastr.success('OTP Sent Successfully!', 'Check your mail id', {
   timeOut: 3000,
 });
}
showError(msg:any,body:any){
  this.toastr.error(msg, body, {
 timeOut: 3000,
});
 }
  onsubmit(){
    // const email = this.forgotForm.get('email')?.value;
    // const dob = this.forgotForm.get('dob')?.value;
    if (!this.showOTP) {
      this.authService.getOtp(this.forgotForm.value).subscribe({
        next:(resp)=>{
          if(resp){
            this.showSuccess();
            this.otpForm.patchValue({
              email: this.forgotForm.get('email')?.value,
              dob: this.forgotForm.get('dob')?.value
            });
            this.showOTP=true;
           
          }
        },
        error: (err) => {
          this.showError('Email or DOB Invalid','Try Again!');
          console.log(err);
        }
      });
    } 
  }

  onsubmitOtp(){
    this.authService.verifyOtp(
      this.otpForm.get('otp')?.value,
      this.otpForm.get('email')?.value
    ).subscribe({
      next: (resp: any) => {
        if (resp==='OTP Expired') {
          this.toastr.error('Welcome Back!', 'OTP EXPIRED TRY AGAIN', {
            timeOut: 6000,
          });
         
          this.router.navigate(['/login']);
        } else{
          this.toastr.success('Welcome Back!', 'Your Password is '+resp, {
            timeOut: 6000,
          });
          this.router.navigate(['/login']);
        }
        
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Invalid OTP!', 'Please try again.', {
          timeOut: 3000,
        });
      }
    });
  }

  
  

}
