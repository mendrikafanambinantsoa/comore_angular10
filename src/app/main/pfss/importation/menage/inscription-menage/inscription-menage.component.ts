import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IndexApiService } from "../../../../../_services/index-api.service";
import { ConstantService } from "../../../../../_services/constant.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-inscription-menage",
    templateUrl: "./inscription-menage.component.html",
    styleUrls: ["./inscription-menage.component.scss"],
})
export class InscriptionMenageComponent implements OnInit {
    //importation menage
    form_import_inscription_menage: FormGroup;
    search_menage = "";
    all_menage = [];
    selected_item_menage: any = {};

    //membre menage
    all_membre_menage = [];
    search_membre_menage = "";
    selected_item_membre_menage: any = {};
    activer_onglet_membre = true;

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        //importation menage
        this.form_import_inscription_menage = this.form_builder.group({
            file: [null],
        });
        this.index_api.getAll("menage").subscribe((res: any) => {
            this.all_menage = res.response;
        });
        //membre menage
    }

    //importation menage
    on_select_menage(event: any) {
        this.selected_item_menage = event.selected[0];
        this.getMembreByMenage(this.selected_item_menage.id);
        this.activer_onglet_membre = false;
    }

    //membre menage
    getMembreByMenage(menage_id: any) {
        this.index_api
            .getAPIgeneraliserREST("individu", "cle_etrangere", menage_id)
            .subscribe((res: any) => {
               this.all_membre_menage = res.response;
            });
    }
    on_select_membre_menage(event: any) {
      this.selected_item_membre_menage = event.selected[0];
    }
}
