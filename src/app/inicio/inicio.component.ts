import { AuthService } from './../service/auth.service';

import { HttpHeaders } from '@angular/common/http';

import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { User } from '../model/User';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listaPostagem: Postagem[]
    postagem: Postagem = new Postagem

  idTema: number
  listaTemas: Tema[]
  tema: Tema = new Tema()

  baseUrl = environment.server+environment.port

  user: User = new User()
  idUser = environment.id

  constructor(

    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  token ={
    header: new HttpHeaders().set('Authorization' ,environment.token)
  }

  ngOnInit() {

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }
    this.getAllTemas()
    this.getAllPostagem()
    this.findByIdUser()
  }

  getAllTemas(){
     this.temaService.getAllTema().subscribe((resp: Tema[])=>{
        this.listaTemas = resp
    })
  }

  FindByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema= resp
    })
  }
    getAllPostagem(){
      this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
        this.listaPostagem = resp
      })
    }

    findByIdUser(){
      this.authService.findUserById(this.idUser).subscribe((resp: User) => {
        this.user = resp
      })
    }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
    this.postagem = resp

      alert('Postagem realizada com sucesso')
      this.postagem = new Postagem()
      this.getAllPostagem()

    })
  }
}
