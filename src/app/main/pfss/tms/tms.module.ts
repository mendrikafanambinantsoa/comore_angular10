import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenageBeneficiaireTmsComponent } from './menage-beneficiaire-tms/menage-beneficiaire-tms.component';
import { MenageInscritTmsComponent } from './menage-inscrit-tms/menage-inscrit-tms.component';
import { MenagePreselectionneTmsComponent } from './menage-preselectionne-tms/menage-preselectionne-tms.component';
import { CarteBeneficiaireTmsComponent } from './carte-beneficiaire-tms/carte-beneficiaire-tms.component';
import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ActModule } from '../act/act.module';
import { AuthGuard } from 'app/_helpers/auth.guard';
import { ContratAgepComponent } from './contrat-agep/contrat-agep.component';
import { GererAgepModule } from '../gerer-agep/gerer-agep.module';
const routes: Routes = [
  {
      path: "tms/menage-inscrit-tms",
      component: MenageInscritTmsComponent,
      canActivate: [AuthGuard],
  },
  {
      path: "tmnc/menage-preselectionne-tmnc",
      component: MenagePreselectionneTmsComponent,
      canActivate: [AuthGuard],
  },
  {
      path: "tmnc/menage-preselectionne-tmnc",
      component: MenageBeneficiaireTmsComponent,
      canActivate: [AuthGuard],
  },
  {
      path: "tmnc/carte-beneficiaire",
      component: CarteBeneficiaireTmsComponent,
      canActivate: [AuthGuard],
  },
  {
      path: "tms/contrat_agep",
      component: ContratAgepComponent,
      canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [MenageBeneficiaireTmsComponent, MenageInscritTmsComponent, MenagePreselectionneTmsComponent, CarteBeneficiaireTmsComponent, ContratAgepComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FuseSharedModule,
    FuseWidgetModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    NgxDatatableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    ActModule,
    GererAgepModule
  ]
})
export class TmsModule { }
