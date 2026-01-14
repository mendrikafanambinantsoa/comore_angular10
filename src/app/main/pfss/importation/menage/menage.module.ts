import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InscriptionMenageComponent } from "./inscription-menage/inscription-menage.component";
import { InfoRecepteurComponent } from "./info-recepteur/info-recepteur.component";
import { MajBeneficiaireComponent } from "./maj-beneficiaire/maj-beneficiaire.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../@fuse/components/widget/widget.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";

const routes: Routes = [
    {
        path: "importation/menage/inscription-menage",
        component: InscriptionMenageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "importation/menage/info-recepteur",
        component: InfoRecepteurComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "importation/menage/maj-beneficiaire",
        component: MajBeneficiaireComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        InscriptionMenageComponent,
        InfoRecepteurComponent,
        MajBeneficiaireComponent,
    ],
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
        MatSelectModule
    ],
})
export class MenageModule {}
