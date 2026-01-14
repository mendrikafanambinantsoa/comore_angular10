import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-decoupage-administratif",
    templateUrl: "./decoupage-administratif.component.html",
    styleUrls: ["./decoupage-administratif.component.scss"],
})
export class DecoupageAdministratifComponent implements OnInit {
    //ile
    all_ile: any[];
    rows_ile: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    currentItem_ile: any;
    new_item_ile: boolean;
    editing_ile = {};
    index_selected_ile: number;
    item_selected_ile = [];
    search_ile: string = "";
    @ViewChild("suppressionDialogIle", { static: true })
    suppressionDialogIle: TemplateRef<any>;

    //prefecture
    all_prefecture: any[];
    rows_prefecture: any[];
    currentItem_prefecture: any;
    new_item_prefecture: boolean;
    editing_prefecture = {};
    index_selected_prefecture: number;
    item_selected_prefecture = [];
    search_prefecture: string = "";
    @ViewChild("suppressionDialogPrefecture", { static: true })
    suppressionDialogPrefecture: TemplateRef<any>;

    //commune
    all_commune: any[];
    rows_commune: any[];
    currentItem_commune: any;
    new_item_commune: boolean;
    editing_commune = {};
    index_selected_commune: number;
    item_selected_commune = [];
    search_commune: string = "";
    @ViewChild("suppressionDialogCommune", { static: true })
    suppressionDialogCommune: TemplateRef<any>;

    //village
    all_village: any[];
    rows_village: any[];
    currentItem_village: any;
    new_item_village: boolean;
    editing_village = {};
    index_selected_village: number;
    item_selected_village = [];
    search_village: string = "";
    @ViewChild("suppressionDialogVillage", { static: true })
    suppressionDialogVillage: TemplateRef<any>;

    //zip
    all_zip: any[];

    constructor(private index_api: IndexApiService, public dialog: MatDialog) {
        // ile
        //  this.reorderable = true;
        //  this.loadingIndicator = true;
        this.rows_ile = [];
        this.new_item_ile = false;

        //prefecture
        this.rows_prefecture = [];
        this.new_item_prefecture = false;
    }

    ngOnInit(): void {
        //ile
        this.index_api.getAll("ile").subscribe((resp) => {
            this.all_ile = [...resp.response];
            this.rows_ile = resp.response;
        });
        //zip
        this.index_api.getAll("zip").subscribe((resp) => {
            this.all_zip = [...resp.response];
            // this.rows_ile = resp.response;
        });
    }
    //ile
    onSelectIle({ selected }) {
        if (selected) {
            this.index_selected_ile = this.rows_ile.indexOf(selected[0]);
            this.currentItem_ile = JSON.parse(JSON.stringify(selected[0]));
        }
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.currentItem_ile.id,
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
            .subscribe((response) => {
                this.rows_prefecture = response["response"];
                this.all_prefecture = response.response;
            });
        // console.log(this.index_selected_ile);
    }
    ajouterIle() {
        this.new_item_ile = true;
        let item = {
            id: "0",
            code: "",
            Ile: "",
        };

        this.rows_ile.unshift(item);

        this.rows_ile = [...this.rows_ile];

        this.editing_ile[0] = true;
        this.index_selected_ile = 0;

        if (this.item_selected_ile.length > 0) {
            this.item_selected_ile[0] = item;
        } else {
            this.item_selected_ile.push(item);
        }
    }
    modifierIle() {
        this.editing_ile[this.index_selected_ile] = true;
    }
    supprimerIle() {
        this.dialog.open(this.suppressionDialogIle, { disableClose: true });
    }
    suppressionConfirmerIle() {
        this.save_in_base_ile(1);
    }
    annulerIle() {
        this.editing_ile[this.index_selected_ile] = false;
        this.item_selected_ile = [];

        if (this.new_item_ile) {
            this.new_item_ile = false;
            this.rows_ile.shift();
            this.rows_ile = [...this.rows_ile];
            this.all_ile = [...this.rows_ile];
        } else {
            this.rows_ile[this.index_selected_ile] = this.currentItem_ile;
            this.rows_ile = [...this.rows_ile];
        }
    }
    updateValueIle(e, c, i) {
        this.rows_ile[i][c] = e.target.value;
    }
    export_excel() {
        let repertoire = "tableau_de_bord/";
    }
    save_in_base_ile(etat_suppression) {
        this.editing_ile[this.index_selected_ile] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_ile[0].id,
            supprimer: etat_suppression,
            Code: this.item_selected_ile[0].Code,
            Ile: this.item_selected_ile[0].Ile,
        };

