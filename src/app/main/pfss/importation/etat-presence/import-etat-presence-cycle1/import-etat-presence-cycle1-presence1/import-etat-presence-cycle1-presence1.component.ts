import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConstantService } from "../../../../../../_services/constant.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-import-etat-presence-cycle1-presence1",
    templateUrl: "./import-etat-presence-cycle1-presence1.component.html",
    styleUrls: ["./import-etat-presence-cycle1-presence1.component.scss"],
})
export class ImportEtatPresenceCycle1Presence1Component implements OnInit {
    //importation etat de presence actr
    import_paiement: any = {
        titre: "",
        affiche_titre: "",
        etape_id: 0,
        cycle: 0,
        numero_tranche: 0,
    };
    form_import_paiement: FormGroup;
    search_etat_paiement = "";
    all_beneficiaires: any = [];

    //liste etat de presence actr deja enregistre
    all_ile: any = [];
    all_region: any = [];
    all_sous_projet: any = [];
    all_agex: any = [];
    all_agep: any = [];
    all_etape: any = [];
    all_annee: any = [];
    all_commune: any = [];
    all_village: any = [];
    liste_etat_paiment_form: FormGroup;
    liste_etat_paiement: any = [];
    all_liste_etat_paiement: any = [];
    @ViewChild("aucun_etat_paiement", { static: true })
    aucun_etat_paiement_template: TemplateRef<any>;
    search_liste_paiement_importe = "";
    selected_item_paiement_importe: any = {};
    show_btn_supprimer_paiement_deja_importe = false;
    @ViewChild("supprimer_paiement", { static: true })
    supprimer_paiement: TemplateRef<any>;
    @ViewChild("suppression_reussie", { static: true })
    suppression_reussie: TemplateRef<any>;
    @ViewChild("suppression_echouee", { static: true })
    suppression_echouee: TemplateRef<any>;

    //autres
    id_sous_projet: number = 1;
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        //importation etat de presence actr
        this.form_import_paiement = this.form_builder.group({
            etat_paiement: [""],
        });

        //liste etat de presence actr deja enregistre
        this.index_api.getAll("ile").subscribe((res_ile) => {
            this.all_ile = res_ile.response;
        });
        this.index_api.getAll("region").subscribe((res_region) => {
            this.all_region = res_region.response;
        });
        this.index_api.getAll("sous_projet").subscribe((res_sp) => {
            this.all_sous_projet = res_sp.response;
        });
        this.index_api.getAll("annee").subscribe((res_annee) => {
            this.all_annee = res_annee.response;
        });
        this.index_api.getAll("agent_ex").subscribe((res_agex) => {
            this.all_agex = res_agex.response;
        });
        this.index_api.getAll("agence_p").subscribe((res_agep) => {
            this.all_agep = res_agep.response;
        });
        this.index_api
            .getAPIgeneraliserREST(
                "phaseexecution",
                "cle_etrangere",
                this.id_sous_projet
            )
            .subscribe((res_etape) => {
                this.all_etape = res_etape.response;
            });
        this.liste_etat_paiment_form = this.form_builder.group({
            id_ile: [""],
            id_region: [""],
            id_commune: [""],
            village_id: [""],
            agex_id: [""],
            agep_id: [""],
            id_annee: [""],
            etape_id: [""],
        });
        this.liste_etat_paiement = {};
        //autres
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || ""); // Récupérer le chemin actuel
        this.setFiltreValuesBasedOnUrl(currentPath);
    }

    //importation etat de presence actr

    //liste etat de presence actr deja enregistre
    filtrer_liste_etat_paiement(): void {
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "liste_etat_presence",
                1,
                "id_ile",
                this.liste_etat_paiement.id_ile,
                "id_region",
                this.liste_etat_paiement.id_region,
                "id_commune",
                this.liste_etat_paiement.id_commune,
                "village_id",
                this.liste_etat_paiement.village_id,
                "id_sous_projet",
                this.id_sous_projet,
                "agex_id",
                this.liste_etat_paiement.agex_id,
                "id_annee",
                this.liste_etat_paiement.id_annee,
                "etape_id",
                this.liste_etat_paiement.etape_id
            )
            .subscribe((res) => {
                this.all_liste_etat_paiement = res.response;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_etat_paiement_template, {
                        disableClose: true,
                    });
                }
            });
    }
    on_selection_liste_paiement_importe(event: any) {
        this.selected_item_paiement_importe = event.selected[0];
        this.show_btn_supprimer_paiement_deja_importe = true;
    }
    supprimerPaiement(): void {
        this.dialog.open(this.supprimer_paiement, {
            disableClose: true,
        });
    }
    deletePaiementImporteOnBase() {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            const datas = {
                supprimer: 1,
                id: this.selected_item_paiement_importe.id,
                id_sous_projet: this.id_sous_projet,
                fichepresence_id:
                    this.selected_item_paiement_importe.fichepresence_id,
                village_id: this.selected_item_paiement_importe.village_id,
                agep_id: this.selected_item_paiement_importe.agep_id,
                id_annee: this.selected_item_paiement_importe.id_annee,
                etape_id: this.selected_item_paiement_importe.etape_id,
            };
            this.index_api
                .add("Fiche_paiement", this.serializeData(datas), config)
                .subscribe(
                    (res: any) => {
                        if (res.success) {
                            this.dialog.open(this.suppression_reussie, {
                                disableClose: true,
                            });
                            this.liste_etat_paiement =
                                this.liste_etat_paiement.filter(
                                    (item) =>
                                        item.id !==
                                        this.selected_item_paiement_importe.id
                                );
                            this.selected_item_paiement_importe = {};
                            this.dialog.closeAll();
                        } else {
                            this.dialog.open(this.suppression_echouee, {
                                disableClose: true,
                            });
                        }
                    },
                    (error) => {
                        console.error("Erreur API :", error);
                        alert(
                            "Une erreur s'est produite lors de la suppression !"
                        );
                    }
                );
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.liste_etat_paiement.id_ile
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
                this.liste_etat_paiement.id_region
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
                this.liste_etat_paiement.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    //autres
    setFiltreValuesBasedOnUrl(url: string): void {
        const urlMapping: { [key: string]: any } = {
            "/importation/etat-presence/cycle1/etat-presence1": {
                titre: "Présence N° 1/Cycle 1",
                affiche_titre: " Présence N° 1/Cycle 1",
                etape_id: 4,
                cycle: 1,
                numero_tranche: 1,
            },
            "/importation/etat-presence/cycle1/etat-presence2": {
                titre: "Présence N° 2/Cycle 1",
                affiche_titre: " Présence N° 2/Cycle 1",
                etape_id: 5,
                cycle: 1,
                numero_tranche: 2,
            },
            "/importation/etat-presence/cycle2/etat-presence1": {
                titre: "Présence N° 1/Cycle 2",
                affiche_titre: " Présence N° 1/Cycle 2",
                etape_id: 4,
                cycle: 2,
                numero_tranche: 1,
            },
            "/importation/etat-presence/cycle2/etat-presence2": {
                titre: "Présence N° 2/Cycle 2",
                affiche_titre: " Présence N° 2/Cycle 2",
                etape_id: 5,
                cycle: 2,
                numero_tranche: 2,
            },
            "/importation/etat-presence/etat-présence-3": {
                titre: "Présence N° 3 : fond sortie",
                affiche_titre: " Présence N° 3 : fond sortie",
                etape_id: 12,
                numero_tranche: 3,
            },
        };
        if (url in urlMapping) {
            Object.assign(this.import_paiement, urlMapping[url]);
        }
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    serializeData(data: any): string {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            )
            .join("&");
    }
}
