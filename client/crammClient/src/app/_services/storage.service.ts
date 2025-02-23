import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(key : string,value: any){
    if(typeof value == 'object'){
      value = JSON.stringify(value);
    } else {
      value = value.toString();
    }
    localStorage.setItem(key,value);
    return true
  }

  getStorage(key : string){
    let data
    try {
      data = JSON.parse(localStorage.getItem(key) as string)
    } catch (error) {
      data = localStorage.getItem(key);
    }
    return data
  }

  getStorageString(key : string){
    return localStorage.getItem(key);
  }

  deleteStorage(key : string){
    localStorage.removeItem(key);
    return true
  }
}
