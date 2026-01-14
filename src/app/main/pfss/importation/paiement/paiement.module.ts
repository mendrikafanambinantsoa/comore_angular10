import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
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
import { ImportationPaiementAriepModule } from './importation-paiement-ariep/importation-paiement-ariep.module';
import { ImportationPaiementTmsModule } from './importation-paiement-tms/importation-paiement-tms.module';
import { ImportationPaiementActrModule } from "./importation-paiement-actr/importation-paiement-actr.module";
import { FuseSharedModule } from "../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../@fuse/components/widget/widget.module";


@NgModule({
    // declarations: [Paiement1Component],
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

        ImportationPaiementAriepModule,
        ImportationPaiementTmsModule,
        ImportationPaiementActrModule
    ],
})
export class PaiementModule {}
