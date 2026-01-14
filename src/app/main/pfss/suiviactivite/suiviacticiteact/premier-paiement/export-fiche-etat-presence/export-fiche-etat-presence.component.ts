import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantService } from "../../../../../../_services/constant.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-export-fiche-etat-presence",
    templateUrl: "./export-fiche-etat-presence.component.html",
    styleUrls: ["./export-fiche-etat-presence.component.scss"],
})
export class ExportFicheEtatPresenceComponent implements OnInit {
    all_ile: any = [];
    all_region: any = [];
    all_commune: any = [];
    all_village: any = [];
    all_agex: any = [];
    form_export_etat_presence: FormGroup;
    export_etat_presence: any = {};
    all_etat_presence: any = [];
    search_etat_presence = "";
    loading: boolean = false;
    id_sous_projet = 1;
    params_to_url: any = {};
    @ViewChild("aucun_etat_presence", { static: true })
    aucun_etat_presence: TemplateRef<any>;
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private http: HttpClient,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.index_api.getAll("agent_ex").subscribe((res) => {
            this.all_agex = res.response;
        });
        this.form_export_etat_presence = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
            agex_id: ["", Validators.required],
        });
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || "");
        this.setParamsByUrl(currentPath);
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.export_etat_presence.id_ile
            )
            .subscribe((res) => {
                this.all_region = res.response;
            });
    }
    filtre_commune() {
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                this.export_etat_presence.id_region
            )
            .subscribe((res) => {
                this.all_commune = res.response;
            });
    }
    filtre_village() {
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                this.export_etat_presence.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtrerEtatPresence() {
        this.loading = true;
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "fiche_presence",
                1,
                "village_id",
                this.export_etat_presence.village_id,
                "id_sous_projet",
                this.id_sous_projet
            )
            .subscribe((res) => {
                this.all_etat_presence = res.response;
                this.loading = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_etat_presence, {
                        disableClose: true,
                    });
                }
            });
    }
    closeDialog() {
        this.dialog.closeAll();
    }

    setParamsByUrl(url: string): void {
        const urlMapping: { [key: string]: any } = {
            "/suivi-activite/actr/premier-paiement/export-fiche-de-presence": {
                titre: "Premier paiement",
                etape_id: 4,
            },
            "/suivi-activite/actr/deuxieme-paiement/export-fiche-de-presence": {
                titre: "Deuxième paiement",
                etape_id: 5,
            },
            "/suivi-activite/actr/troisieme-paiement/export-fiche-de-presence": {
                titre: "Troisième paiement",
                etape_id: 12,
            },
        };
        if (url in urlMapping) {
            Object.assign(this.params_to_url, urlMapping[url]);
        }
    }
}
