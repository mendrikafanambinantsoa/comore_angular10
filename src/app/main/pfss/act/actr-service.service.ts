// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActrServiceService {

  constructor(private route: ActivatedRoute, private router: Router) { }
  private configurations = {
    '/actr/menage-beneficiaire-actr': {
      etat: 'liste_menage_beneficiaire',
      titre_etat: 'LISTE MENAGE BENEFICIAIRE',
      message_plus: ' bénéficiaire',
      id_sous_projet: 4,
      titre: " ACTR",
      sous_projet: "ACTR",
      placeholder_nom_travailleur: "Travailleur.",
      placeholder_nom_suppleant: "Travailleur suppléant.",	
      affiche_onglet_et_bouton: true,
    },
    '/actr/menage-preselectionne-actr': {
      titre_onglet: ' préseléctionné',
			etat: 'liste_menage_preselectionne',
			titre_etat: 'LISTE MENAGE PRESELECTIONNE',
			message_plus: ' préseléctionné',
			id_sous_projet: 1,
			titre: " ACTR",
			sous_projet: "ACTR",			
			placeholder_nom_travailleur: "Travailleur.",
			placeholder_nom_suppleant: "Travailleur suppléant.",
    },
    '/actr/carte-beneficiaire': {
      etat: 'liste_menage_beneficiaire',
      titre_etat: 'LISTE MENAGE BENEFICIAIRE',
      id_sous_projet: 1,
      titre: " ACTR",
      sous_projet: "ACTR",
      placeholder_nom_travailleur: "Travailleur.",
      placeholder_nom_suppleant: "Travailleur suppléant.",
      affiche_onglet_et_bouton: false,
      exporter_carte_beneficiaire: true ,
    },
    '/ariep/menage-beneficiaire-ariep': {
      etat: 'liste_menage_beneficiaire',
      titre_etat: 'LISTE MENAGE BENEFICIAIRE',
      message_plus: ' bénéficiaire',
      id_sous_projet: 2,
      titre: " ARIEP",
      sous_projet: "ARIEP",
      placeholder_nom_travailleur: "Recepteur.",
      placeholder_nom_suppleant: "Recepteur suppléant.",
      affiche_onglet_et_bouton: true,
    },
    '/ariep/menage-preselectionne-ariep': {
      titre_onglet: ' préseléctionné',
			etat: 'liste_menage_preselectionne',
			titre_etat: 'LISTE MENAGE PRESELECTIONNE',
			message_plus: ' préseléctionné',
			id_sous_projet: 2,
			titre: " ARIEP",
			sous_projet: "ARIEP",
			placeholder_nom_travailleur: "Recepteur.",
			placeholder_nom_suppleant: "Recepteur suppléant.",
    },
    '/ariep/carte-beneficiaire': {
      etat: 'liste_menage_beneficiaire',
      titre_etat: 'LISTE MENAGE BENEFICIAIRE',
      id_sous_projet: 2,
      titre: " ARIEP",
      sous_projet: "ARIEP",
      placeholder_nom_travailleur: "Recepteur.",
      placeholder_nom_suppleant: "Recepteur suppléant.",
      affiche_onglet_et_bouton: false,
      exporter_carte_beneficiaire :  true ,
    },
    '/tms/menage-beneficiaire-tms': {
      id_sous_projet: 4,
      titre: " TMS",
      sous_projet: "TMS",
      placeholder_nom_travailleur: "Recepteur.",
      placeholder_nom_suppleant: "Recepteur suppléant.",
      affiche_onglet_et_bouton: true,
    },
    '/tmnc/carte-beneficiaire': {
      etat: 'liste_menage_beneficiaire',
      titre_etat: 'LISTE MENAGE BENEFICIAIRE',
      id_sous_projet: 4,
      titre: " TMS",
      sous_projet: "TMS",
      placeholder_nom_travailleur: "Recepteur.",
      placeholder_nom_suppleant: "Recepteur suppléant.",
      affiche_onglet_et_bouton: false,
      exporter_carte_beneficiaire: true ,
    },
    '/tmnc/menage-preselectionne-tmnc': {
      titre_onglet: ' préseléctionné',
			etat: 'liste_menage_preselectionne',
			titre_etat: 'LISTE MENAGE PRESELECTIONNE',
			message_plus: ' préseléctionné',
      id_sous_projet: 4,
			titre: " TMS",
			sous_projet: "TMS",
			placeholder_nom_travailleur: "Recepteur.",
			placeholder_nom_suppleant: "Recepteur suppléant.",
    },
    '/act/gerer_pges': {
      titre_onglet: ' préseléctionné',
			etat: 'liste_menage_preselectionne',
			titre_etat: 'LISTE MENAGE PRESELECTIONNE',
			message_plus: ' préseléctionné',
      id_sous_projet: 4,
			titre: " TMS",
			sous_projet: "TMS",
			placeholder_nom_travailleur: "Recepteur.",
			placeholder_nom_suppleant: "Recepteur suppléant.",
    }
  };

  getConfiguration(url: string) {
    return this.configurations[url] || {};
  }
}
