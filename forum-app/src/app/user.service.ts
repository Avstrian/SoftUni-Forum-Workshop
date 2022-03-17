import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  
  isLogged: boolean = false;
  
  constructor(private storage: StorageService) {
    this.isLogged = this.storage.getItem('isLogged');
   }

  login(): void {
    this.isLogged = true;
    this.storage.setItem('isLogged', true)
  }

  logout(): void {
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
  }
}
