import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Weather } from '../weather.data';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  data: Weather[];
  arr: Array<{}> = [];
  imgUrl: string;
  error: Weather[];
  apiParam: string = 'forecast';
  constructor(private httpService: HttpService) { }
  ngOnInit() {
    this.getData(this.apiParam);
  }

  getData(apiParam: string) {
    console.log('herere', apiParam)
    this.httpService.getData(apiParam).subscribe(data => {
      this.data = this.chunkArr(data);
      console.log('the data', this.data)
      this.arr.push(data);
    });
  }

  click(str: string) {
    this.arr = [];
    this.error = null;
    this.httpService.updateData(str, this.apiParam).subscribe(data => {
      this.data = this.chunkArr(data);
      this.arr.push(data);
    },
      error => {
        this.error = error;
      }
    );
  }

  timeConverter(time: number) {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formatted = date + ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formatted;
  }

  chunkArr(data: {}) {
    console.log(data)

    let tempArr = [];
    // let chunkSize = 7;
    let myChunk;
    let c: number = 0;
    let arr = [];
    let date;
    let hours;
    for (let i of data['list']) {
      date = new Date(i.dt * 1000);
      hours = date.getHours();
      c++;
      arr.push(hours);
    }
    let chunkSize = c / 8;

    console.log('chunk Size', chunkSize)

    for (let i = 0; i < data['list'].length; i += chunkSize) {
      // let date = new Date(data['list'][i].dt * 1000);
      // let hours = date.getHours();
      // console.log('hours', hours);
      myChunk = data['list'].slice(i, i + chunkSize);
      tempArr.push(myChunk);
    }
    console.log(tempArr);
    return tempArr;
  }

  log(str, val) {
    console.log(str, val);
  }
}
