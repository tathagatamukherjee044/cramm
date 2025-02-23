import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_shared/_interface/intreface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userSubject = new BehaviorSubject<User>({
    _id: "",
    name: "",
    email: "",
    streak: 0
  });


  constructor(
    private storageService : StorageService,
  ) { }

  setUser(userData: any) {
    const user : User = {
      name : userData.name,
      email : userData.email,
      _id : userData._id,
      streak : userData.streak
    }
    this.userSubject.next(user)
    this.storageService.setStorage('user',user)
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

}
