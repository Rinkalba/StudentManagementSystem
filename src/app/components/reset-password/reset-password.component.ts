import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  hideRpwd=true;
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

  resetForm!:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private route:ActivatedRoute,public toastr: ToastrService) {
    this.resetForm = this.fb.group({
    
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      repwd: ['', [Validators.required, Validators.minLength(8),this.passwordMatchValidator]],
     
      
    } );
    
  }


passwordMatchValidator(control: FormControl) {
  
  const newPassword = control.root.get('pwd');
  const confirmPassword=control.value;

 
  if (
    newPassword &&
    confirmPassword &&
    newPassword.value !== confirmPassword
  ) {
    return { passwordMismatch: true };
  }

  return null;
}





  token!:string;
  email!:string;
  dob!:any;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.token = params['token'];
      this.email = params['email'];
      this.dob=params['dob'];
      console.log(this.token);
      
    })
  }

  onsubmit(){
    this.authService.verifyLink(this.token,this.email,this.dob,this.resetForm.get('repwd')?.value).subscribe({
      next:(resp)=>{
        if(resp){

          this.toastr.success('Welcome Back!', 'Password Updated Successfully!', {
            timeOut: 3000,
          });
          this.router.navigate(['/login']);
        }
      },
      error:(err)=>{
        this.toastr.error('URL Expired!', 'Try agian!', {
          timeOut: 3000,
        });
        this.router.navigate(['/login']);
      }
    })
  }
}
