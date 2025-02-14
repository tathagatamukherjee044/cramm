import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_shared/_interface/intreface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userSubject = new BehaviorSubject<User>({
    id: "",
    name: "",
    email: ""
  });


  constructor() { }

  setUser(user: User) {
    this.userSubject.next(user);
  }
}
