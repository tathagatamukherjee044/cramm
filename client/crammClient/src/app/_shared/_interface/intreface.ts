import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders;
    params?: HttpParams;
  }

export  interface User {
    _id: string;
    name: string;
    email: string;
    streak : number;
    loggedIn : boolean;
}

export interface Question {
    prompt: string;
    choices: Choice[];
    answer: number;
    solution: string;
    userSubmited?: boolean;
}

export interface Choice {
    text: string;
    index: number;
    type?: string | null;
}
