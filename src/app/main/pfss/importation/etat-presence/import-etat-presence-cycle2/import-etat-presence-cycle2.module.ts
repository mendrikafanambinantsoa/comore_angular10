import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportEtatPresenceCycle2Presence1Component } from "./import-etat-presence-cycle2-presence1/import-etat-presence-cycle2-presence1.component";
import { ImportEtatPresenceCycle2Presence2Component } from "./import-etat-presence-cycle2-presence2/import-etat-presence-cycle2-presence2.component";
import { RouterModule, Routes } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { ImportEtatPresenceCycle1Module } from "../import-etat-presence-cycle1/import-etat-presence-cycle1.module";
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { FuseSharedModule } from "../../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../../@fuse/components/widget/widget.module";

const routes: Routes = [
    {
        path: "importation/etat-presence/cycle2/etat-presence1",
        component: ImportEtatPresenceCycle2Presence1Component,
        canActivate: [AuthGuard],
    },
    {
        path: "importation/etat-presence/cycle2/etat-presence2",
        component: ImportEtatPresenceCycle2Presence2Component,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        ImportEtatPresenceCycle2Presence1Component,
        ImportEtatPresenceCycle2Presence2Component,
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
        ImportEtatPresenceCycle1Module
    ],
})
export class ImportEtatPresenceCycle2Module {}
