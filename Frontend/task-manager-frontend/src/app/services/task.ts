import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.api);
  }

  createTask(task: any) {
    return this.http.post(this.api, task);
  }

  changeStatus(id: number, status: string) {
    return this.http.put(`${this.api}/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
