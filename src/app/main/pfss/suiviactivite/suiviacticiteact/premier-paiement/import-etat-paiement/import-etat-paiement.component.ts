import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantService } from "../../../../../../_services/constant.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { filter } from "rxjs/operators";

@Component({
    selector: "app-import-etat-paiement",
    templateUrl: "./import-etat-paiement.component.html",
    styleUrls: ["./import-etat-paiement.component.scss"],
})
export class ImportEtatPaiementComponent implements OnInit {
    //export
    form_export_etat_paiement: FormGroup;
    etat_paiement: any = {};
    all_etat_paiement: any = [];
    search_etat_paiement = "";
    loading_export_etat_paiement: boolean = false;
    all_ile: any = [];
    all_region: any = [];
    all_commune: any = [];
    all_village: any = [];
    all_etat_presence: any = [];
    all_agep: any = [];
    actualiser: boolean = false;
    loading_presence = false;
    id_sous_projet = 1;
    @ViewChild("aucun_etat_presence", { static: true })
    aucun_etat_presence: TemplateRef<any>;
    @ViewChild("aucun_detail_etat_presence", { static: true })
    aucun_detail_etat_presence: TemplateRef<any>;

    //liste
    form_liste_presence: FormGroup;
    liste_presence: any = {};
    all_liste_presence: any = [];
    search_liste_presence = "";
    all_region_liste: any = [];
    all_commune_liste: any = [];
    all_village_liste: any = [];
    loading_liste_presence: boolean = false;
    @ViewChild("aucun_liste_etat_presence", { static: true })
    aucun_liste_etat_presence: TemplateRef<any>;
    selected_item_liste_paiement: any;
    show_btn_delete_liste_presence: boolean = false;
    @ViewChild("supprimer_presence", { static: true })
    supprimer_presence: TemplateRef<any>;
    @ViewChild("information", { static: true })
    information: TemplateRef<any>;
    @ViewChild("erreur_suppression", { static: true })
    erreur_suppression: TemplateRef<any>;
    all_annee: any = [];
    all_etape: any = [];

    //autres
    titre: any;
    etape_id: any;

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private activated_route: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                let route =
                    this.activated_route.firstChild || this.activated_route;
                // console.log(`route`, activated_route.url["value"][2].path);
                while (route && route.firstChild) {
                    route = route.firstChild;
                }
                this.titre = route?.snapshot?.data["titre"] || "";
                this.etape_id = route?.snapshot?.data["etape_id"] || "";
            });
    }

    ngOnInit(): void {
        //export
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.index_api.getAll("agence_p").subscribe((res) => {
            this.all_agep = res.response;
        });
        this.form_export_etat_paiement = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
            zip: [""],
            id_fichepresence: ["", Validators.required],
            agep_id: [""],
            indemnite: [""],
            observation: [""],
        });

        //liste
        this.index_api.getAll("annee").subscribe((res) => {
            this.all_annee = res.response;
        });
        this.index_api.getAll("agence_p").subscribe((res) => {
            this.all_agep = res.response;
        });
        this.index_api.getAPIgeneraliserREST("phaseexecution","cle_etrangere",this.id_sous_projet).subscribe((res) => {
            this.all_etape = res.response;
        });
        this.form_liste_presence = this.form_builder.group({
            id_ile: [""],
            id_region: [""],
            id_commune: [""],
            village_id: [""],
            agep_id: [""],
            id_annee: [""],
            etape_id: [""],
        });

        //autres
        this.index_api
            .getAPIgeneraliserREST("phaseexecution", "id", this.etape_id)
            .subscribe((res) => {
                // console.log(res);
                this.etat_paiement.indemnite = res.response[0].indemnite;
                this.etat_paiement.pourcentage = res.response[0].pourcentage;
                this.etat_paiement.tranche = res.response[0].Phase;
            });
    }

    //export
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.etat_paiement.id_ile
            )
            .subscribe((res) => {
                this.all_region = res.response;
                this.actualiser = false;
            });
    }
    filtre_commune() {
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                this.etat_paiement.id_region
            )
            .subscribe((res) => {
                this.all_commune = res.response;
                this.actualiser = false;
            });
    }
    filtre_village() {
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                this.etat_paiement.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
                this.actualiser = false;
            });
    }
    filtre_zip() {
        this.etat_paiement.zip = null;
        const zip = this.all_village.find(
            (vil) =>
                parseInt(vil.id) === parseInt(this.etat_paiement.village_id)
        );
        if (zip) {
            this.etat_paiement.zip = zip.id_zip;
        }
    }
    getEtatPresenceByVillage() {
        this.loading_presence = true;
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "fiche_paiement",
                1,
                "village_id",
                this.etat_paiement.village_id,
                "etape_id",
                this.etape_id
            )
            .subscribe((res) => {
                this.all_etat_presence = res.response;
                this.actualiser = true;
                this.loading_presence = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_etat_presence, {
                        disableClose: true,
                    });
                }
            });
    }
    get_detail_etat_presence() {
        this.loading_export_etat_paiement = true;
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "detail_etat_presence",
                1,
                "id_fichepresence",
                this.etat_paiement.id_fichepresence
            )
            .subscribe((res) => {
                this.all_etat_paiement = res.response;
                this.loading_export_etat_paiement = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_detail_etat_presence, {
                        disableClose: true,
                    });
                }
            });
    }

    //liste
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
    filtre_zip_liste() {
        this.liste_presence.zip = null;

        const zip = this.all_village.find(
            (vil) =>
                parseInt(vil.id) === parseInt(this.liste_presence.village_id)
        );

        if (zip) {
            // this.liste_presence.village = village.Village;
            this.liste_presence.zip = zip.id_zip;
            this.liste_presence.vague = zip.vague;
        }
    }
    filtrer_presence() {
        this.loading_liste_presence = true;
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "liste_etat_paiement",
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
                "agep_id",
                this.liste_presence.agep_id,
                "id_annee",
                this.liste_presence.id_annee,
                "etape_id",
                this.etape_id
            )
            .subscribe((res) => {
                this.all_liste_presence = res.response;
                this.loading_liste_presence = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_liste_etat_presence, {
                        disableClose: true,
                    });
                }
            });
    }

    onSelectListePaiement(event: any) {
        this.selected_item_liste_paiement = event.selected[0];
        this.show_btn_delete_liste_presence = true;
    }
    supprimerListePresence() {
        this.dialog.open(this.supprimer_presence, {
            disableClose: true,
        });
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
                fichepresence_id: this.selected_item_liste_paiement.fichepresence_id,
                id_sous_projet: this.id_sous_projet,
                village_id: this.liste_presence.village_id,
                agep_id: this.liste_presence.agep_id,
                id_annee: this.liste_presence.id_annee,
                etape_id: this.etape_id,
            };
            this.index_api
                .add("fiche_paiement", this.serializeData(datas), config)
                .subscribe((res) => {
                    this.all_liste_presence = this.all_liste_presence.filter(
                        (item) =>
                            item.id !== this.selected_item_liste_paiement.id
                    );
                    this.selected_item_liste_paiement = {};
                    this.show_btn_delete_liste_presence = false;
                });
            this.dialog.closeAll();
        } catch (error) {
            this.dialog.open(this.erreur_suppression, {
                disableClose: true,
            });
        }
    }

    //autres
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
