// import {Injectable} from '@angular/core';
// import {Observable, ReplaySubject} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TestGoogleService {
//   private auth2: gapi.auth2.GoogleAuth;
//   private subject = new ReplaySubject<gapi.auth2.GoogleAuth>()
//
//   constructor() {
//     gapi.load('auth2', () => {
//       this.auth2 = gapi.auth2.init({
//         cliend_id: `764346114298-9v7goonkcift2q9aokua6fk7kcpf0is4.apps.googleusercontent.com`
//       })
//     })
//   }
//
//   public singin() {
//     this.auth2.signIn({scope: "https://www.googlewapies.com/auth/gmail.readonly"}).then(user => {
//       console.log(user)
//       this.subject.next(user)
//     })
//   }
//
//   public singOut() {
//     this.auth2.signOut()
//
//     }
//     public  observable(): Observable<gapi.auth2.GoogleAuth>{
//     return this.subject.asObservable()
//     }
// }
