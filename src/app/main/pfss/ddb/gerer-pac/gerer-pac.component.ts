import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-gerer-pac",
    templateUrl: "./gerer-pac.component.html",
    styleUrls: ["./gerer-pac.component.scss"],
})
export class GererPacComponent implements OnInit {
    allPac: any = [];
    allIle: any = [];
    allType_agr: any = [];
    pac: any;
    rows_pac: any = [];
    selected: any = [];
    selectedItemPac: any;
    NouvelItemPac: any;
    onglet_detail_pac = true;
    btn_modifier_pac = false;
    btn_supprimer_pac = false;
    afficher_formulaire_pac = false;
    formulaire_pac: FormGroup;

    allPac_detail: any = [];
    rows_pac_detail: any = [];
    btn_modifier_detail_pac = false;
    btn_supprimer_detail_pac = false;
    afficher_formulaire_detail_pac = false;
    formulaire_detail_pac: FormGroup;

    constructor(private index_api: IndexApiService, public dialog: MatDialog, private _formbuilder: FormBuilder) { }

    ngOnInit(): void {
        this.pac = {}
        this.index_api.getAll("pac_ariep").subscribe((res) => {
            this.allIle = res.response;
            console.log("all pac", this.allIle);

            this.index_api.getAll("type_agr").subscribe((res) => {
                this.allType_agr = res.response;
                console.log("all agr", this.allType_agr);

                this.index_api.getAll("pac").subscribe((res) => {
                    this.rows_pac = res.response;
                });
            });
        });
        this.formulaire_pac = this._formbuilder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village: ["", Validators.required],
            id_zip: ["", Validators.required],
            vague: [""],
            id_type_agr: ["", Validators.required],
            libelle: ["", Validators.required],
            milieu_physique: ["", Validators.required],
            condition_climatique: ["", Validators.required],
            diffi_socio_eco: [""],
            infra_pub_soc: [""],
            analyse_pro: [""],
            identi_prio_arse: ["", Validators.required],
            marche_loc_reg_arse: [""],
            description_activite: ["", Validators.required],
            estimation_besoin: ["", Validators.required],
            etude_eco: ["", Validators.required],
            structure_appui: ["", Validators.required],
            impact_env: [""],
            impact_sociau: ["", Validators.required]
        });
        this.formulaire_detail_pac = this._formbuilder.group({
            besoin: ["", Validators.required],
            duree: ["", Validators.required],
            cout: ["", Validators.required],
            calendrier_activite: ["", Validators.required]
        })
    }

    // debut pac
    click_pac(event) {
        this.selectedItemPac = event.selected[0];
        this.onglet_detail_pac = false;
        this.btn_modifier_pac = true;
        this.btn_supprimer_pac = true;
        this.index_api
            .getAPIgeneraliserREST(
                "pac_detail",
                "menu",
                "getpac_detailbypac",
                "id_pac",
                this.selectedItemPac.id,
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
            ).subscribe((res) => {
                this.rows_pac_detail = res.response;
                console.log("detail pac", this.rows_pac_detail);

            });
    }
    ajoutPac() {
        this.NouvelItemPac = true;
        this.afficher_formulaire_pac = true;
    }
    modifierPac() {
        this.NouvelItemPac = true;
        this.afficher_formulaire_pac = true;
        this.pac = {
            id: this.selectedItemPac.id,
            milieu_physique: this.selectedItemPac.milieu_physique,
            condition_climatique: this.selectedItemPac.condition_climatique,
            diffi_socio_eco: this.selectedItemPac.diffi_socio_eco,
            infra_pub_soc: this.selectedItemPac.infra_pub_soc,
            analyse_pro: this.selectedItemPac.analyse_pro,
            identi_prio_arse: this.selectedItemPac.identi_prio_arse,
            marche_loc_reg_arse: this.selectedItemPac.marche_loc_reg_arse,
            description_activite: this.selectedItemPac.description_activite,
            estimation_besoin: this.selectedItemPac.estimation_besoin,
            etude_eco: this.selectedItemPac.etude_eco,
            structure_appui: this.selectedItemPac.structure_appui,
            impact_env: this.selectedItemPac.impact_env,
            impact_sociau: this.selectedItemPac.impact_sociau,
            id_ile: this.selectedItemPac.id_ile,
            id_region: this.selectedItemPac.id_region,
            id_commune: this.selectedItemPac.id_commune,
            id_zip: this.selectedItemPac.id_zip,
            libelle: this.selectedItemPac.libelle,
        }
    }
    annulerPac() {
        this.afficher_formulaire_pac = false;
        this.pac = {};
    }
    // fin pac

    // debut detail pac
    click_detail_pac(event) {
        this.btn_modifier_detail_pac = true;
        this.btn_supprimer_detail_pac = true;
        const detail_pac = event.selected[0].id;
        console.log('deatil pac id====>', detail_pac);

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