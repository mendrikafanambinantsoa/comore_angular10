import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-type-activite-arse-act",
    templateUrl: "./type-activite-arse-act.component.html",
    styleUrls: ["./type-activite-arse-act.component.scss"],
})
export class TypeActiviteArseActComponent implements OnInit {
    //idb type activite
    all_type_activite: any[];
    rows_type_activite: any[];
    selected_type_activite: any;
    current_item_type_activite: any;
    new_item_type_activite: boolean;
    editing_type_activite = {};
    index_selected_type_activite: number;
    item_selected_type_activite = [];
    @ViewChild("suppression_dialog_type_activite", { static: true })
    suppression_dialog_type_activite: TemplateRef<any>;
    search_type_activite:string = "";

    //idb nature construction
    all_nature_construction: any[];
    rows_nature_construction: any[];
    selected_nature_construction: any;
    current_item_nature_construction: any;
    new_item_nature_construction: boolean;
    editing_nature_construction = {};
    index_selected_nature_construction: number;
    item_selected_nature_construction = [];
    @ViewChild("suppression_dialog_nature_construction", { static: true })
    suppression_dialog_nature_construction: TemplateRef<any>;
    search_nature_construction:string = "";

    //idb quantite construite
    all_quantite_construite: any[];
    rows_quantite_construite: any[];
    selected_quantite_construite: any;
    current_item_quantite_construite: any;
    new_item_quantite_construite: boolean;
    editing_quantite_construite = {};
    index_selected_quantite_construite: number;
    item_selected_quantite_construite = [];
    @ViewChild("suppression_dialog_quantite_construite", { static: true })
    suppression_dialog_quantite_construite: TemplateRef<any>;
    search_quantite_construite:string = "";

    //arse
    all_arse: any[];
    rows_arse: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    selected_item_arse: any;
    current_item_arse: any;
    new_item_arse: boolean;
    editing_arse = {};
    index_selected_arse: number;
    item_selected_arse = [];
    @ViewChild("suppression_dialog_arse", { static: true })
    suppression_dialog_arse: TemplateRef<any>;
    search_arse:string = "";

    //act
    all_act: any[];
    rows_act: any[];
    selected_item_act: any;
    current_item_act: any;
    new_item_act: boolean;
    editing_act = {};
    index_selected_act: number;
    item_selected_act = [];
    @ViewChild("suppression_dialog_act", { static: true })
    suppression_dialog_act: TemplateRef<any>;
    search_act:string = "";

     //tmnc-covid
     all_tmnc_covid: any[];
     rows_tmnc_covid: any[];
     selected_item_tmnc_covid: any;
     current_item_tmnc_covid: any;
     new_item_tmnc_covid: boolean;
     editing_tmnc_covid = {};
     index_selected_tmnc_covid: number;
     item_selected_tmnc_covid = [];
     @ViewChild("suppression_dialog_tmnc_covid", { static: true })
     suppression_dialog_tmnc_covid: TemplateRef<any>;
     search_tmnc_covid:string = "";
  
    constructor(private index_api: IndexApiService, public dialog: MatDialog) {
        //idb type activite
        this.rows_type_activite = [];
        this.new_item_type_activite = false;

        //idb nature construction
        this.rows_nature_construction = [];
        this.new_item_nature_construction = false;

        //idb quantite construite
        this.rows_quantite_construite = [];
        this.new_item_quantite_construite = false;

        //arse
        this.reorderable = true;
        this.loadingIndicator = true;
        this.rows_arse = [];
        this.new_item_arse = false;

        //act
        this.rows_act = [];
        this.new_item_act = false;

        //tmnc-covid
        this.rows_tmnc_covid = [];
        this.new_item_tmnc_covid = false;
    }

