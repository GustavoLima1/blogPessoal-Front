import { environment } from './../../environments/environment.prod';
import { UserLogin } from './../model/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baserUrl = environment.server + environment.port
  constructor(
    private http: HttpClient
  ) { }

  login (userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(this.baserUrl +'/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(this.baserUrl + '/usuarios/cadastrar', user)
  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
    ok = true
    }
    return ok
  }
}
