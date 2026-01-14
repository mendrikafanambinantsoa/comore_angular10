import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { ActrServiceService } from "../act/actr-service.service";
import { formatDate } from "@angular/common";

@Component({
    selector: "app-plainte",
    templateUrl: "./plainte.component.html",
    styleUrls: ["./plainte.component.scss"],
})
export class PlainteComponent implements OnInit {
    config: any;

    all_ile: any;
    all_region: any;
    all_commune: any;
    all_village: any;
    all_plainte: any;
    all_phase: any;
    all_programme: any;
    all_sous_projet: any;
    all_activite: any;
    all_responsable_reg_plainte: any;
    all_menage: any;
    all_type_plainte: any;
    all_resultat_plainte: any;
    all_cellulederecours: any;

    form_filtre_par_village: FormGroup;
    form_plainte_preselectionne: FormGroup;
    form_information_plainte: FormGroup;
    plainte_preselectionne: any;
    menage_preselectionne: any;
    afficher_btn_actualiser: boolean;
    show_btn_ajout: boolean;
    search_plainte = "";
    selected: any = [];
    selectedItem: any;
    // rows_plainte: any;

    affichage_masque: boolean;

    desactiver_onglets = true;
    plainte_information: any;
    nouvelle_element: any;

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public dialog: MatDialog,
        public constant_service: ConstantService,
        private route: ActivatedRoute,
        private actr_service: ActrServiceService,
    ) {}

    //element child:DIALOG
    @ViewChild("aucun_plainte_preselectionne_par_village", { static: true })
    aucun_plainte_preselectionne_par_village: TemplateRef<any>;

    //element child:DIALOG
    @ViewChild("aucun_menage_preselectionne_par_village", { static: true })
    aucun_menage_preselectionne_par_village: TemplateRef<any>;

    //element child:DIALOG
    @ViewChild("suppression_plainte_preselectionne", { static: true })
    suppression_plainte_preselectionne: TemplateRef<any>;

    ngOnInit(): void {
        this.afficher_btn_actualiser = true;
        this.plainte_preselectionne = {};
        this.plainte_information = {};
        this.show_btn_ajout = false;
        this.affichage_masque = false;

        //All Iles
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
            // console.log("all_ile", this.all_ile);
        });
        //All sous_projet
        this.index_api.getAll("sous_projet").subscribe((res) => {
            this.all_sous_projet = [...res.response];
            // console.log("all_sous_projet", this.all_sous_projet);
        });
        // All type plainte
        this.index_api.getAll("type_plainte").subscribe((res) => {
            this.all_type_plainte = [...res.response];
        });
        //All tranche
        this.index_api.getAll("phaseexecution").subscribe((res) => {
            this.all_phase = [...res.response];
        });
        //All responsable
        this.index_api.getAll("responsable_enreg_plainte").subscribe((res) => {
            this.all_responsable_reg_plainte = [...res.response];
        });
        //All resultat plainte
        this.index_api.getAll("resultat_plainte").subscribe((res) => {
            this.all_resultat_plainte = [...res.response];
        });

        //form_filtre_par_village
        this.form_filtre_par_village = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
        });

        //form_plainte_preselectionne
        this.form_plainte_preselectionne = this.form_builder.group({
            id_sous_projet: ["", Validators.required],
            menage_id: ["", Validators.required],
            nomplaignant: ["", Validators.required],
            responsableenregistrement: ["", Validators.required],
            adresseplaignant: ["", Validators.required],
            telephone: ["", Validators.required],
            Objet: ["", Validators.required],
            typeplainte_id: ["", Validators.required],
            tranche_id: ["", Validators.required],
            datedepot: ["", Validators.required],
            id_responsable_enregistrement: ["", Validators.required],
            mesureprise: ["", Validators.required],
            statut: ["", Validators.required],
            dateresolution: ["", Validators.required],
        });
    }
    //filtre par région
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.plainte_preselectionne.id_ile,
                console.log("id_ile", this.plainte_preselectionne.id_ile),
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
                this.plainte_preselectionne.id_region,
                console.log("id_region", this.plainte_preselectionne.id_region),
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
                this.plainte_preselectionne.id_commune,
                console.log(
                    "id_commune",
                    this.plainte_preselectionne.id_commune,
                ),
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }

    filtrePlainteByVillage() {
        // this.nombre_envoi = 0;
        this.index_api
            .getAPIgeneraliserREST(
                "plainte/index",
                "filtrer",
                99,
                "ile_id",
                this.plainte_preselectionne.id_ile,
                "region_id",
                this.plainte_preselectionne.id_region,
                "commune_id",
                this.plainte_preselectionne.id_commune,
                "village_id",
                this.plainte_preselectionne.village_id,
                console.log(
                    "id_village",
                    this.plainte_preselectionne.village_id,
                ),
            )
            .subscribe((res) => {
                this.all_plainte = res.response;
                console.log("all plainte", this.all_plainte);

                if (res.response == 0) {
                    this.dialog.open(
                        this.aucun_plainte_preselectionne_par_village,
                        { disableClose: true },
                    );
                }
                // else {
                //     this.index_api
                //         .getAPIgeneraliserREST(
                //             "plainte/index",
                //             "nombre_envoi",
                //             99,
                //             "cle_etrangere",
                //             this.plainte_preselectionne.village_id,
                //         )
                //         .subscribe((res) => {
                //             // this.nombre_envoi = res.response;
                //         });
                // }
            });
    }
    getMenageByVillage(village_id: number): void {
        if (village_id > 0) {
            this.index_api
                .getAPIgeneraliserREST(
                    "menage/index",
                    "cle_etrangere",
                    this.plainte_preselectionne.village_id,
                )
                .subscribe((result) => {
                    this.all_menage = result.response;
                    console.log("all_menage", this.all_menage);
                });
        }
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    save_in_base(data: any) {
        this.affichage_masque = false;
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            console.log("plainte à enregistrer", data);

            this.index_api
                .add("plainte", this.serializeData(data), config)
                .subscribe((res) => {
                    console.log("enregistrement reussi", res);
                    this.selectedItem = {};
                    this.affichage_masque = false;
                    this.filtrePlainteByVillage();
                });
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    ajouter_plainte() {
        this.nouvelle_element = true;
        this.affichage_masque = true;
        this.plainte_preselectionne = {
            id_ile: this.plainte_preselectionne.id_ile,
            id_region: this.plainte_preselectionne.id_region,
            id_commune: this.plainte_preselectionne.id_commune,
            village_id: this.plainte_preselectionne.village_id,
            statut: this.plainte_preselectionne.statut,
            id_sous_projet: this.plainte_preselectionne.id_sous_projet,
            menage_id: this.plainte_preselectionne.menage_id,
            nomplaignant: this.plainte_preselectionne.nomplaignant,
            responsableenregistrement:
                this.plainte_preselectionne.responsableenregistrement,
            adresseplaignant: this.plainte_preselectionne.adresseplaignant,
            telephone: this.plainte_preselectionne.telephone,
            Objet: this.plainte_preselectionne.Objet,
            typeplainte_id: this.plainte_preselectionne.typeplainte_id,
            tranche_id: this.plainte_preselectionne.tranche_id,
            datedepot: this.plainte_preselectionne.datedepot,
            responsable: this.plainte_preselectionne.responsable,
            mesureprise: this.plainte_preselectionne.mesureprise,
            dateresolution: this.plainte_preselectionne.dateresolution,
            id_responsable_enregistrement:
                this.plainte_preselectionne.id_responsable_enregistrement,
        };
    }
    save_plainte_preselectionne(plainte: any, suppression: any) {
        let id = 0;
        let datas = {};
        if (!this.nouvelle_element) {
            id = this.selectedItem.id;
        }

        datas = {
            supprime: suppression,
            id: id,
            serveur_central: this.constant_service.serveur_central,
            id_ile: plainte.id_ile,
            id_region: plainte.id_region,
            id_commune: plainte.id_commune,
            village_id: plainte.village_id,
            menage_id: plainte.menage_id,
            activite_id: " ",
            cellulederecours_id: " ",
            solution_id: " ",
            programme_id: " ",
            datedepot: plainte.datedepot,
            reference: " ",
            Objet: plainte.Objet,
            nomplaignant: plainte.nomplaignant,
            adresseplaignant: plainte.adresseplaignant,
            responsableenregistrement: plainte.responsableenregistrement,
            id_responsable_enregistrement:
                plainte.id_responsable_enregistrement,
            id_sous_projet: plainte.id_sous_projet,
            mesureprise: plainte.mesureprise,
            dateresolution: plainte.dateresolution,
            statut: plainte.statut,
            telephone: plainte.telephone,
            a_ete_modifie: "0",
            userid: " ",
            datemodification: " ",
            tranche_id: plainte.tranche_id,
            typeplainte_id: plainte.typeplainte_id,
        };
        // console.log("Plainte a enregistrée", datas);
        this.save_in_base(datas);
    }
    hideAffichageMasque() {
        this.affichage_masque = false;
        this.plainte_preselectionne = {};
    }
    on_select_plainte_preselectionne(event: any) {
        this.show_btn_ajout = true;
        this.selectedItem = event.selected[0];
        this.desactiver_onglets = false;
        this.plainte_information = {
            serveur_central: this.constant_service.serveur_central,
            id_ile: this.selectedItem.id_ile,
            id_region: this.selectedItem.id_region,
            id_commune: this.selectedItem.id_commune,
            village_id: this.selectedItem.village_id,
            menage_id: this.selectedItem.menage_id,
            activite_id: " ",
            cellulederecours_id: " ",
            solution_id: " ",
            programme_id: " ",
            datedepot: this.selectedItem.datedepot,
            reference: " ",
            Objet: this.selectedItem.Objet,
            nomplaignant: this.selectedItem.nomplaignant,
            adresseplaignant: this.selectedItem.adresseplaignant,
            responsableenregistrement:
                this.selectedItem.responsableenregistrement,
            id_responsable_enregistrement:
                this.selectedItem.id_responsable_enregistrement,
            id_sous_projet: this.selectedItem.id_sous_projet,
            mesureprise: this.selectedItem.mesureprise,
            dateresolution: this.selectedItem.dateresolution,
            statut: this.selectedItem.statut,
            telephone: this.selectedItem.telephone,
            a_ete_modifie: " ",
            userid: " ",
            datemodification: " ",
            tranche_id: this.selectedItem.tranche_id,
            typeplainte_id: this.selectedItem.typeplainte_id,
        };
        console.log(
            "plainte information selectionnée",
            this.plainte_information,
        );
    }
    modifier_plainte() {
        this.nouvelle_element = false;
        this.affichage_masque = true;
        const date = new Date();
        const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        // console.log("Formated Date:", formatedDate);
        this.plainte_preselectionne = {
            id_ile: this.selectedItem.id_ile,
            id_region: this.selectedItem.id_region,
            id_commune: this.selectedItem.id_commune,
            village_id: this.selectedItem.village_id,
            serveur_central: this.constant_service.serveur_central,
            menage_id: this.selectedItem.menage_id,
            activite_id: " ",
            cellulederecours_id: " ",
            solution_id: " ",
            programme_id: " ",
            datedepot: this.selectedItem.datedepot,
            reference: " ",
            Objet: this.selectedItem.Objet,
            nomplaignant: this.selectedItem.nomplaignant,
            adresseplaignant: this.selectedItem.adresseplaignant,
            responsableenregistrement:
                this.selectedItem.responsableenregistrement,
            id_responsable_enregistrement:
                this.selectedItem.id_responsable_enregistrement,
            id_sous_projet: this.selectedItem.id_sous_projet,
            mesureprise: this.selectedItem.mesureprise,
            dateresolution: this.selectedItem.dateresolution,
            statut: this.selectedItem.statut,
            telephone: this.selectedItem.telephone,
            a_ete_modifie: formatedDate,
            userid: " ",
            datemodification: " ",
            tranche_id: this.selectedItem.tranche_id,
            typeplainte_id: this.selectedItem.typeplainte_id,
        };
        console.log(
            "plainte_preselectionne à modifier",
            this.plainte_preselectionne,
        );
    }
    supprimer() {
        this.dialog.open(this.suppression_plainte_preselectionne, {
            disableClose: true,
        });
    }
    confirm_supprimer_plainte_preselectionne() {
        const datas = {
            supprimer: 1,
            ...this.selectedItem,
        };
        this.save_in_base(datas);
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
                    encodeURIComponent(value == null ? "" : value),
            );
        }

        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
    affichage_resultat(code: any, libelle: any) {
        //All resultat
        this.index_api.getAll("resultat_plainte").subscribe((res) => {
            this.all_resultat_plainte = [...res.response];
        });
    }
}