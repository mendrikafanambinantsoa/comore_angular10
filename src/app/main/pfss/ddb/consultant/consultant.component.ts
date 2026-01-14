import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IndexApiService } from "app/_services/index-api.service";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-consultant",
    templateUrl: "./consultant.component.html",
    styleUrls: ["./consultant.component.scss"],
})
export class ConsultantComponent implements OnInit {
    //éléments sur les îles
    all_ile: any;

    //Région
    all_region: any;

    //Commune
    all_commune: any;

    //Village
    all_village: any;

    //consultant
    all_consultant: any;
    rows_consultant: any;
    selected: any;
    consultant: any;
    selected_item_consultant: any;
    nouvel_item_consultant: boolean;

    //Bouton et formulaire
    afficher_btn_Modifier_consultant: boolean;
    afficher_btn_supprimer_consultant: boolean;
    afficher_btn_annuler_consultant: boolean;
    afficher_form_ajout_consultant: boolean;
    form_ajout_consultant: FormGroup;

    @ViewChild("supprimer_consultant", { static: true })
    supprimer_consultant: TemplateRef<any>;

    constructor(
        private index_api: IndexApiService,
        public dialog: MatDialog,
        private form_builder: FormBuilder,
    ) {}

    ngOnInit(): void {
        //get the api
        this.index_api.getAll("consultant_ong").subscribe((resp) => {
            this.all_consultant = [...resp.response];
            this.rows_consultant = resp.response;
            console.log("consultant", this.all_consultant);
        });
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });

        //set by default when the page is rendering
        this.afficher_btn_Modifier_consultant = false;
        this.afficher_btn_supprimer_consultant = false;
        this.afficher_form_ajout_consultant = false;
        this.afficher_btn_annuler_consultant = false;
        this.consultant = {};
        this.nouvel_item_consultant = false;
        this.form_ajout_consultant = this.form_builder.group({
            ile_id: ["", Validators.required],
            // ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            id_village: ["", Validators.required],
            code: ["", Validators.required],
            nom_consultant: ["", Validators.required],
            raison_social: ["", Validators.required],
            contact: ["", Validators.required],
            fonction_contact: ["", Validators.required],
            telephone_contact: ["", Validators.required],
            adresse: ["", Validators.required],
        });
    }
    onSelectConsultant(event) {
        this.afficher_btn_Modifier_consultant = true;
        this.afficher_btn_supprimer_consultant = true;
        this.afficher_btn_annuler_consultant = true;
        this.selected_item_consultant = event.selected[0];
        console.log("consultant selected", this.selected_item_consultant);
    }
    modifier() {
        this.afficher_form_ajout_consultant = true;
        this.nouvel_item_consultant = false;
        this.consultant = {
            // Assign the full "ile" object
            // ile: this.selected_item_consultant.ile, // Now consultant.ile will be available
            ile_id: this.selected_item_consultant.ile.id,
            // //code
            code: this.selected_item_consultant.code,
            //nom_consultant
            nom_consultant: this.selected_item_consultant.nom_consultant,
            //raison social
            raison_social: this.selected_item_consultant.raison_social,
            //contact
            contact: this.selected_item_consultant.contact,
            //Fonction contact
            fonction_contact: this.selected_item_consultant.fonction_contact,
            //telephone du contact
            telephone_contact: this.selected_item_consultant.telephone_contact,
            //addresse
            adresse: this.selected_item_consultant.adresse,
            //Préfécture
            id_region: this.selected_item_consultant.region.id,
            region: this.selected_item_consultant.region.Region,
            //Communne
            id_commune: this.selected_item_consultant.commune.id,
            commune: this.selected_item_consultant.commune.Commune,
            //Village
            id_village: this.selected_item_consultant.village.id,
            village: this.selected_item_consultant.village.Village,
        };
        console.log("consultant", this.consultant);
    }

    ajouter() {
        this.afficher_form_ajout_consultant = true;
        this.nouvel_item_consultant = true;
        this.selected_item_consultant = {};
    }

    // Getter to retrieve the viewValue of the selected "Ile"
    getIleName(id: number): string {
        const foundIle = this.all_ile.find((ile: any) => ile.id === id);
        return foundIle ? foundIle.Ile : "";
    }
    enregistrerConsultant(consultant: any) {
        console.log("enregistrerConsultant");
        let id = 0;
        if (!this.nouvel_item_consultant) {
            id = this.selected_item_consultant.id;
        }
        this.afficher_form_ajout_consultant = false;
        const data = {
            supprimer: 0,
            nouvel_item_consultant: true,
            id,
            ...consultant,
        };
        // console.log("data enregistré", data);
        this.save_in_base(data);
        this.closeDialog();
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    save_in_base(datas: any): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add("consultant_ong", this.serializeData(datas), config)
                .subscribe((resp) => {
                    this.getConsultant();
                });
        } catch (error) {
            console.log("erreur d'enregistrement");
        }
        console.log("donner enregistré", datas);
    }
    getConsultant() {
        this.index_api.getAll("consultant_ong").subscribe((resp) => {
            this.all_consultant = resp.response;
            console.log("all consultants", this.all_consultant);
        });
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

    supprimerConsultant() {
        this.dialog.open(this.supprimer_consultant, {
            disableClose: true,
        });
    }
    confirm_supprimer_consultant() {
        const data = {
            supprimer: 1,
            ...this.selected_item_consultant,
        };
        this.save_in_base(data);
        this.closeDialog();
    }

    annuler() {
        this.afficher_btn_Modifier_consultant = false;
        this.afficher_btn_supprimer_consultant = false;
        this.afficher_btn_annuler_consultant = false;
        this.selected_item_consultant = {};
    }
    fermerFormConsultant() {
        //disable the form from the screen
        this.afficher_form_ajout_consultant = false;
        //initialize the item
        this.selected_item_consultant = {};
        console.log("fermer");
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.consultant.ile_id,
                console.log("ile_id", this.consultant.ile_id),
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
                this.consultant.id_region,
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
                this.consultant.id_commune,
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
}