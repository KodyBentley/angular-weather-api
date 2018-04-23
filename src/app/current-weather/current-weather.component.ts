import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Weather } from '../weather.data';

@Component({
  selector: 'app-card',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})

export class CurrentWeatherComponent implements OnInit {
  data: Weather[];
  arr: Array<{}> = [];
  imgUrl: string;
  error: Weather[];
  apiParam: string = 'weather';
  constructor(private httpService: HttpService) { }
  ngOnInit() {
    this.getData(this.apiParam);
  }

  getData(apiParam) {
    console.log('herere', apiParam)
    this.httpService.getData(apiParam).subscribe(data => {
      this.data = data;
      this.imgUrl = "http://openweathermap.org/img/w/" + data['weather'][0].icon + ".png";
      console.log('hello', data);
      this.arr.push(data);
    });
  }

  click(str: string) {
    this.arr = [];
    this.error = null;
    this.httpService.updateData(str, this.apiParam).subscribe(data => {
      this.data = data;
      this.imgUrl = "http://openweathermap.org/img/w/" + data['weather'][0].icon + ".png";
      this.arr.push(data);
    },
      error => {
        this.error = error;
      }
    );
  }

}
