import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IndexApiService } from 'app/_services/index-api.service';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

class LienParenter {
  constructor() {}
  id: string;
  description: string;
}
@Component({
  selector: 'app-lien-parente',
  templateUrl: './lien-parente.component.html',
  styleUrls: ['./lien-parente.component.scss']
})
export class LienParenteComponent implements OnInit {
  nouvelItem: any
  FormulaireLienDeParente: FormGroup
  formulaireLienDeParente: boolean
  row_description: any = []
  columnLienDeParente = [
    { name: "Description", prop: "description", soratable: true}
  ]
  description: any
  selectedItem: any
  search: string = ""
  selected: any = []
  buttonModifier: boolean
  buttonSupprimer: boolean
  reorderable: boolean
  loadingIndicator: boolean
  constructor(
    private _formBuilder: FormBuilder,
    private service: IndexApiService,
    public dialog: MatDialog
  ) { }
  @ViewChild("suppressionDialog", { static: true}) suppressionDialog: TemplateRef<any>
  ngOnInit(): void {
    this.description = {}
    this.selected = []
    this.nouvelItem = false
    this.buttonModifier = false
    this.buttonSupprimer = false
    this.formulaireLienDeParente = false
    this.FormulaireLienDeParente = this._formBuilder.group({
      description: ["", Validators.required]
    })
    this.getAll()
  }
  getAll = () => {
    this.service.getAll("Lienparental").subscribe(Response => {
      this.row_description = Response['response']
      this.row_description = [...this.row_description]
      
    })
  }
  ajoutNouveauDescription = () => {
    this.nouvelItem = true
    this.formulaireLienDeParente = true
  }
  ajoutDescription = (item, suppression) => {
    if (this.nouvelItem == true) {
      this.save(item, suppression)
    }else{
      this.save(item, suppression)
    }
  }
  modifierDescription = () => {
    this.formulaireLienDeParente = true
    this.nouvelItem = false
    this.description = {
      id: this.selectedItem.id,
      description: this.selectedItem.description
    }
  }
  supprimerDescription = () => {
    this.dialog.open(this.suppressionDialog, { disableClose: true })
  }
  annuler = () => {
    this.selected = []
    this.buttonModifier = false
    this.buttonSupprimer = false
    this.formulaireLienDeParente = false
    this.FormulaireLienDeParente.reset()
  }
  save = (item, suppression) => {
    let getId = 0
    if(this.nouvelItem == false){
      getId = this.selectedItem.id
    }
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    let data = {
      id: getId,
      supprimer: suppression,
      description: item.description
    }
    let insert = this.serializeData(data)
    this.service.add("Lienparental", insert, config).subscribe((Response:any) => {
      if(this.nouvelItem == false){
        if (suppression == 0) {
          this.selectedItem.description = item.descdiption
        }else{
          this.row_description = this.row_description.filter((item:any) => {
            return item.id !== this.selectedItem.id
          })
        }
        this.row_description = [...this.row_description]
        // this.buttonModifier = false
        // this.buttonSupprimer = false
        this.ngOnInit()
        this.selected = []
        this.closeDialog()
      }else{
        let data = {
          id: String(Response.response),
          description: item.description
        }
        this.row_description = [...this.row_description]
        this.FormulaireLienDeParente.reset()
        this.formulaireLienDeParente = false
        this.ngOnInit()
      }
    }), Error
  }
  confirmationSuppression = () => {
    this.ajoutDescription(this.selectedItem, 1)
  }
  onSelectDescription = (event:any) => {
    this.buttonModifier = true
    this.buttonSupprimer = true
    this.selectedItem = event.selected[0]
  }
  closeDialog() {
    this.dialog.closeAll()
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
