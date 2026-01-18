import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportFicheProfilageOrientationComponent } from "./import-fiche-profilage-orientation/import-fiche-profilage-orientation.component";
import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../../@fuse/components/widget/widget.module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from '../../../../_helpers/auth.guard';

const routes: Routes = [
    {
        path: "importation/fiche-profilage",
        component: ImportFicheProfilageOrientationComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Fiche profilage'
        }
    }
]
@NgModule({
    declarations: [ImportFicheProfilageOrientationComponent],
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
})
export class FicheProfilageOrientationModule {}
