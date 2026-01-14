import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportTmsPaiement1Component } from "./import-tms-paiement1/import-tms-paiement1.component";
import { ImportTmsPaiement2Component } from "./import-tms-paiement2/import-tms-paiement2.component";
import { ImportTmsPaiement3Component } from "./import-tms-paiement3/import-tms-paiement3.component";
import { ImportationPaiementAriepModule } from "../importation-paiement-ariep/importation-paiement-ariep.module";
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from '../../../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../../../@fuse/components/widget/widget.module';
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
        path: "importation/paiement/tms/premier-paiement",
        component: ImportTmsPaiement1Component,
        canActivate: [AuthGuard],
    },
    {
        path: "importation/paiement/tms/deuxieme-paiement",
        component: ImportTmsPaiement2Component,
        canActivate: [AuthGuard],
    },
    {
        path: "importation/paiement/tms/troisieme-paiement",
        component: ImportTmsPaiement3Component,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        ImportTmsPaiement1Component,
        ImportTmsPaiement2Component,
        ImportTmsPaiement3Component,
    ],
    imports: [
        CommonModule,
        ImportationPaiementAriepModule,
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
    ],
})
export class ImportationPaiementTmsModule {}
