import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.api);
  }

  createUser(user: any) {
    return this.http.post(this.api, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
