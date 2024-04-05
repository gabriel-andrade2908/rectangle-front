import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dimensions } from '../interfaces/rectangle';

@Injectable({
  providedIn: 'root'
})
export class RectangleService {
  private Url = 'https://localhost:7214/api/Rectangle'; 

  constructor(private http: HttpClient) { }

  getDimensions(): Observable<any> {
    return this.http.get(this.Url);
  }

  updateJsonFile(width: number, height: number) {
9
    const jsonData: Dimensions = {
      width: width,
      height: height
    };

    return this.http.put(this.Url, jsonData);
  }
}
