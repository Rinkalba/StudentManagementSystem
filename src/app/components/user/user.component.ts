import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   username=localStorage.getItem("username");
   id:any;
   mainId:any;
   userDetails:any;
   educationDetails:any;
   useDetailFlag: boolean=false;

   educationDetailFlag:boolean=false;


   fonts:any={
    fontFamily: 'Montserrat,Helvetica, sans-serif',
    textTransform: 'uppercase',
    backgroundColor:'#f8f8fc',
    fontWeight: 'bold',
    color:"#3f51b5"
  }
  font:any={
    fontFamily:'Montserrat,Helvetica,sans-serif'
  }
  detailCard:any={
    backgroundColor:'#f8f8fc'
  }
  borderStyle:any={
    borderBottom: '1px solid black',
    borderRadius: '5px',
    padding:'0.7rem'
  }

  constructor(private authService:AuthService,private userService:UserService,private adminService:AdminService) { 
   
  }

  ngOnInit(): void {
    this.authService.getId(this.username).subscribe({
      next: (resp)=>{
        this.id=resp;
        this.mainId=this.id;
        console.log("id from user"+this.id);
        console.log(this.mainId);
        this.getUserDetails(); 
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  getUserDetails(){
    this.userService.getUserDetail(this.mainId).subscribe({
      next: (resp)=>{
        this.userDetails=resp;
        this.useDetailFlag=true;
        console.log("user details: ", this.userDetails);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  getEducationDetails(){
    this.adminService.getEducationDetail(this.mainId).subscribe({
      next: (resp)=>{
        this.educationDetails=resp;
        this.educationDetailFlag=true;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  

  
   
}
