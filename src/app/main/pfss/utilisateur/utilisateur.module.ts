import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurComponent } from './utilisateur.component';
import { AuthGuard } from 'app/_helpers/auth.guard';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';


const routes = [
    {
        path: 'administration/utilisateur',
        component: UtilisateurComponent, canActivate:[AuthGuard]
    },
]
@NgModule({
  declarations: [UtilisateurComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FuseWidgetModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatIconModule,
    MatButtonModule,
    NgxDatatableModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class UtilisateurModule { }
