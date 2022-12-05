import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const baseUrl = 'https://localhost:5001/api/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/email?email=${email}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${baseUrl}/create`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${baseUrl}/update`, user);
  }

  deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/delete/${id}`);
  }
}
