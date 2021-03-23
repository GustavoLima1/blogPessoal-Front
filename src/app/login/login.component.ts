import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   window.scroll(0,0)
  }
  entrar(){
    this.auth.login(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      console.log(environment.token)
      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500){
        alert('Usuario ou senha estão incorretos')
      }
    })

  }
}
