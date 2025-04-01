import { Component, OnInit } from '@angular/core';
import { Maquina } from 'src/app/app/models/maquina.models';
import { MaquinasService } from 'src/app/services/maquinas.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authfirebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  maquinas: any[] = [];
  rol: any;
  maquinas$?: Observable<any[]>;
  

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private authService: AuthService,
    private maquinasService: MaquinasService
  ) {}

  ngOnInit(): void {
    
    const maquinasCollection = collection(this.firestore, 'vms');
     // Crear una consulta para filtrar las máquinas por estado "Disponible"
     const maquinasQuery = query(maquinasCollection, where('status', '==', 'running'));

      // Obtener los datos de la consulta
    this.maquinas$ = collectionData(maquinasQuery, { idField: 'id' });

   console.log(maquinasQuery);
  }
}
