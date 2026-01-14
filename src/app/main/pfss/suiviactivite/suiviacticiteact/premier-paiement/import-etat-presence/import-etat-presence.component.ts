import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantService } from "../../../../../../_services/constant.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-import-etat-presence",
    templateUrl: "./import-etat-presence.component.html",
    styleUrls: ["./import-etat-presence.component.scss"],
})
export class ImportEtatPresenceComponent implements OnInit {
    //IMPORT ETAT PRESENCE
    form_import_etat_presence: FormGroup;
    import_etat_presence: any = {};
    all_etat_presence: any = [];
    search_etat_presence = "";
    all_ile: any = [];
    all_region: any = [];
    all_commune: any = [];
    all_village: any = [];
    loading_etat_presence: boolean = false;

    //liste presence
    form_liste_presence: FormGroup;
    liste_presence: any = {};
    all_liste_presence: any = [];
    search_liste_presence = "";
    all_region_liste: any = [];
    all_commune_liste: any = [];
    all_village_liste: any = [];
    all_agex: any = [];
    all_annee: any = [];
    loading_liste_presence: boolean = false;
    id_sous_projet = 1;
    @ViewChild("aucun_liste_presence", { static: true })
    aucun_liste_presence: TemplateRef<any>;
    selected_item_liste_paiement: any;
    show_btn_delete_liste_paiement: boolean = false;
    @ViewChild("supprimer_presence", { static: true })
    supprimer_presence: TemplateRef<any>;
    @ViewChild("information", { static: true })
    information: TemplateRef<any>;
    @ViewChild("erreur_suppression", { static: true })
    erreur_suppression: TemplateRef<any>;

    //autres
    params_to_url: any = {};
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private http: HttpClient,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        //IMPORT ETAT PRESENCE
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.form_import_etat_presence = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
            inapte: ["", Validators.required],
            zip: ["", Validators.required],
            observation: [""],
        });
        //liste presence
        this.index_api.getAll("agent_ex").subscribe((res) => {
            this.all_agex = res.response;
        });
        this.index_api.getAll("annee").subscribe((res) => {
            this.all_annee = res.response;
        });
        this.form_liste_presence = this.form_builder.group({
            id_ile: [""],
            id_region: [""],
            id_commune: [""],
            village_id: [""],
            agex_id: [""],
            id_annee: [""],
        });
        //autres
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || "");
        this.setParamsByUrl(currentPath);
    }
    //IMPORT ETAT PRESENCE
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.import_etat_presence.id_ile
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
                this.import_etat_presence.id_region
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
                this.import_etat_presence.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtre_zip() {
        this.import_etat_presence.zip = null;

        const zip = this.all_village.find(
            (vil) =>
                parseInt(vil.id) ===
                parseInt(this.import_etat_presence.village_id)
        );

        if (zip) {
            // this.import_etat_presence.village = village.Village;
            this.import_etat_presence.zip = zip.id_zip;
        }
    }

    //liste presence
    filtre_region_liste() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.liste_presence.id_ile
            )
            .subscribe((res) => {
                this.all_region = res.response;
            });
    }
    filtre_commune_liste() {
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                this.liste_presence.id_region
            )
            .subscribe((res) => {
                this.all_commune = res.response;
            });
    }
    filtre_village_liste() {
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                this.liste_presence.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtrerListePresence() {
        this.loading_liste_presence = true;
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "liste_etat_presence",
                1,
                "id_ile",
                this.liste_presence.id_ile,
                "id_region",
                this.liste_presence.id_region,
                "id_commune",
                this.liste_presence.id_commune,
                "village_id",
                this.liste_presence.village_id,
                "id_sous_projet",
                this.id_sous_projet,
                "agex_id",
                this.liste_presence.agex_id,
                "id_annee",
                this.liste_presence.id_annee,
                "etape_id",
                this.params_to_url.etape_id
            )
            .subscribe((res) => {
                this.all_liste_presence = res.response;
                this.loading_liste_presence = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_liste_presence, {
                        disableClose: true,
                    });
                }
            });
    }
    onSelectListePaiement(event: any) {
        this.selected_item_liste_paiement = event.selected[0];
        this.show_btn_delete_liste_paiement = true;
    }
    supprimerListePresence() {
        if (this.selected_item_liste_paiement.datepaiement == "") {
            this.dialog.open(this.supprimer_presence, {
                disableClose: true,
            });
        } else {
            this.dialog.open(this.information, {
                disableClose: true,
            });
        }
    }
    suppressionListePresence() {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            const datas = {
                supprimer: 1,
                id: this.selected_item_liste_paiement.id,
                id_sous_projet: this.id_sous_projet,
            };
            this.index_api
                .add("fiche_presence", this.serializeData(datas), config)
                .subscribe((res) => {
                    this.all_liste_presence = this.all_liste_presence.filter(
                        (item) =>
                            item.id !== this.selected_item_liste_paiement.id
                    );
                    this.selected_item_liste_paiement = {};
                    this.show_btn_delete_liste_paiement = false;
                });
            this.dialog.closeAll();
        } catch (error) {
            this.dialog.open(this.erreur_suppression, {
                disableClose: true,
            });
        }
    }

    //autres
    setParamsByUrl(url: string): void {
        const urlMapping: { [key: string]: any } = {
            "/suivi-activite/actr/premier-paiement/enregistrer-etat-de-presence":
                {
                    titre: "Premier paiement",
                    etape_id: 4,
                },
            "/suivi-activite/actr/deuxieme-paiement/enregistrer-etat-de-presence":
                {
                    titre: "Deuxième paiement",
                    etape_id: 5,
                },
            "/suivi-activite/actr/troisieme-paiement/enregistrer-etat-de-presence":
                {
                    titre: "Troisième paiement",
                    etape_id: 12,
                },
        };
        if (url in urlMapping) {
            Object.assign(this.params_to_url, urlMapping[url]);
        }
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    private serializeData(data: any) {
        var buffer = [];
        // Serialize each key in the object.
        for (var name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            }
            var value = data[name];
            buffer.push(
                encodeURIComponent(name) +
                    "=" +
                    encodeURIComponent(value == null ? "" : value)
            );
        }
        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
}
