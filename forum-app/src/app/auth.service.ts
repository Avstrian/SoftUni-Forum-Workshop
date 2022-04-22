import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './core/interfaces';

export interface CreateUserDto { username: string, email: string, password: string, tel?: string }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined as unknown as IUser);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(
    private httpClient: HttpClient
  ) { 
  }

  handleLogin(newUser: IUser) {
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined as unknown as IUser);
  }

  authenticate(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
      .pipe(tap(currentProfile => this.handleLogin(currentProfile)), catchError((err => {
        return EMPTY;
      })));
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
    .post<IUser>(`${environment.apiUrl}/login`, userData, { withCredentials: true });
  }


  logout$(): Observable<void> {
    return this.httpClient
    .post<void>(`${environment.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe()
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/user/register`, userData, { withCredentials: true })
  }
}
