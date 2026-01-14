import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Paiement1TmsComponent } from "./paiement1-tms/paiement1-tms.component";
import { Paiement2TmsComponent } from "./paiement2-tms/paiement2-tms.component";
import { Paiement3TmsComponent } from "./paiement3-tms/paiement3-tms.component";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "../../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../../@fuse/components/widget/widget.module";
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
import { RouterModule, Routes } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { PaiementArseModule } from "../../suiviacticitearse/paiement-arse/paiement-arse.module";

const routes: Routes = [
    {
        path: "suivi-activite/tms/etat-paiement/premier-paiement",
        component: Paiement1TmsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/tms/etat-paiement/deuxieme-paiement",
        component: Paiement2TmsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/tms/etat-paiement/troisieme-paiement",
        component: Paiement3TmsComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        Paiement1TmsComponent,
        Paiement2TmsComponent,
        Paiement3TmsComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FuseSharedModule,
        FuseWidgetModule,
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
        RouterModule.forChild(routes),
        MatProgressBarModule,
        PaiementArseModule
    ],
})
export class PaiementTmsModule {}