    ngOnInit(): void {
        //idb type activite
        this.index_api.getAll("type_infrastructure").subscribe((resp) => {
            this.all_type_activite = [...resp.response];
            this.rows_type_activite = resp.response;
        });

        //idb nature construction
        this.index_api.getAll("nature_construction").subscribe((resp) => {
            this.all_nature_construction = [...resp.response];
            this.rows_nature_construction = resp.response;
        });

        //idb quantite construite
        this.index_api.getAll("quantite_construction").subscribe((resp) => {
            this.all_quantite_construite = [...resp.response];
            this.rows_quantite_construite = resp.response;
        });

        //arse
        this.index_api.getAll("type_agr").subscribe((resp) => {
            this.all_arse = [...resp.response];
            this.rows_arse = resp.response;
        });

        //act
        this.index_api.getAll("type_activite_act").subscribe((resp) => {
            this.all_act = [...resp.response];
            this.rows_act = resp.response;
        });

        //tmnc-covid
        this.index_api.getAll("tmnccovid").subscribe((resp) => {
            this.all_tmnc_covid = [...resp.response];
            this.rows_tmnc_covid = resp.response;
        });
    }

    //idb type activite
    AjouterTypeActivite() {
        this.new_item_type_activite = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_type_activite.unshift(item);

        this.rows_type_activite = [...this.rows_type_activite];

        this.editing_type_activite[0] = true;
        this.index_selected_type_activite = 0;

        if (this.item_selected_type_activite.length > 0) {
            this.item_selected_type_activite[0] = item;
        } else {
            this.item_selected_type_activite.push(item);
        }
    }
    annulerTypeActivite() {
        this.editing_type_activite[this.index_selected_type_activite] = false;
        this.item_selected_type_activite = [];

        if (this.new_item_type_activite) {
            this.new_item_type_activite = false;
            this.rows_type_activite.shift();
            this.rows_type_activite = [...this.rows_type_activite];
            this.all_type_activite = [...this.rows_type_activite];
        } else {
            this.rows_type_activite[this.index_selected_type_activite] = this.current_item_type_activite;
            this.rows_type_activite = [...this.rows_type_activite];
        }
    }
    onSelectTypeActivite({ selected }) {
        if (selected) {
            this.index_selected_type_activite = this.rows_type_activite.indexOf(selected[0]);
            this.current_item_type_activite = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    ModifierTypeActivite() {
        this.editing_type_activite[this.index_selected_type_activite] = true;
    }
    supprimerTypeActivite() {
        this.dialog.open(this.suppression_dialog_type_activite, { disableClose: true }); 
    }
    suppressionConfirmerTypeActivite()
    {
        this.save_in_base_type_activite(1);
    } 
    updateValueTypeActivite(e, c, i) {
        this.rows_type_activite[i][c] = e.target.value;
    }
    save_in_base_type_activite(etat_suppression) {
        this.editing_type_activite[this.index_selected_type_activite] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_type_activite[0].id,
            supprimer: etat_suppression,
            code: this.item_selected_type_activite[0].code,
            libelle: this.item_selected_type_activite[0].libelle,
        };

        this.index_api
            .add("type_infrastructure", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_type_activite) {
                        if (etat_suppression == 1) {
                            this.all_type_activite.splice(this.index_selected_type_activite, 1);
                            this.all_type_activite = [...this.all_type_activite];
                            this.rows_type_activite = [...this.all_type_activite];
                        }
                    } else {
                        this.new_item_type_activite = false;
                        this.rows_type_activite[this.index_selected_type_activite]["id"] =
                            String(response["response"]);
                        this.all_type_activite = [...this.rows_type_activite];
                    }

                    this.item_selected_type_activite = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //idb nature construction
    AjouterNatureConstruction() {
        this.new_item_nature_construction = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_nature_construction.unshift(item);

        this.rows_nature_construction = [...this.rows_nature_construction];

        this.editing_nature_construction[0] = true;
        this.index_selected_nature_construction = 0;

        if (this.item_selected_nature_construction.length > 0) {
            this.item_selected_nature_construction[0] = item;
        } else {
            this.item_selected_nature_construction.push(item);
        }
    }
    annulerNatureConstruction() {
        this.editing_nature_construction[this.index_selected_nature_construction] = false;
        this.item_selected_nature_construction = [];

        if (this.new_item_nature_construction) {
            this.new_item_nature_construction = false;
            this.rows_nature_construction.shift();
            this.rows_nature_construction = [...this.rows_nature_construction];
            this.all_nature_construction = [...this.rows_nature_construction];
        } else {
            this.rows_nature_construction[this.index_selected_nature_construction] = this.current_item_nature_construction;
            this.rows_nature_construction = [...this.rows_nature_construction];
        }
    }
    onSelectNatureConstruction({ selected }) {
        if (selected) {
            this.index_selected_nature_construction = this.rows_nature_construction.indexOf(selected[0]);
            this.current_item_nature_construction = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    ModifierNatureConstruction() {
        this.editing_nature_construction[this.index_selected_nature_construction] = true;
    }
    supprimerNatureConstruction() {
        this.dialog.open(this.suppression_dialog_nature_construction, { disableClose: true }); 
    }
    suppressionConfirmerNatureConstruction()
    {
        this.save_in_base_nature_construction(1);
    } 
    updateValueNatureConstruction(e, c, i) {
        this.rows_nature_construction[i][c] = e.target.value;
    }
    save_in_base_nature_construction(etat_suppression) {
        this.editing_nature_construction[this.index_selected_nature_construction] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_nature_construction[0].id,
            supprimer: etat_suppression,
            code: this.item_selected_nature_construction[0].code,
            libelle: this.item_selected_nature_construction[0].libelle,
        };

        this.index_api
            .add("nature_construction", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_nature_construction) {
                        if (etat_suppression == 1) {
                            this.all_nature_construction.splice(this.index_selected_nature_construction, 1);
                            this.all_nature_construction = [...this.all_nature_construction];
                            this.rows_nature_construction = [...this.all_nature_construction];
                        }
                    } else {
                        this.new_item_nature_construction = false;
                        this.rows_nature_construction[this.index_selected_nature_construction]["id"] =
                            String(response["response"]);
                        this.all_nature_construction = [...this.rows_nature_construction];
                    }

                    this.item_selected_nature_construction = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //idb quantite construite
    AjouterQuantiteConstruite() {
        this.new_item_quantite_construite = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_quantite_construite.unshift(item);

        this.rows_quantite_construite = [...this.rows_quantite_construite];

        this.editing_quantite_construite[0] = true;
        this.index_selected_quantite_construite = 0;

        if (this.item_selected_quantite_construite.length > 0) {
            this.item_selected_quantite_construite[0] = item;
        } else {
            this.item_selected_quantite_construite.push(item);
        }
    }
    annulerQuantiteConstruite() {
        this.editing_quantite_construite[this.index_selected_quantite_construite] = false;
        this.item_selected_quantite_construite = [];

        if (this.new_item_quantite_construite) {
            this.new_item_quantite_construite = false;
            this.rows_quantite_construite.shift();
            this.rows_quantite_construite = [...this.rows_quantite_construite];
            this.all_quantite_construite = [...this.rows_quantite_construite];
        } else {
            this.rows_quantite_construite[this.index_selected_quantite_construite] = this.current_item_quantite_construite;
            this.rows_quantite_construite = [...this.rows_quantite_construite];
        }
    }
    onSelectQuantiteConstruite({ selected }) {
        if (selected) {
            this.index_selected_quantite_construite = this.rows_quantite_construite.indexOf(selected[0]);
            this.current_item_quantite_construite = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    ModifierQuantiteConstruite() {
        this.editing_quantite_construite[this.index_selected_quantite_construite] = true;
    }
    supprimerQuantiteConstruite() {
        this.dialog.open(this.suppression_dialog_quantite_construite, { disableClose: true }); 
    }
    suppressionConfirmerQuantiteConstruite()
    {
        this.save_in_base_quantite_construite(1);
    } 
    updateValueQuantiteConstruite(e, c, i) {
        this.rows_quantite_construite[i][c] = e.target.value;
    }
    save_in_base_quantite_construite(etat_suppression) {
        this.editing_quantite_construite[this.index_selected_quantite_construite] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_quantite_construite[0].id,
            supprimer: etat_suppression,
            code: this.item_selected_quantite_construite[0].code,
            libelle: this.item_selected_quantite_construite[0].libelle,
        };

        this.index_api
            .add("quantite_construction", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_quantite_construite) {
                        if (etat_suppression == 1) {
                            this.all_quantite_construite.splice(this.index_selected_quantite_construite, 1);
                            this.all_quantite_construite = [...this.all_quantite_construite];
                            this.rows_quantite_construite = [...this.all_quantite_construite];
                        }
                    } else {
                        this.new_item_quantite_construite = false;
                        this.rows_quantite_construite[this.index_selected_quantite_construite]["id"] =
                            String(response["response"]);
                        this.all_quantite_construite = [...this.rows_quantite_construite];
                    }

                    this.item_selected_quantite_construite = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //arse
    AjouterArse() {
        this.new_item_arse = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_arse.unshift(item);

        this.rows_arse = [...this.rows_arse];

        this.editing_arse[0] = true;
        this.index_selected_arse = 0;

        if (this.item_selected_arse.length > 0) {
            this.item_selected_arse[0] = item;
        } else {
            this.item_selected_arse.push(item);
        }
    }
    annulerArse() {
        this.editing_arse[this.index_selected_arse] = false;
        this.item_selected_arse = [];

        if (this.new_item_arse) {
            this.new_item_arse = false;
            this.rows_arse.shift();
            this.rows_arse = [...this.rows_arse];
            this.all_arse = [...this.rows_arse];
        } else {
            this.rows_arse[this.index_selected_arse] = this.current_item_arse;
            this.rows_arse = [...this.rows_arse];
        }
    }
    onSelectArse({ selected }) {
        if (selected) {
            this.index_selected_arse = this.rows_arse.indexOf(selected[0]);
            this.current_item_arse = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    ModifierArse() {
        this.editing_arse[this.index_selected_arse] = true;
    }
    supprimerArse() {
        this.dialog.open(this.suppression_dialog_arse, { disableClose: true }); 
    }
    suppressionConfirmerArse()
    {
        this.save_in_base_arse(1);
    } 
    updateValueArse(e, c, i) {
        this.rows_arse[i][c] = e.target.value;
    }
    save_in_base_arse(etat_suppression) {
        this.editing_arse[this.index_selected_arse] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_arse[0].id,
            supprimer: etat_suppression,
            code: this.item_selected_arse[0].code,
            libelle: this.item_selected_arse[0].libelle,
        };

        this.index_api
            .add("type_agr", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_arse) {
                        if (etat_suppression == 1) {
                            this.all_arse.splice(this.index_selected_arse, 1);
                            this.all_arse = [...this.all_arse];
                            this.rows_arse = [...this.all_arse];
                        }
                    } else {
                        this.new_item_arse = false;
                        this.rows_arse[this.index_selected_arse]["id"] =
                            String(response["response"]);
                        this.all_arse = [...this.rows_arse];
                    }

                    this.item_selected_arse = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }
    
    //ACT
    AjouterAct() {
        this.new_item_act = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_act.unshift(item);

        this.rows_act = [...this.rows_act];

        this.editing_act[0] = true;
        this.index_selected_act = 0;

        if (this.item_selected_act.length > 0) {
            this.item_selected_act[0] = item;
        } else {
            this.item_selected_act.push(item);
        }
    }
    onSelectAct({ selected }) {
        if (selected) {
            this.index_selected_act = this.rows_act.indexOf(selected[0]);
            this.current_item_act = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    updateValueAct(e, c, i) {
        this.rows_act[i][c] = e.target.value;
    }
    annulerAct() {
        this.editing_act[this.index_selected_act] = false;
        this.item_selected_act = [];

        if (this.new_item_act) {
            this.new_item_act = false;
            this.rows_act.shift();
            this.rows_act = [...this.rows_act];
            this.all_act = [...this.rows_act];
        } else {
            this.rows_act[this.index_selected_act] = this.current_item_act;
            this.rows_act = [...this.rows_act];
        }
    }
    ModifierAct() {
        this.editing_act[this.index_selected_act] = true;
    }
    supprimerAct() {
        this.dialog.open(this.suppression_dialog_act, { disableClose: true }); 
    }
    suppressionConfirmerAct()
    {
        this.save_in_base_act(1);
    } 
    save_in_base_act(etat_suppression) {
        this.editing_act[this.index_selected_act] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_act[0].id,
            supprimer: etat_suppression,
            code: this.item_selected_act[0].code,
            libelle: this.item_selected_act[0].libelle,
        };

        this.index_api
            .add("type_activite_act", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_act) {
                        if (etat_suppression == 1) {
                            this.all_act.splice(this.index_selected_act, 1);
                            this.all_act = [...this.all_act];
                            this.rows_act = [...this.all_act];
                        }
                    } else {
                        this.new_item_act= false;
                        this.rows_act[this.index_selected_act]["id"] =
                            String(response["response"]);
                        this.all_act = [...this.rows_act];
                    }

                    this.item_selected_act = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //tmnc-covid
    AjouterTmncCovid() {
        this.new_item_tmnc_covid = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_tmnc_covid.unshift(item);

        this.rows_tmnc_covid = [...this.rows_tmnc_covid];

        this.editing_tmnc_covid[0] = true;
        this.index_selected_tmnc_covid = 0;

        if (this.item_selected_tmnc_covid.length > 0) {
            this.item_selected_tmnc_covid[0] = item;
        } else {
            this.item_selected_tmnc_covid.push(item);
        }
    }
    onSelectTmncCovid({ selected }) {
        if (selected) {
            this.index_selected_tmnc_covid = this.rows_tmnc_covid.indexOf(selected[0]);
            this.current_item_tmnc_covid = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    updateValueTmncCovid(e, c, i) {
        this.rows_tmnc_covid[i][c] = e.target.value;
    }
    annulerTmncCovid() {
        this.editing_tmnc_covid[this.index_selected_tmnc_covid] = false;
        this.item_selected_tmnc_covid = [];

        if (this.new_item_tmnc_covid) {
            this.new_item_tmnc_covid = false;
            this.rows_tmnc_covid.shift();
            this.rows_tmnc_covid = [...this.rows_tmnc_covid];
            this.all_tmnc_covid = [...this.rows_tmnc_covid];
        } else {
            this.rows_tmnc_covid[this.index_selected_tmnc_covid] = this.current_item_tmnc_covid;
            this.rows_tmnc_covid = [...this.rows_tmnc_covid];
        }
    }
    ModifierTmncCovid() {
        this.editing_tmnc_covid[this.index_selected_tmnc_covid] = true;
    }
    supprimerTmncCovid() {
        this.dialog.open(this.suppression_dialog_tmnc_covid, { disableClose: true }); 
    }
    suppressionConfirmerTmncCovid()
    {
        this.save_in_base_tmnc_covid(1);
    } 
    save_in_base_tmnc_covid(etat_suppression) {
        this.editing_act[this.index_selected_act] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_tmnc_covid[0].id,
            supprimer: etat_suppression,
            code: this.item_selected_tmnc_covid[0].code,
            libelle: this.item_selected_tmnc_covid[0].libelle,
        };

        this.index_api
            .add("tmnccovid", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_tmnc_covid) {
                        if (etat_suppression == 1) {
                            this.all_tmnc_covid.splice(this.index_selected_tmnc_covid, 1);
                            this.all_tmnc_covid = [...this.all_tmnc_covid];
                            this.rows_tmnc_covid = [...this.all_tmnc_covid];
                        }
                    } else {
                        this.new_item_tmnc_covid= false;
                        this.rows_tmnc_covid[this.index_selected_tmnc_covid]["id"] =
                            String(response["response"]);
                        this.all_tmnc_covid = [...this.rows_tmnc_covid];
                    }

                    this.item_selected_tmnc_covid = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    suppressionAnnuler() {
        this.dialog.closeAll();
    }
    private convertion_data(data) {
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

        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
}
