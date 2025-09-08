import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

interface CheckStatusCache {
  TS: number,
  resp: AuthResponse
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly _authStatus = signal<AuthStatus>('checking');
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(localStorage.getItem('tokenT'));

  private readonly _checkStatusCache = signal<CheckStatusCache | null>(null);

  user = computed(() => this._user());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);
  token = computed(() => this._token());

  // This rxResource is executed when the service is injected
  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'not-authenticated'

  });


  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password,
    }).pipe(
      tap(resp => this.saveAuthStatusCache(resp)),
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  register(fullName:string, email:string, password:string){
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      fullName: fullName,
      email: email,
      password: password
    }).pipe(
      tap(resp => this.saveAuthStatusCache(resp)),
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  checkStatus(): Observable<boolean> {

    if (!this.token()) {
      this.logout();
      return of(false);
    }

    if( this._checkStatusCache() ){
      const oneHR = 3600_000
      if( (Date.now() - this._checkStatusCache()!.TS) < oneHR ){
        this.handleAuthSuccess(this._checkStatusCache()!.resp);
        return of(true);
      }
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${tokenT}`
      // }
    }).pipe(
      tap(resp => this.saveAuthStatusCache(resp)),
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )

  }

  logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);

    localStorage.removeItem('tokenT')

    this._checkStatusCache.set(null)
  }

  private handleAuthSuccess(resp: AuthResponse): boolean {

    const { token, user } = resp

    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('tokenT', token)

    return true
  }

  private handleAuthError(error: any): Observable<boolean> {
    this.logout()
    return of(false)
  }

  private saveAuthStatusCache(resp: AuthResponse) {
    this._checkStatusCache.set({
      resp: resp,
      TS: Date.now()
    })
  }

}
