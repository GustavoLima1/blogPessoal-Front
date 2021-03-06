import { environment } from './../../../environments/environment.prod';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/model/Tema';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

    tema: Tema = new Tema
    idTema: number
  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {

   }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/login'])
  }
   this.idTema = this.route.snapshot.params['id']
   this.findByIdTema(this.idTema)
  }

  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  apagar(){
    return this.temaService.deleteTema(this.idTema).subscribe(()=>{
      alert('Tema apagado com sucesso')
      this.router.navigate(['/tema'])
    })
  }


}
