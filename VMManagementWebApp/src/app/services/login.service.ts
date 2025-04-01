import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoInterface } from '../app/models/userinfo.class';
import { CookieService } from "ngx-cookie-service";
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, 
               private cookies: CookieService,
               private router: Router,
               private auth: Auth
  ) { }

  //url_api = 'https://localhost:7223'

  /*async LoginUsers(userInfoInterface: UserInfoInterface): Promise<Observable<any>>{

    console.log(userInfoInterface);

    return await this.http.post<any>(`${this.url_api}/api/Account/Login`, userInfoInterface, httpOptions)
    }*/

    loginWithEmail(userInfo: UserInfoInterface) {
      return signInWithEmailAndPassword(this.auth, userInfo.Email, userInfo.Password);
    }

     // Registrar un nuevo usuario con email y contraseña
  /*registerWithEmail(userInfo: UserInfoInterface) {
    return createUserWithEmailAndPassword(this.auth, userInfo.Email, userInfo.Password);
  }*/

    GetToken(){
      return localStorage.getItem('token');
    }

    GetExpirationToken() {
      return localStorage.getItem('tokenExpiration');
    }

    isLoggedIn(): boolean {
      var exp = this.GetToken();
      if(!exp) {
        //there is no expiration token
        console.log(exp);
        
        return false;
      }

      var now = new Date().getTime();
      var dateExp = new Date(exp);
      

      if(now >= dateExp.getTime()) {
        //token is expired
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return false;
      } else {
        return true;
      }
    }

    ErrorHandler(error: HttpErrorResponse) {
      //console.log(error.message);
      alert("Email or password is incorrect, please try again.");
      return error.message;
  }
}