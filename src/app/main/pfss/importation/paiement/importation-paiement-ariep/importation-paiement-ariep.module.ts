import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
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
import { ImportAriepPaiement1Component } from './import-ariep-paiement1/import-ariep-paiement1.component';
import { ImportAriepPaiement2Component } from './import-ariep-paiement2/import-ariep-paiement2.component';
import { ImportAriepPaiement3Component } from './import-ariep-paiement3/import-ariep-paiement3.component';
import { ImportAriepPaiement4Component } from './import-ariep-paiement4/import-ariep-paiement4.component';
import { AuthGuard } from '../../../../../_helpers/auth.guard';
import { FuseSharedModule } from '../../../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../../../@fuse/components/widget/widget.module';

const routes: Routes = [
    {
        path: "importation/paiement/ariep/premier-paiement",
        component: ImportAriepPaiement1Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Paiement / Ariep / Premier paiement'
        }
    },
    {
        path: "importation/paiement/ariep/deuxieme-paiement",
        component: ImportAriepPaiement2Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Paiement / Ariep / Deuxieme paiement'
        }
    },
    {
        path: "importation/paiement/ariep/troisieme-paiement",
        component: ImportAriepPaiement3Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Paiement / Ariep / Troisieme paiement'
        }
    },
    {
        path: "importation/paiement/ariep/quatrieme-paiement",
        component: ImportAriepPaiement4Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Paiement / Ariep / Quatrieme paiement'
        }
    },
];

@NgModule({
    declarations: [ImportAriepPaiement1Component, ImportAriepPaiement2Component, ImportAriepPaiement3Component, ImportAriepPaiement4Component],
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
    ],
    exports: [
    ImportAriepPaiement1Component
    ]
})
export class ImportationPaiementAriepModule {}
