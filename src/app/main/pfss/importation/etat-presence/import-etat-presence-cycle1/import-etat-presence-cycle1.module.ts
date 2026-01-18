import { Breadcrumb } from './../../../../../_services/breadcrumb.service';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportEtatPresenceCycle1Presence1Component } from "./import-etat-presence-cycle1-presence1/import-etat-presence-cycle1-presence1.component";
import { ImportEtatPresenceCycle1Presence2Component } from "./import-etat-presence-cycle1-presence2/import-etat-presence-cycle1-presence2.component";
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
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { FuseSharedModule } from "../../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../../@fuse/components/widget/widget.module";
const routes: Routes = [
    {
        path: "importation/etat-presence/cycle1/etat-presence1",
        component: ImportEtatPresenceCycle1Presence1Component,
        canActivate: [AuthGuard],
        data: { 
            breadcrumb: 'Importation / Etat de presence / Cycle1 / Etat de presence 1'
        }
    },
    {
        path: "importation/etat-presence/cycle1/etat-presence2",
        component: ImportEtatPresenceCycle1Presence2Component,
        canActivate: [AuthGuard],
        data: { 
            breadcrumb: 'Importation / Etat de presence / Cycle1 / Etat de presence 2'
        }
    }
];
@NgModule({
    declarations: [
        ImportEtatPresenceCycle1Presence1Component,
        ImportEtatPresenceCycle1Presence2Component,
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
    exports: [ImportEtatPresenceCycle1Presence1Component],
})
export class ImportEtatPresenceCycle1Module {}
