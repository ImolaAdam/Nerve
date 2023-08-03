import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(result => {
      localStorage.setItem('token', 'true');

      if(result.user?.emailVerified) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['verify-email']);
      }

    }, error => {
      alert('Something went wrong');
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(result => {
      this.router.navigate(['/login']);
      this.sendEmailForUserVerification();
    }, error => {
      alert('Something went wrong');
      this.router.navigate(['/register']);
    })
  }

  sendEmailForUserVerification() {
    this.fireAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verify-email']);
      }, (error: any) =>{
          alert('Something went wrong. Not able to send email to registered Email.');
      })
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }, error => {
      alert(error.message);
      this.router.navigate(['/login']);
    })
  }

  //with then we are cathcing the result
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, error => {
      alert('Something went wrong');
    })
  }
}
