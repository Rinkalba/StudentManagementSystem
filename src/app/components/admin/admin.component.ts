import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username=localStorage.getItem("username");
  useDetailFlag: boolean=false;
  id:any;
  userDetails:any;


  tableData:any;
  dataSource:any;
  displayedData:string[]=["id", "username","branch","dob","gender","address","city","pinCode","action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fonts:any={
      fontFamily: 'Montserrat,Helvetica, sans-serif',
      textTransform: 'uppercase',
      backgroundColor:'#f8f8fc',
      fontWeight: 'bold',
      color:"#3f51b5"
    }
    fontsT:any={
      fontFamily: 'Montserrat,Helvetica, sans-serif',
      textTransform: 'uppercase',
      backgroundColor:'#f8f8fc',
      fontWeight: 'bold',
      color:"black"
    }
    icons:any={
      fontSize:'1.2rem',
      color:"#f9f9fc",
      borderRadius:"50%",
      backgroundColor:"#3f51b5"
    }
    font:any={
      fontFamily:'Montserrat,Helvetica,sans-serif'
    }
    detailCard:any={
      backgroundColor:'#f8f8fc'
    }

  constructor(private route:Router,private adminService:AdminService,private userService:UserService,private authService:AuthService,public dialog: MatDialog,private snackBar: MatSnackBar) {
   
   }

   
  ngOnInit(): void {
    this.authService.getId(this.username).subscribe({
      next: (resp)=>{
        this.id=resp;
       
        console.log("id from user"+this.id);
      
        this.getAdminDetails(); 
      },
      error: (err)=>{
        console.log(err);
      }
    });

    this.getAllUsers();
   

  }

  isRegistrationSuccessful = false;
durationInSeconds = 3; 

openSnackBar() {
  if(this.isRegistrationSuccessful){
    this.snackBar.open('Deleted Successfully!', 'Dismiss', {
      duration: this.durationInSeconds * 1000,
    });

  }else{
    this.snackBar.open('Failed to Delete!', 'Dismiss', {
      duration: this.durationInSeconds * 1000,
    });
  }
}

  getAllUsers(){
    this.adminService.getAllUsers().subscribe({
      next:(data)=>{
        this.tableData = data;
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  
  getAdminDetails(){
    this.adminService.getAdmin(this.id).subscribe({
      next: (resp)=>{
        this.userDetails=resp;
        this.useDetailFlag=true;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  editUser(userId: string) {
    const dialogRef=this.dialog.open(EditUserComponent, {
      width: '50%', // Adjust the width as per your requirement
      height: '80%', 
      data: {
        userId: userId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // If result is not undefined (i.e., if data was updated), update userData
      if (result !== undefined) {
       this.getAllUsers();
  }});
  }
 
  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe({
      next: (resp)=>{
        if(resp==true){
          this.isRegistrationSuccessful=true;
          this.openSnackBar();
          this.getAllUsers();
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


  filterChange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  
}
