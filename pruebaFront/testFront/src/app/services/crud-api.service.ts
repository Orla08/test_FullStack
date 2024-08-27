import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudApiService {

  constructor(
    private http: HttpClient
  ) { }

  urlLocal: string = 'https://localhost:7115/api/Task/'

  getAll() {
    return this.http.get(this.urlLocal)
  }

  getOne(id: number) {
    return this.http.get(this.urlLocal + id)
  }

  post(payload: any) {
    return this.http.post(this.urlLocal, payload);
  }

  put(id: number, payload: any) {
    return this.http.put(this.urlLocal + id, payload);
  }

  putState(id: number, payload: any) {
    return this.http.put(this.urlLocal + 'changeState/' + id, payload);
  }

  delete(id: number) {
    return this.http.delete(this.urlLocal + id);
  }

}
