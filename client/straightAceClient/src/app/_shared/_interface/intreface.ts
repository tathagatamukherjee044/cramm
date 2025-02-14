import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders;
    params?: HttpParams;
  }

export  interface User {
    _id: string;
    name: string;
    email: string;
  }
