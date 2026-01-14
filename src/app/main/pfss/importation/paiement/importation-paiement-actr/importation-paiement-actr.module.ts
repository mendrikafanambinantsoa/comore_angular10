import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Cycle1Module } from "./cycle1/cycle1.module";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseSharedModule } from "../../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../../@fuse/components/widget/widget.module";
import { BrowserModule } from "@angular/platform-browser";
import { Cycle2Module } from "./cycle2/cycle2.module";

@NgModule({
    declarations: [],
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
        Cycle1Module,
        Cycle2Module
    ],
})
export class ImportationPaiementActrModule {}
