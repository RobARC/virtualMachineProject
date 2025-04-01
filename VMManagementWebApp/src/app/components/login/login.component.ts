import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { LoginService } from '../../services/login.service'
import { UserInfo } from '../../app/models/userinfo.models'
import { UserInfoInterface } from '../../app/models/userinfo.class';
import { AuthService } from '../../services/authfirebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit  {
  checkLoginForm: any;
  userInfo: UserInfo= new UserInfo;
  user: any = null;
  token: string | null = null;
  //tokenExpiration: string = '';
  //role: any;

  constructor (
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
    
  ) {
    this.checkLoginForm = this.fb.group({
      email: "",
      password: "",

   });
  }
  ngOnInit(): void {
   
  }

  async onSubmit(){
    this.userInfo.Email = this.checkLoginForm.value.email;
    this.userInfo.Password = this.checkLoginForm.value.password;

    const data = this.checkLoginForm.value;

    let userInfoInterface: UserInfoInterface = {
      Email: this.checkLoginForm.value.email,
      Password: this.checkLoginForm.value.password,
    };

     // Iniciar sesión con email y contraseña
  
    this.loginService.loginWithEmail(userInfoInterface).then((result) => {
      this.user = result.user;
      console.log('Usuario autenticado con email:', this.user);
      alert("Login Successful");
      this.checkLoginForm.reset()
      this.router.navigate(['inicio']);
    }).catch((error) => {
      console.error('Error al iniciar sesión con email:', error);
      alert('Error al iniciar sesión: ' + error.message);
    });
  
    //window.location.reload();
  
  }

  login() {
    this.authService.loginWithGoogle().then((result) => {
      this.user = result.user;
      console.log('Usuario autenticado:', this.user);
      this.getTokenFirebase(); // Obtener el token después de iniciar sesión
    }).catch((error) => {
      console.error('Error al iniciar sesión:', error);
    });
  }

    // Registrar un nuevo usuario con email y contraseña
    /*registerWithEmail() {
      this.loginService.registerWithEmail(this.userInfo).then((result) => {
        console.log('Usuario registrado:', result.user);
      }).catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
    }*/
  

  // Obtener el token
  getTokenFirebase() {
    this.authService.getToken().then((token) => {
      this.token = token;
      console.log('Token de Firebase:', this.token);
    }).catch((error) => {
      console.error('Error al obtener el token:', error);
    });
  }

  getToken(token: { token: string, tokenExpiration: string, role: string }) { 
    console.log(token);
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.tokenExpiration);
    localStorage.setItem('role', token.role);
    //this.router.navigate(['home']);
  }

  errorMessage(error: any) {
      if (error && error.error) {
      alert(error.error[""]);
    }
  }
 } 