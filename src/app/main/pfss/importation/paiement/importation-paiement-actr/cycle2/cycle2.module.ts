import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportationPaiementActrCycle2PremierPaiementComponent } from "./importation-paiement-actr-cycle2-premier-paiement/importation-paiement-actr-cycle2-premier-paiement.component";
import { ImportationPaiementActrCycle2DeuxiemePaiementComponent } from "./importation-paiement-actr-cycle2-deuxieme-paiement/importation-paiement-actr-cycle2-deuxieme-paiement.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../../../_helpers/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "../../../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../../../@fuse/components/widget/widget.module";
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
import { Cycle1Module } from "../cycle1/cycle1.module";

const routes: Routes = [
    {
        path: "importation/paiement/actr/cycle2/premier-paiement",
        component: ImportationPaiementActrCycle2PremierPaiementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Paiement / Actr / Cycle 2 / Premier paiement'
        }
    },
    {
        path: "importation/paiement/actr/cycle2/deuxieme-paiement",
        component: ImportationPaiementActrCycle2DeuxiemePaiementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Paiement / Actr / Cycle 2 / Deuxieme paiement'
        }
    },
];

@NgModule({
    declarations: [
        ImportationPaiementActrCycle2PremierPaiementComponent,
        ImportationPaiementActrCycle2DeuxiemePaiementComponent,
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
        MatSelectModule,
        Cycle1Module,
    ],
})
export class Cycle2Module {}
