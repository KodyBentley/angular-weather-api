import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Weather } from './weather.data';

@Injectable()
export class HttpService {
  private apiKey: string = '0f98cf014f161d1d09caf3d37b5d144f';
  private apiUrl: string;
  private accuKey: string = 'dQfeeOuM1soEhWlmBTHk6yzWAEmTPKLV';
  
  
  constructor(private http: Http) {}

  getData(param: string): Observable<Weather[]> {
    console.log('hello param', param)
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/' + param + '?zip=93004&units=imperial&APPID=' + this.apiKey; 
    return this.http.get(this.apiUrl).map((res: Response) => res.json());
  }

  updateData(str: string, param: string): Observable<Weather[]> {
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/' + param + '?zip=' + str + '&units=imperial&APPID=' + this.apiKey; 
    return this.http.get(this.apiUrl).map((res: Response, err) => res.json());   
  }
}
