import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User, getIdToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  // Iniciar sesión con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Obtener el token del usuario autenticado
  async getToken(): Promise<string | null> {
    const user = this.getCurrentUser();
    if (user) {
      const token = await user.getIdTokenResult();
      return token.claims['role'] || null;
    }
    return null;
  }
}