import { Injectable } from '@angular/core';
declare var gapi: any; //this is the key
import { Observable, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GooglesinginService {
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)
  private auth2: gapi.auth2.GoogleAuth
  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "764346114298-9v7goonkcift2q9aokua6fk7kcpf0is4.apps.googleusercontent.com"
      })
    })
  }
  public singin() {
    this.auth2.signIn({
      scope: "http://www.googleapis.com/auth/gmail.readonly"
    }).then(user => {
      this.subject.next(user)
    }).catch(() => {
      // this.subject.next(null)
    })
  }
  public singout() {
    this.auth2.signOut()
      .then(() => {
        // this.subject.next(null)
      })
  }
  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable()
  }
}
