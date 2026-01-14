import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IndexApiService } from 'app/_services/index-api.service';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

class DetailsOutils {
  constructor() { }
  id: string;
  code: string;
  description: string;
}
class Outils {
  constructor() { }
  id: string;
  code: string;
  description: string;
}
@Component({
  selector: 'app-formation-ml-outil-com',
  templateUrl: './formation-ml-outil-com.component.html',
  styleUrls: ['./formation-ml-outil-com.component.scss']
})

export class FormationMlOutilComComponent implements OnInit {
  nouvelItem: any
  FormulaireOutilsDeCommunication: FormGroup
  FormulaireDetailOutilsDeCommunication: FormGroup
  formulaireOutilsDeCommunication: boolean
  formulaireDetailsOutilsDeCommunication: boolean
  row_outils_de_communication: any = []
  row_details_outils_de_communication: any = []
  columnsOutilsDeCommunication = [
    { name: "Code", prop: "code", sortable: true },
    { name: "Description", prop: "description", sortable: true }
  ]
  columnsDetailsOutilsDeCommunication = [
    { name: "Code", prop: "Code", sortable: true },
    { name: "Description", prop: "Description", sortable: true }
  ]
  outils: any
  detail: any
  selectedItemOutils: any
  selectedItemDetailsOutils: any
  searchOutils: string = ""
  searchDetails: string = ""
  selected: any = []
  id_outils: any
  rows: any = []
  buttonModifierOutil: boolean
  buttonSupprimerOutil: boolean
  buttonAjoutDetail: boolean
  buttonModifierDetail: boolean
  buttonSupprimerDetail: boolean
  reorderable: boolean
  loadingIndicator: boolean
  constructor(
    private _formBuilder: FormBuilder,
    private service: IndexApiService,
    public dialog: MatDialog
  ) { }
  @ViewChild("suppressionDialog", { static: true })
  suppressionDialog: TemplateRef<any>;
  @ViewChild("suppressionDialog1", { static: true })
  suppressionDialog1: TemplateRef<any>;
  ngOnInit(): void {
    this.outils = {}
    this.detail = {}
    this.selected = []
    this.buttonModifierOutil = false
    this.buttonSupprimerOutil = false
    this.buttonAjoutDetail = false
    this.buttonModifierDetail = false
    this.buttonSupprimerDetail = false
    this.nouvelItem = false
    this.getOutilsDeCommunication();
    this.getDetailsOutilsCommunication();
    this.FormulaireOutilsDeCommunication = this._formBuilder.group({
      code: ["", Validators.required],
      description: ["", Validators.required]
    })
    this.FormulaireDetailOutilsDeCommunication = this._formBuilder.group({
      code: ["", Validators.required],
      description: ["", Validators.required]
    })
    this.formulaireOutilsDeCommunication = false
    this.formulaireDetailsOutilsDeCommunication = false
  }

