import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  async showResultsModal() {
    alert('showResultsModal');
    // console.log('showResultsModal');
  }
}