        this.index_api.add("ile", this.convertion_data(data), config).subscribe(
            (response) => {
                if (!this.new_item_ile) {
                    if (etat_suppression == 1) {
                        this.all_ile.splice(this.index_selected_ile, 1);
                        this.all_ile = [...this.all_ile];
                        this.rows_ile = [...this.all_ile];
                    }
                } else {
                    this.new_item_ile = false;
                    this.rows_ile[this.index_selected_ile]["id"] = String(
                        response["response"]
                    );
                    this.all_ile = [...this.rows_ile];
                }

                this.item_selected_ile = [];
                this.dialog.closeAll();
            },
            (error) => {
                alert("erreur");
            }
        );
    }

    //prefecture
    onSelectPrefecture({ selected }) {
        if (selected) {
            this.index_selected_prefecture = this.rows_prefecture.indexOf(
                selected[0]
            );
            this.currentItem_prefecture = JSON.parse(
                JSON.stringify(selected[0])
            );
        }
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                this.currentItem_prefecture.id,
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
            .subscribe((response) => {
                this.rows_commune = response["response"];
                this.all_commune = response.response;
            });
    }
    ajouterPrefecture() {
        this.new_item_prefecture = true;
        let item = {
            id: "0",
            code: "",
            Region: "",
        };

        this.rows_prefecture.unshift(item);

        this.rows_prefecture = [...this.rows_prefecture];

        this.editing_prefecture[0] = true;
        this.index_selected_prefecture = 0;

        if (this.item_selected_prefecture.length > 0) {
            this.item_selected_prefecture[0] = item;
        } else {
            this.item_selected_prefecture.push(item);
        }
    }
    modifierPrefecture() {
        this.editing_prefecture[this.index_selected_prefecture] = true;
    }
    supprimerPrefecture() {
        this.dialog.open(this.suppressionDialogPrefecture, {
            disableClose: true,
        });
    }
    suppressionConfirmerPrefecture() {
        this.save_in_base_prefecture(1);
    }
    annulerPrefecture() {
        this.editing_prefecture[this.index_selected_prefecture] = false;
        this.item_selected_prefecture = [];

        if (this.new_item_prefecture) {
            this.new_item_prefecture = false;
            this.rows_prefecture.shift();
            this.rows_prefecture = [...this.rows_prefecture];
            this.all_prefecture = [...this.rows_prefecture];
        } else {
            this.rows_prefecture[this.index_selected_prefecture] =
                this.currentItem_prefecture;
            this.rows_prefecture = [...this.rows_prefecture];
        }
    }
    updateValuePrefecture(e, c, i) {
        this.rows_prefecture[i][c] = e.target.value;
    }
    save_in_base_prefecture(etat_suppression) {
        this.editing_prefecture[this.index_selected_prefecture] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_prefecture[0].id,
            Code: this.item_selected_prefecture[0].Code,
            Region: this.item_selected_prefecture[0].Region,
            ile_id: this.item_selected_ile[0].id,
            supprimer: etat_suppression,
        };

        this.index_api
            .add("region", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_prefecture) {
                        if (etat_suppression == 1) {
                            this.all_prefecture.splice(
                                this.index_selected_prefecture,
                                1
                            );
                            this.all_prefecture = [...this.all_prefecture];
                            this.rows_prefecture = [...this.all_prefecture];
                        }
                    } else {
                        this.new_item_prefecture = false;
                        this.rows_prefecture[this.index_selected_prefecture][
                            "id"
                        ] = String(response["response"]);
                        this.all_prefecture = [...this.rows_prefecture];
                    }

                    this.item_selected_prefecture = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //commune
    onSelectCommune({ selected }) {
        if (selected) {
            this.index_selected_commune = this.rows_commune.indexOf(
                selected[0]
            );
            this.currentItem_commune = JSON.parse(JSON.stringify(selected[0]));
        }
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                this.currentItem_commune.id,
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
            .subscribe((response) => {
                this.rows_village = response["response"];
                this.all_village = response.response;
                console.log('tous village', this.all_village);
                
            });
    }
    ajouterCommune() {
        this.new_item_commune = true;
        let item = {
            id: "0",
            Code: "",
            Commune: "",
        };

        this.rows_commune.unshift(item);

        this.rows_commune = [...this.rows_commune];

        this.editing_commune[0] = true;
        this.index_selected_commune = 0;

        if (this.item_selected_commune.length > 0) {
            this.item_selected_commune[0] = item;
        } else {
            this.item_selected_commune.push(item);
        }
    }
    modifierCommune() {
        this.editing_commune[this.index_selected_commune] = true;
    }
    supprimerCommune() {
        this.dialog.open(this.suppressionDialogCommune, {
            disableClose: true,
        });
    }
    suppressionConfirmerCommune() {
        this.save_in_base_commune(1);
    }
    annulerCommune() {
        this.editing_commune[this.index_selected_commune] = false;
        this.item_selected_commune = [];

        if (this.new_item_commune) {
            this.new_item_commune = false;
            this.rows_commune.shift();
            this.rows_commune = [...this.rows_commune];
            this.all_commune = [...this.rows_commune];
        } else {
            this.rows_commune[this.index_selected_commune] =
                this.currentItem_commune;
            this.rows_commune = [...this.rows_commune];
        }
    }
    updateValueCommune(e, c, i) {
        this.rows_commune[i][c] = e.target.value;
    }
    save_in_base_commune(etat_suppression) {
        this.editing_commune[this.index_selected_commune] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_commune[0].id,
            Code: this.item_selected_commune[0].Code,
            Commune: this.item_selected_commune[0].Commune,
            region_id: this.item_selected_prefecture[0].id,
            supprimer: etat_suppression,
        };

        this.index_api
            .add("commune", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_commune) {
                        if (etat_suppression == 1) {
                            this.all_commune.splice(
                                this.index_selected_commune,
                                1
                            );
                            this.all_commune = [...this.all_commune];
                            this.rows_commune = [...this.all_commune];
                        }
                    } else {
                        this.new_item_commune = false;
                        this.rows_commune[this.index_selected_commune]["id"] =
                            String(response["response"]);
                        this.all_commune = [...this.rows_commune];
                    }

                    this.item_selected_commune = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //village
    onSelectVillage({ selected }) {
        if (selected) {
            this.index_selected_village = this.rows_village.indexOf(
                selected[0]
            );
            this.currentItem_village = JSON.parse(JSON.stringify(selected[0]));
        }
    }
    ajouterVillage() {
        this.new_item_village = true;
        let item = {
            id: "0",
            Code: "",
            Village: "",
            vague: "",
            // id_zip: "",
            zip: {id: null, libelle:''},
            population_rgph_2017: "",
        };

        this.rows_village.unshift(item);

        this.rows_village = [...this.rows_village];

        this.editing_village[0] = true;
        this.index_selected_village = 0;

        if (this.item_selected_village.length > 0) {
            this.item_selected_village[0] = item;
        } else {
            this.item_selected_village.push(item);
        }
    }
    modifierVillage() {
        this.editing_village[this.index_selected_village] = true;
    }
    supprimerVillage() {
        this.dialog.open(this.suppressionDialogVillage, {
            disableClose: true,
        });
    }
    suppressionConfirmerVillage() {
        this.save_in_base_village(1);
    }
    annulerVillage() {
        this.editing_village[this.index_selected_village] = false;
        this.item_selected_village = [];

        if (this.new_item_village) {
            this.new_item_village = false;
            this.rows_village.shift();
            this.rows_village = [...this.rows_village];
            this.all_village = [...this.rows_village];
        } else {
            this.rows_village[this.index_selected_village] =
                this.currentItem_village;
            this.rows_village = [...this.rows_village];
        }
    }
    updateValueVillage(e, c, i) {
        this.rows_village[i][c] = e.target.value;
    }
    updateValue_select_zip(e,c,i)
    {
      var zip= this.all_zip.filter(function(obj) {
  
        return obj.id == e.value;
      });
      this.rows_village[i][c] = {id: String(e.value),libelle: zip[0].libelle};
      console.log(zip);
      
    }
    save_in_base_village(etat_suppression) {
        this.editing_village[this.index_selected_village] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_village[0].id,
            Code: this.item_selected_village[0].Code,
            Village: this.item_selected_village[0].Village,
            commune_id: this.item_selected_commune[0].id,
            id_zip: this.item_selected_village[0].zip.id,
            vague: this.item_selected_village[0].vague,
            population_rgph_2017: this.item_selected_village[0].population_rgph_2017,
            supprimer: etat_suppression,
        };
        console.log('donnee village', data);
        

        // this.index_api
        //     .add("commune", this.convertion_data(data), config)
        //     .subscribe(
        //         (response) => {
        //             if (!this.new_item_village) {
        //                 if (etat_suppression == 1) {
        //                     this.all_village.splice(
        //                         this.index_selected_village,
        //                         1
        //                     );
        //                     this.all_village = [...this.all_village];
        //                     this.rows_village = [...this.all_village];
        //                 }
        //             } else {
        //                 this.new_item_village = false;
        //                 this.rows_village[this.index_selected_village]["id"] =
        //                     String(response["response"]);
        //                 this.all_village = [...this.rows_village];
        //             }

        //             this.item_selected_village = [];
        //             this.dialog.closeAll();
        //         },
        //         (error) => {
        //             alert("erreur");
        //         }
        //     );
    }

    AnnulerDialog() {
        this.dialog.closeAll();
        console.log("mikatona");
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
