import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GereMdpService {

  constructor() {
   }
   private configurations = {
    '/actr/gerer-mpd': {
      type: 'ACTR',
    },
    '/ariep/gerer-mpd': {
      type: 'ARIEP',
    }
  }
  getConfiguration(url: string) {
    return this.configurations[url] || {};
  }
}
