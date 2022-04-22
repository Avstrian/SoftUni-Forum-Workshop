import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  private currentUser?: IUser;

  constructor(private storage: StorageService, private httpClient: HttpClient) {
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
    .pipe(tap(user => this.currentUser = user))
  }
}
