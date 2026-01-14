import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndexApiService } from 'app/_services/index-api.service';

@Component({
  selector: 'app-questionnaire-individu',
  templateUrl: './questionnaire-individu.component.html',
  styleUrls: ['./questionnaire-individu.component.scss']
})
export class QuestionnaireIndividuComponent implements OnInit {

   //questionnaire menage
   all_questionnaire_menage: any[];
   rows_questionnaire_menage: any[];
   selected_questionnaire_menage: any;
   current_item_questionnaire_menage: any;
   new_item_questionnaire_menage: boolean;
   editing_questionnaire_menage = {};
   index_selected_questionnaire_menage: number;
   item_selected_questionnaire_menage = [];
   @ViewChild("suppression_dialog_questionnaire_menage", { static: true })
   suppression_dialog_questionnaire_menage: TemplateRef<any>;
   search_questionnaire_menage:string = "";

   all_reponse: any[];

    //detail reponse
    all_detail_reponse: any[];
    rows_detail_reponse: any[];
    selected_detail_reponse: any;
    current_item_detail_reponse: any;
    new_item_detail_reponse: boolean;
    editing_detail_reponse = {};
    index_selected_detail_reponse: number;
    item_selected_detail_reponse = [];
    @ViewChild("suppression_dialog_detail_reponse", { static: true })
    suppression_dialog_detail_reponse: TemplateRef<any>;
    search_detail_reponse:string = "";

constructor(private index_api: IndexApiService, public dialog: MatDialog) { 
  //questionnaire menage
  this.rows_questionnaire_menage = [];
  this.new_item_questionnaire_menage = false;

  this.all_reponse = [{id:1,libelle:"Unique"},{id:0,libelle:"Multiple"},{id:2,libelle:"Quantifiée"},{id:3,libelle:"Texte libre"}]    

  //detail reponse
  this.rows_detail_reponse = [];
  this.new_item_detail_reponse = false;
}

ngOnInit(): void {
  this.all_reponse = [{id:1,libelle:"Unique"},{id:0,libelle:"Multiple"},{id:2,libelle:"Quantifiée"},{id:3,libelle:"Texte libre"}]
  this.index_api.getAPIgeneraliserREST(
      "variable_menage",
      "quantifie",
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
      "",
      "",
      "",
      "",
      "",
      "",
      ""
  )
  .subscribe((response) => {
      this.all_questionnaire_menage = response["response"];
  });
  //questionnaire menage
  this.index_api.getAPIgeneraliserREST(
      "liste_variable_individu",
      "choix_multiple",
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
      "",
      "",
      "",
      "",
      "",
      "",
      ""
  )
  .subscribe((response) => {
      this.rows_questionnaire_menage = response["response"];
      console.log('liste questionnaire', this.rows_questionnaire_menage);
  });
}
//questionnaire menage
onSelectQuestionnaireMenage({ selected }) {
      if (selected) {
          this.index_selected_questionnaire_menage = this.rows_questionnaire_menage.indexOf(selected[0]);
          this.current_item_questionnaire_menage = JSON.parse(JSON.stringify(selected[0]));
      }
      this.index_api.getAPIgeneraliserREST(
          "variable_individu",
          "cle_etrangere",
          this.current_item_questionnaire_menage.id,
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
          this.rows_detail_reponse = response["response"];
          console.log('detail reponse', this.rows_detail_reponse);
      });
  }
  ajouterQuestionnaireMenage() {
      this.new_item_questionnaire_menage = true;
      let item = {
          id: "0",
          code: "",
          Description: "",
          liste_reponse: {id:null, libelle:''},
      };

      this.rows_questionnaire_menage.unshift(item);

      this.rows_questionnaire_menage = [...this.rows_questionnaire_menage];

      this.editing_questionnaire_menage[0] = true;
      this.index_selected_questionnaire_menage = 0;

      if (this.item_selected_questionnaire_menage.length > 0) {
          this.item_selected_questionnaire_menage[0] = item;
      } else {
          this.item_selected_questionnaire_menage.push(item);
      }
  }
  modifierQuestionnaireMenage() {
      this.editing_questionnaire_menage[this.index_selected_questionnaire_menage] = true;
  }
  supprimerQuestionnaireMenage() {
      this.dialog.open(this.suppression_dialog_questionnaire_menage, { disableClose: true }); 
  }
  suppressionConfirmerQuestionnaireMenage()
  {
      this.save_in_base_questionnaire_menage(1);
  } 
  annulerQuestionnaireMenage() {
      this.editing_questionnaire_menage[this.index_selected_questionnaire_menage] = false;
      this.item_selected_questionnaire_menage = [];

      if (this.new_item_questionnaire_menage) {
          this.new_item_questionnaire_menage = false;
          this.rows_questionnaire_menage.shift();
          this.rows_questionnaire_menage = [...this.rows_questionnaire_menage];
          this.all_questionnaire_menage = [...this.rows_questionnaire_menage];
      } else {
          this.rows_questionnaire_menage[this.index_selected_questionnaire_menage] = this.current_item_questionnaire_menage;
          this.rows_questionnaire_menage = [...this.rows_questionnaire_menage];
      }
  }
  updateValueQuestionnaireMenage(e, c, i) {
      this.rows_questionnaire_menage[i][c] = e.target.value;
  }
  export_excel() {
      let repertoire = "tableau_de_bord/" ;
      
  }
  save_in_base_questionnaire_menage(etat_suppression) {
      this.editing_questionnaire_menage[this.index_selected_questionnaire_menage] = false;

      let config = {
          headers: {
              "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8;",
          },
      };

      let data = {
          id: this.item_selected_questionnaire_menage[0].id,
          supprimer: etat_suppression,
          code: this.item_selected_questionnaire_menage[0].code,
          description: this.item_selected_questionnaire_menage[0].description,
          nombre:0,
          choix_unique: this.item_selected_questionnaire_menage[0].liste_reponse.libelle,
      };
      console.log(data);
      
      this.index_api
          .add("liste_variable_individu", this.convertion_data(data), config)
          .subscribe(
              (response) => {
                  if (!this.new_item_questionnaire_menage) {
                      if (etat_suppression == 1) {
                          this.all_questionnaire_menage.splice(this.index_selected_questionnaire_menage, 1);
                          this.all_questionnaire_menage = [...this.all_questionnaire_menage];
                          this.rows_questionnaire_menage = [...this.all_questionnaire_menage];
                      }
                  } else {
                      this.new_item_questionnaire_menage = false;
                      this.rows_questionnaire_menage[this.index_selected_questionnaire_menage]["id"] =
                          String(response["response"]);
                      this.all_questionnaire_menage = [...this.rows_questionnaire_menage];
                  }

                  this.item_selected_questionnaire_menage = [];
                  this.dialog.closeAll();
              },
              (error) => {
                  alert("erreur");
              }
          );
  }

  //detail reponse
  onSelectDetailReponse({ selected }) {
      if (selected) {
          this.index_selected_detail_reponse = this.rows_detail_reponse.indexOf(selected[0]);
          this.current_item_detail_reponse = JSON.parse(JSON.stringify(selected[0]));
      }
  }
  ajouterDetailReponse() {
      this.new_item_detail_reponse = true;
      let item = {
          id: "0",
          code: "",
          description: "",
      };

      this.rows_detail_reponse.unshift(item);

      this.rows_detail_reponse = [...this.rows_detail_reponse];

      this.editing_detail_reponse[0] = true;
      this.index_selected_detail_reponse = 0;

      if (this.item_selected_detail_reponse.length > 0) {
          this.item_selected_detail_reponse[0] = item;
      } else {
          this.item_selected_detail_reponse.push(item);
      }
  }
  modifierDetailReponse() {
      this.editing_detail_reponse[this.index_selected_detail_reponse] = true;
  }
  supprimerDetailReponse() {
      this.dialog.open(this.suppression_dialog_detail_reponse, { disableClose: true }); 
  }
  suppressionConfirmerDetailReponse()
  {
      this.save_in_base_detail_reponse(1);
  } 
  annulerDetailReponse() {
      this.editing_detail_reponse[this.index_selected_detail_reponse] = false;
      this.item_selected_detail_reponse = [];

      if (this.new_item_detail_reponse) {
          this.new_item_detail_reponse = false;
          this.rows_detail_reponse.shift();
          this.rows_detail_reponse = [...this.rows_detail_reponse];
          this.all_detail_reponse = [...this.rows_detail_reponse];
      } else {
          this.rows_detail_reponse[this.index_selected_detail_reponse] = this.current_item_detail_reponse;
          this.rows_detail_reponse = [...this.rows_detail_reponse];
      }
  }
  updateValueDetailReponse(e, c, i) {
      this.rows_detail_reponse[i][c] = e.target.value;
  }
  save_in_base_detail_reponse(etat_suppression) {
      this.editing_detail_reponse[this.index_selected_detail_reponse] = false;

      let config = {
          headers: {
              "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8;",
          },
      };

      let data = {
          id: this.item_selected_detail_reponse[0].id,
          supprimer: etat_suppression,
          code: this.item_selected_detail_reponse[0].code,
          description: this.item_selected_detail_reponse[0].description,
          id_liste_variable: this.item_selected_questionnaire_menage[0].id
      };
      this.index_api
          .add("variable_individu", this.convertion_data(data), config)
          .subscribe(
              (response) => {
                  if (!this.new_item_detail_reponse) {
                      if (etat_suppression == 1) {
                          this.all_detail_reponse.splice(this.index_selected_detail_reponse, 1);
                          this.all_detail_reponse = [...this.all_detail_reponse];
                          this.rows_detail_reponse = [...this.all_detail_reponse];
                      }
                  } else {
                      this.new_item_detail_reponse = false;
                      this.rows_detail_reponse[this.index_selected_detail_reponse]["id"] =
                          String(response["response"]);
                      this.all_detail_reponse = [...this.rows_detail_reponse];
                  }

                  this.item_selected_detail_reponse = [];
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
