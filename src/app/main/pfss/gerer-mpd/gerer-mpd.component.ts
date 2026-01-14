import { Component, OnInit, ViewChild } from '@angular/core';
import { GereMdpService } from './gere-mdp.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-gerer-mpd',
  templateUrl: './gerer-mpd.component.html',
  styleUrls: ['./gerer-mpd.component.scss']
})
export class GererMpdComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  config: any;
  // Mémoire descriptive du projet
  
  // Communautés
  // Type du micro-Projet
  // Description des activités
  // Liste des matériels et intrants
  // Indicateurs
  // Cycle du sous projet et planning d’exécution
  // Résultats attendus
  // Suivi des indicateurs
  // Estimation des dépenses
  // Rentabilité financière AGR production de tomate
  // Récapitulatif des estimations des dépenses
  constructor(private gerer_mdp_service: GereMdpService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const url = this.route.snapshot.routeConfig.path;
    this.config = this.gerer_mdp_service.getConfiguration(`/${url}`);
  }
  // debut Mémoire descriptive du projet 

  // fin Mémoire descriptive du projet 

  // debut Communautés 

  // fin Communautés
  
  // debut Type du micro-Projet 

  // fin Type du micro-Projet

  // debut Description des activités 

  // fin Description des activités

  // debut Liste des matériels et intrants 

  // fin Liste des matériels et intrants

  // debut Indicateurs 

  // fin Indicateurs

  // debut Cycle du sous projet et planning d’exécution 

  // fin Cycle du sous projet et planning d’exécution

  // debut Résultats attendus 

  // fin Résultats attendus

  // debut Suivi des indicateurs 

  // fin Suivi des indicateurs

  // debut Estimation des dépenses 

  // fin Estimation des dépenses

  // debut Rentabilité financière AGR production de tomate 

  // fin Rentabilité financière AGR production de tomate

  // debut Récapitulatif des estimations des dépenses 

  // fin Récapitulatif des estimations des dépenses
 
  //Autres
  previousTab() {
    if (this.tabGroup.selectedIndex > 0) {
      this.tabGroup.selectedIndex -= 1;
    }
  }

  nextTab() {
    if (this.tabGroup.selectedIndex < this.tabGroup._tabs.length - 1) {
      this.tabGroup.selectedIndex += 1;
    }
  }
  closeDialog() {
    // this.dialog.closeAll();
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

}
