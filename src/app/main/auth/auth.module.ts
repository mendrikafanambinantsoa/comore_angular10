import { CommonModule } from '@angular/common';
import { LoginComponent, DialogContentExampleDialog, DialogContentEnabledDialog } from './login/login.component';   

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; 

import { FuseSharedModule } from '@fuse/shared.module';
import { RegisterComponent } from './register/register.component';

const routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent,
    DialogContentExampleDialog,   
    DialogContentEnabledDialog     
  ],
  imports: [
    CommonModule,                  
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,              

    FuseSharedModule
  ],
  entryComponents: [
    DialogContentExampleDialog,    
    DialogContentEnabledDialog    
  ]
})
export class AuthModule { }