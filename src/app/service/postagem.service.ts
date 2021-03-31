import { Postagem } from './../model/Postagem';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  baseUrl = environment.server + environment.port

  constructor(
    private http: HttpClient
    ) {}

  token={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagem(): Observable<Postagem[]>{
   return this.http.get<Postagem[]>(this.baseUrl +'/postagens', this.token)
  }

  getByidPostagem(id:number):Observable<Postagem>{
  return this.http.get<Postagem>(this.baseUrl+ `/postagens/${id}`, this.token)
  }

  postPostagem(postagem:Postagem): Observable<Postagem>{
    return this.http.post<Postagem>(this.baseUrl + '/postagens',postagem, this.token)
  }

  putPostagem(postagem:Postagem): Observable<Postagem>{
    return this.http.put<Postagem>(this.baseUrl + '/postagens', postagem, this.token)
  }

  deletePostagem(id:number){
    return this.http.delete(this.baseUrl+ `/postagens/${id}`, this.token)
  }
}