  getOutilsDeCommunication() {
    this.service.getAll("Formation_ml_outil_communication").subscribe(Response => {
      this.row_outils_de_communication = Response['response']
      this.row_outils_de_communication = [...this.row_outils_de_communication]
    })
  }
  getDetailsOutilsCommunication() {
    this.service.getAll("Formation_ml_outil_communication_detail").subscribe(Response => {
      this.row_details_outils_de_communication = Response['response']
      this.rows = this.row_details_outils_de_communication
      this.row_details_outils_de_communication = this.row_details_outils_de_communication.filter(function (item) {
        return item.detail == 0
      })
      this.row_details_outils_de_communication = [...this.row_details_outils_de_communication]
    })
  }
  ajoutNouveauOutils = () => {
    this.nouvelItem = true
    this.buttonModifierOutil = false
    this.buttonSupprimerOutil = false
    this.formulaireOutilsDeCommunication = true
  }
  ajoutNouveauDetails = () => {
    this.nouvelItem = true
    this.buttonModifierDetail = false
    this.buttonSupprimerDetail = false
    this.formulaireDetailsOutilsDeCommunication = true
  }
  supprimerOutils() {
    this.dialog.open(this.suppressionDialog, { disableClose: true })
  }
  supprimerDetails() {
    this.dialog.open(this.suppressionDialog1, { disableClose: true })
  }
  closeDialog() {
    this.dialog.closeAll()
  }
  annulerOutils() {
    this.selected = []
    this.buttonModifierOutil = false
    this.buttonSupprimerOutil = false
    this.buttonAjoutDetail = false
    this.buttonModifierDetail = false
    this.buttonSupprimerDetail = false
    this.formulaireOutilsDeCommunication = false
    this.FormulaireOutilsDeCommunication.reset();

  }
  annulerDetails() {
    this.buttonModifierDetail = false
    this.buttonSupprimerDetail = false
    this.formulaireDetailsOutilsDeCommunication = false
    this.FormulaireDetailOutilsDeCommunication.reset()
  }
  ajoutOutils(item, suppression) {
    if (this.nouvelItem == true) {
      this.saveOutils(item, suppression)
    } else {
      this.saveOutils(item, suppression)
    }
  }
  ajoutDetails(item, suppression) {
    if (this.nouvelItem == true) {
      this.saveDetails(item, suppression)
    } else {
      this.saveDetails(item, suppression)
    }
  }
  saveOutils = (item, suppression) => {
    let getId = 0
    if (this.nouvelItem == false) {
      getId = this.selectedItemOutils.id
    }
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    let data = {
      id: getId,
      supprimer: suppression,
      code: item.code,
      description: item.description,
    }

    let insert = this.serializeData(data)
    this.service.add("Formation_ml_outil_communication", insert, config).subscribe((response: any) => {
      if (this.nouvelItem == false) {
        //modification
        if (suppression == 0) {
          //modification
          this.selectedItemOutils.code = item.code
          this.selectedItemOutils.description = item.description
        } else {
          //suppression
          this.row_outils_de_communication = this.row_outils_de_communication.filter(items => {
            return items.id !== this.selectedItemOutils.id
          })
          this.row_outils_de_communication = [...this.row_outils_de_communication]
          this.buttonSupprimerOutil = false
          this.buttonModifierOutil = false
          this.selected = []
          this.selectedItemDetailsOutils = {}
          this.getOutilsDeCommunication()
          this.closeDialog()
          this.ngOnInit()
        }
      } else {
        //modification
        let data = {
          id: String(response.response),
          code: item.code,
          description: item.description
        }
        this.row_outils_de_communication.unshift(data)
        this.row_outils_de_communication = [...this.row_outils_de_communication]
        this.nouvelItem = false
        this.ngOnInit()
      }
      //ajout
      this.getOutilsDeCommunication()
      this.ngOnInit()
      this.row_outils_de_communication = [...this.row_outils_de_communication]
      this.formulaireOutilsDeCommunication = false
      this.FormulaireOutilsDeCommunication.reset()
    }), Error
  }
  saveDetails = (item, suppression) => {
    let getId = 0
    if (this.nouvelItem == false) {
      getId = this.selectedItemDetailsOutils.id
    }
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    let data = {
      id: getId,
      supprimer: suppression,
      code: item.code,
      description: item.description,
      id_outil_communication: this.selectedItemOutils.id
    }
    let insert = this.serializeData(data)
    this.service.add("Formation_ml_outil_communication_detail", insert, config).subscribe((Response: any) => {
      if (this.nouvelItem == false) {
        if (suppression == 0) {
          this.selectedItemDetailsOutils.code = item.code
          this.selectedItemDetailsOutils.description = item.desciption
        } else {
          this.row_details_outils_de_communication = this.row_details_outils_de_communication.filter((item: any) => {
            return item.id !== this.selectedItemDetailsOutils.id
          })
          this.row_details_outils_de_communication = [...this.row_details_outils_de_communication]
          this.buttonSupprimerDetail = false
          this.buttonModifierDetail = false
          this.selected = []
          //this.selectedItemDetailsOutils = {}
          this.closeDialog() 
        }
      } else {
        let data = {
          id: String(Response.response),
          code: item.code,
          description: item.description,
          id_outil_communication: this.selectedItemOutils.id
        }
        this.row_details_outils_de_communication.unshift(data)
        this.row_details_outils_de_communication = [...this.row_details_outils_de_communication]
        this.nouvelItem = false  
        this.closeDialog()      
      }
      this.row_details_outils_de_communication = [...this.row_details_outils_de_communication]
      this.FormulaireDetailOutilsDeCommunication.reset()
      this.formulaireDetailsOutilsDeCommunication = false
    }), Error

  }
  onSelectOutils(event: any) {
    this.buttonModifierOutil = true
    this.buttonSupprimerOutil = true
    this.buttonAjoutDetail = true
    this.selectedItemOutils = JSON.parse(JSON.stringify(event.selected[0]))
    let id_outils = this.selectedItemOutils.id
    this.row_details_outils_de_communication = this.rows
    this.row_details_outils_de_communication = this.row_details_outils_de_communication.filter(function (details_communication) {
      return details_communication.id_outil_communication == id_outils
    })
  }
  onSelectDetails(event: any) {
    this.buttonModifierDetail = true
    this.buttonSupprimerDetail = true
    this.selectedItemDetailsOutils = JSON.parse(JSON.stringify(event.selected[0]))
  }
  modifierOutils = () => {
    this.formulaireOutilsDeCommunication = true
    this.nouvelItem = false
    this.outils = {
      id: this.selectedItemOutils.id,
      code: this.selectedItemOutils.code,
      description: this.selectedItemOutils.description
    }
  }
  modifierDetails = () => {
    this.formulaireDetailsOutilsDeCommunication = true
    this.nouvelItem = false
    this.detail = {
      id: this.selectedItemDetailsOutils.id,
      code: this.selectedItemDetailsOutils.code,
      description: this.selectedItemDetailsOutils.description
    }
  }
  confirmationSuppressionOutils() {
    this.ajoutOutils(this.selectedItemOutils, 1)
  }
  confirmationSuppressionDetails() {
    this.ajoutDetails(this.selectedItemDetailsOutils, 1)
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
