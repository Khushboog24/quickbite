import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Your backend URL

  constructor(private http: HttpClient) {}

  loginWithEmail(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  loginWithGoogle(): Observable<any> {
    window.location.href = `${this.baseUrl}/auth/google`;

    return new Observable((observer) => {
      const callback = (event: MessageEvent) => {
        const { data } = event;
        if (data.type === 'loginWithGoogle') {
          window.removeEventListener('message', callback);
          observer.next(data);
          observer.complete();
        }
      };

      window.addEventListener('message', callback);
    });
  }
}
