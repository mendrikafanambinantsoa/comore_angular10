import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Paiement1ArseComponent } from "./paiement1-arse/paiement1-arse.component";
import { Paiement2ArseComponent } from "./paiement2-arse/paiement2-arse.component";
import { Paiement3ArseComponent } from "./paiement3-arse/paiement3-arse.component";
import { Paiement4ArseComponent } from "./paiement4-arse/paiement4-arse.component";
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

const routes: Routes = [
    {
        path: "suivi-activite/ariep/etat-paiement/premier-paiement",
        component: Paiement1ArseComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/etat-paiement/deuxieme-paiement",
        component: Paiement2ArseComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/etat-paiement/troisieme-paiement",
        component: Paiement3ArseComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/etat-paiement/quatrieme-paiement",
        component: Paiement4ArseComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        Paiement1ArseComponent,
        Paiement2ArseComponent,
        Paiement3ArseComponent,
        Paiement4ArseComponent,
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
    ],
    exports: [Paiement1ArseComponent]
})
export class PaiementArseModule {}
