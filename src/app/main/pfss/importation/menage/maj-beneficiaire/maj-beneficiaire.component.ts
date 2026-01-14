import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IndexApiService } from "../../../../../_services/index-api.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-maj-beneficiaire",
    templateUrl: "./maj-beneficiaire.component.html",
    styleUrls: ["./maj-beneficiaire.component.scss"],
})
export class MajBeneficiaireComponent implements OnInit {
    form_import_inscription_menage: FormGroup;
    search_menage = "";
    all_menage = [];
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {}
}
