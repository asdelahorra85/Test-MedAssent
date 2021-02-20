import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nation } from '../model/nation';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

constructor(private http:HttpClient) { }

    getData(): Observable<Nation[]>{
      return this.http.get<Nation[]>('assets/data.json');
    }
}
