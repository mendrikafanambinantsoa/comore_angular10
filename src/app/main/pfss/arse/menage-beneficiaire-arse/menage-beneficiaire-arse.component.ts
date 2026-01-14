import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IndexApiService } from "app/_services/index-api.service";
import { group } from "@angular/animations";
import { MatDialog } from "@angular/material/dialog";
import { ConstantService } from "app/_services/constant.service";

@Component({
    selector: "app-menage-beneficiaire-arse",
    templateUrl: "./menage-beneficiaire-arse.component.html",
    styleUrls: ["./menage-beneficiaire-arse.component.scss"],
})
export class MenageBeneficiaireArseComponent implements OnInit {
    menage_beneficiaire: any;
    filtre_menage_beneficiaire: FormGroup;
    all_ile: any;
    all_region: any;
    all_commune: any;
    all_village: any;
    all_menages: any;

    //carte beneficiaire
    nombre_envoi: any;
    liste_carte_beneficiaire: any;
    status: any;

    //export excel
    titre_etat = "LISTE MENAGE BENEFICIAIRE";
    etat = "liste_menage_beneficiaire";
    message_plus = "bénéficiaire";
    id_sous_projet = 1;
    titre = "ACTR";
    sous_projet = "ACTR";

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public dialog: MatDialog,
        public constant_service: ConstantService
    ) {}

    @ViewChild("aucun_menage_beneficiaire_par_village", { static: true })
    aucun_menage_beneficiaire_par_village: TemplateRef<any>;

    ngOnInit(): void {
        this.menage_beneficiaire = {};
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.filtre_menage_beneficiaire = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
        });
    }

    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.menage_beneficiaire.id_ile,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
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
                this.menage_beneficiaire.id_region,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
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
                this.menage_beneficiaire.id_commune,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtreMenageByVillage() {
        this.nombre_envoi = 0;
        this.index_api
            .getAPIgeneraliserREST(
                "menage",
                "cle_etrangere",
                this.menage_beneficiaire.village_id,
                "etat_statut",
                "beneficiaire",
                "id_sous_projet",
                this.id_sous_projet,
                "beneficiaire",
                1,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            )
            .subscribe((res) => {
                this.all_menages = res.response;
                console.log(this.all_menages);

                if (res.response == 0) {
                    this.dialog.open(
                        this.aucun_menage_beneficiaire_par_village,
                        { disableClose: true }
                    );
                } else {
                    this.index_api
                        .getAPIgeneraliserREST(
                            "menage",
                            "nombre_envoi",
                            99,
                            "cle_etrangere",
                            this.menage_beneficiaire.village_id,
                            "etat_statut",
                            "beneficiaire",
                            "id_sous_projet",
                            "this.id_sous_projet",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            ""
                        )
                        .subscribe((res) => {
                            this.nombre_envoi = res.response;
                        });
                }
            });
    }

    affichage_etat_statut(etat) {
        if (parseInt(etat) > 0) {
            return "Oui";
        } else {
            return "Non";
        }
    }
    affichage_etat_envoie(id_serveur_centrale) {
        if (id_serveur_centrale) {
            return "Envoyé";
        } else {
            return "Non envoyé";
        }
    }

    export_carte_beneficiaire(menage_beneficiaire) {
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "id_ile",
                menage_beneficiaire.id_ile,
                "id_region",
                menage_beneficiaire.id_region,
                "id_commune",
                menage_beneficiaire.id_commune,
                "village_id",
                menage_beneficiaire.village_id,
                "id_sous_projet",
                1,
                "apiUrlbase",
                this.constant_service.apiUrlbase,
                "carte_beneficiaire",
                1,
                "export",
                1,
                "tab_liste_menage",
                JSON.stringify(this.liste_carte_beneficiaire),
                "",
                "",
                "",
                ""
            )
            .subscribe((res) => {
                this.status = res.response;
                console.log(this.status);
            });
    }

    export_excel(menage_beneficiaire) {
        this.index_api
            .getAPIgeneraliserREST(
                "reporting",
                "id_ile",
                menage_beneficiaire.id_ile,
                "id_region",
                menage_beneficiaire.id_region,
                "id_commune",
                menage_beneficiaire.id_commune,
                "village_id",
                menage_beneficiaire.village_id,
                "id_sous_projet",
                this.id_sous_projet,
                "etat_export_excel",
                1,
                "titre_etat",
                this.titre_etat,
                "etat",
                this.etat,
                "",
                "",
                "",
                "",
                "",
                ""
            )
            .subscribe((res) => {
                this.status = res.response;
                console.log(this.status);
            });
    }

    closeDialog() {
        this.dialog.closeAll();
    }
}
