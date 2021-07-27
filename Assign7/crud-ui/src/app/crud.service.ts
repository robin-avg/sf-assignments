import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url: string = "http://localhost:5000";
  // private headers = new HttpHeaders().set('Content-type', 'application-json');

  constructor(private http: HttpClient) { }
  getList() {
    return this.http.get(this.url + '/list');
  }
  addUser(jsonData: any) {
    return this.http.post(this.url + '/add', jsonData);
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
  getCurrentUser(id: any) {
    return this.http.get(`${this.url}/list/${id}`);
  }
  updateUser(id: any, jsonData: any) {
    return this.http.put(`${this.url}/update/${id}`, jsonData);
  }
}
