import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-milieu-vague-zip",
    templateUrl: "./milieu-vague-zip.component.html",
    styleUrls: ["./milieu-vague-zip.component.scss"],
})
export class MilieuVagueZipComponent implements OnInit {

    //Milieu
    all_milieu: any;
    rows_milieu: any;
    selected: any;
    milieu: any;
    selected_item_milieu: any;
    nouvel_item_milieu: boolean;

    afficher_btn_modifier_milieu: boolean;
    afficher_btn_supprimer_milieu: boolean;
    afficher_btn_annuler_milieu: boolean;
    afficher_form_ajout_milieu: boolean;
    form_ajout_milieu: FormGroup;

    //Zone
    all_zone: any;
    rows_zone: any;
    selected_zone: any;
    zone: any;
    selected_item_zone: any;
    nouvel_item_zone: boolean;

    afficher_btn_modifier_zone: boolean;
    afficher_btn_supprimer_zone: boolean;
    afficher_form_ajout_zone: boolean;
    form_ajout_zone: FormGroup;

    @ViewChild("supprimer_milieu", { static: true })
    supprimer_milieu: TemplateRef<any>;

    //Dom element in milieu-vague-zip:#supprimer_zone
    @ViewChild("supprimer_zone", { static: true })
    supprimer_zone: TemplateRef<any>;

    constructor(
        private index_api: IndexApiService,
        public dialog: MatDialog,
        private form_builder: FormBuilder
    ) { }

    ngOnInit(): void {
        //Milieu
        this.index_api.getAll("milieu").subscribe((resp) => {
            this.all_milieu = resp.response;
            console.log("all milieu", this.all_milieu);
        });
        this.afficher_btn_modifier_milieu = false;
        this.afficher_btn_supprimer_milieu = false;
        this.afficher_btn_annuler_milieu = false;
        this.afficher_form_ajout_milieu = false;
        this.milieu = {};
        this.nouvel_item_milieu = false;
        this.form_ajout_milieu = this.form_builder.group({
            code: ["", Validators.required],
            description: ["", Validators.required],
        });

        //Zone
        this.index_api.getAll("zip/index").subscribe((resp) => {
            this.all_zone = resp.response;
            console.log("zip", this.all_zone);
        });
        this.afficher_btn_modifier_zone = false;
        this.afficher_btn_supprimer_zone = false;
        this.afficher_form_ajout_zone = false;
        this.nouvel_item_zone = false;
        this.zone = {};
        this.form_ajout_zone = this.form_builder.group({
            code: ["", Validators.required],
            description: ["", Validators.required],
        });
    }

    onSelectMilieu(event) {
        this.afficher_btn_modifier_milieu = true;
        this.afficher_btn_supprimer_milieu = true;
        this.afficher_btn_annuler_milieu = true;
        this.selected_item_milieu = event.selected[0];
        console.log("milieu selectioné", this.selected_item_milieu);
    }
    ajoutMilieu() {
        this.afficher_form_ajout_milieu = true;
        this.nouvel_item_milieu = true;
        this.selected_item_milieu = {};
    }
    fermerFormMilieu() {
        this.afficher_form_ajout_milieu = false;
        this.selected_item_milieu = {};
    }
    modifierMilieu() {
        this.afficher_form_ajout_milieu = true;
        this.nouvel_item_milieu = false;
        this.milieu = {
            code: this.selected_item_milieu.code,
            description: this.selected_item_milieu.description,
        };
    }
    supprimerMilieu() {
        this.dialog.open(this.supprimer_milieu, {
            disableClose: true,
        });
    }
    confirm_supprimer_milieu() {
        const data = {
            supprimer: 1,
            ...this.selected_item_milieu,
        };
        this.save_in_base(data);
        this.closeDialog();
    }
    enregistrerMilieu(milieu) {
        let id = 0;
        if (!this.nouvel_item_milieu) {
            id = this.selected_item_milieu.id;
        }
        this.afficher_form_ajout_milieu = false;
        const data = {
            supprimer: 0,
            id,
            ...milieu,
        };
        this.save_in_base(data);
        this.closeDialog();
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    annuler(event) {
        this.afficher_btn_modifier_milieu = false;
        this.afficher_btn_supprimer_milieu = false;
        this.afficher_btn_annuler_milieu = false;
        this.selected_item_milieu = {};
    }
    save_in_base(datas): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add("milieu", this.serializeData(datas), config)
                .subscribe((resp) => {
                    this.getMilieu();
                });
        } catch (error) {
            console.log("erreur d'enregistrement");
        }
        console.log("donner enregistré", datas);
    }
    getMilieu() {
        this.index_api.getAll("milieu").subscribe((resp) => {
            this.all_milieu = resp.response;
            console.log("all milieu", this.all_milieu);
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
                encodeURIComponent(value == null ? "" : value)
            );
        }

        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }

    // ZONE
    onSelectZone(event) {
        this.afficher_btn_modifier_zone = true;
        this.afficher_btn_supprimer_zone = true;
        this.selected_item_zone = event.selected[0];
        console.log("Zone selectionée", this.selected_item_zone);
    }
    ajoutZone() {
        this.afficher_form_ajout_zone = true;
        this.nouvel_item_zone = true;
        this.selected_item_zone = {};
    }
    modifierZone() {
        this.afficher_form_ajout_zone = true;
        this.nouvel_item_zone = false;
        //display the the data in the form
        this.zone = {
            //code
            code: this.selected_item_zone.code,
            //Libelle
            libelle: this.selected_item_zone.libelle,
        };
        console.log('modifierZone', this.zone);
    }
    closeModFormZone() {
        //disable the form from the screen
        this.afficher_form_ajout_zone = false;
        //initialize the item
        this.selected_item_zone = {};
        console.log('closeModificationFormZone')
    }
    enregistrerZone(zone) {
        let id = 0;
        if (!this.nouvel_item_zone) {
            id = this.selected_item_zone.id;
        }
        this.afficher_form_ajout_zone = false;
        const data = {
            supprimer: 0,
            id,
            ...zone,
        };
        this.save_in_base_zone(data);
        this.closeDialogZone();
    }
    supprimerZone() {
        this.dialog.open(this.supprimer_zone, {
            disableClose: true,
        });
    }
    confirm_supprimer_zone() {
        const data = {
            supprimer: 1,
            ...this.selected_item_zone,
        };
        this.save_in_base_zone(data);
        this.closeDialogZone();
    }
    closeDialogZone() {
        this.dialog.closeAll();
    }
    save_in_base_zone(datas): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add("zip/index", this.serializeDataZone(datas), config)
                .subscribe((resp) => {
                    this.getZone();
                });
        } catch (error) {
            //erreur d'API
            console.log("erreur d'enregistrement");
        }
        console.log("donnée enregistrée", datas);
    }
    getZone() {
        this.index_api.getAll("zip/index").subscribe((resp) => {
            this.all_zone = resp.response;
            console.log("all zip", this.all_zone);
        });
    }
    private serializeDataZone(data: any) {
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