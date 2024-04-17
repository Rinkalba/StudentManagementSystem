import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordServiceService } from 'src/app/services/forgot-password-service.service';

function OtpLengthValidator(control: FormControl) {
  const otp = control.value;
  if (otp && otp.length !== 6) {
    return { invalidLength: true };
  }
  return null;
}
@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.css']
})
export class OtpFormComponent {
  forgotForm!: FormGroup;
  
  constructor(private fb:FormBuilder,private authService:AuthService,private router:ActivatedRoute,public toastr: ToastrService,private forgotPasswordService: ForgotPasswordServiceService){}

  ngOnInit(): void {
    const email = this.forgotPasswordService.getEmail();
    const dob = this.forgotPasswordService.getDob();
    this.forgotForm = this.fb.group({
      email: [email],
      dob: [dob],
      otp:['',Validators.pattern('^[0-9]*$'),OtpLengthValidator]

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
  onsubmit(){
    this.authService.verifyOtp(
      this.forgotForm.get('otp')?.value,
      this.forgotForm.get('email')?.value
    ).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: any) => {
        // Handle errors
        console.log(err)
      }
    });
  }
  
}
