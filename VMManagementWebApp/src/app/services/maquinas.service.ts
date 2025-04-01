import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Maquina } from '../app/models/maquina.models';
import { Firestore, collection, collectionData, query, where, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MaquinasService {
  constructor(
    private firestore: Firestore, 
    private auth: Auth) 
    {}

  getMaquinas(): Observable<any[]> {
    console.log('llegue a maquinas servicio');
    
    const maquinasCollection = collection(this.firestore, 'vms'); // Nombre de la colección en Firebase
    console.log(maquinasCollection);
    const maquinasQuery = query(maquinasCollection, where('status', '==', 'running'));
    return collectionData(maquinasQuery, { idField: 'id' });
  }

  isAuthenticated(): boolean {
    return this.auth.currentUser != null;
  }
}
