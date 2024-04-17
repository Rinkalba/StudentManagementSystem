import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit  {
  id: any;
  userListForm: FormGroup; // Declare userListForm of type FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private service: UserService,
    private fb: FormBuilder
  ) {
    this.id = data.userId;

  
    this.userListForm = this.fb.group({
      id: [{value: '', disabled: true}],
      username: [''],
      branch: [''],
      dob: [''],
      gender: [''],
      address: [''],
      city: [''],
      pinCode: ['']
    });

    this.service.getUserDetail(this.id).subscribe({
      next: (resp) => {
        // Set the form values
        this.userListForm.patchValue(resp);
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fonts: any = {
    fontFamily: 'Montserrat, Helvetica, sans-serif',
    textTransform: 'uppercase',
    backgroundColor: '#f8f8fc',
    fontWeight: 'bold',
    fontSize: '1rem'
  };

  btn: any = {
    padding: '1rem',
    backgroundColor: '#f8f8fc'
  };

  ngOnInit() {}

  onsubmit() {
    const updatedUserData = { ...this.userListForm.value }; // Get the updated form values
    console.log({...this.userListForm.value})
    this.service.updateUser(this.id, updatedUserData).subscribe({
      next: (resp) => {

        //console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
