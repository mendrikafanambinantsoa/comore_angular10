import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GererAgepService {

  constructor() { }
  private configurations = {
    '/tms/contrat_agep': {
      type_sous_projet: 'TMS',
      montant_a_effectue_prevu: 105000,
      id_sous_projet_state: 4
    },
    '/ariep/contrat_agep': {
      type_sous_projet: 'ARIEP',
      montant_a_effectue_prevu: 3150000,
      id_sous_projet_state: 2
    },
    '/actr/contrat_agep': {
      type_sous_projet: 'ACTR',
      montant_a_effectue_prevu: 75000,
      id_sous_projet_state: 1
    }
  }
  getConfiguration(url: string) {
    return this.configurations[url] || {};
  }
}
