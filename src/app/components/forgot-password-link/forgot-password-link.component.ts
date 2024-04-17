import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password-link',
  templateUrl: './forgot-password-link.component.html',
  styleUrls: ['./forgot-password-link.component.css']
})
export class ForgotPasswordLinkComponent implements OnInit {
  forgotForm!: FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,public toastr: ToastrService){}
  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      dob: ['', [Validators.required]],
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
  
  onsubmitLink(){
    this.authService.getLink(this.forgotForm.value).subscribe({
      next: (resp: any) => {
        if (resp) {
          this.toastr.success('Link Sent Successfully!', 'Check your mail id', {
            timeOut: 3000,
          });
          this.router.navigate(['/login']);
          
        } 
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Email or DOB Invalid','Try Again!');
      }
    })
  }
}
