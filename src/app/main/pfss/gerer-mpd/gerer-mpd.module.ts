import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GererMpdComponent } from "./gerer-mpd.component";
import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../@fuse/components/widget/widget.module';
import { RouterModule } from '@angular/router';
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

@NgModule({
    declarations: [GererMpdComponent],
    imports: [
        CommonModule,
        BrowserModule,
        FuseSharedModule,
        FuseWidgetModule,
        // RouterModule.forChild(routes),
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
      GererMpdComponent
  ]
})
export class GererMpdModule {}
