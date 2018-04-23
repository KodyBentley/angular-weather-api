import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CurrentWeatherComponent } from'./current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'current', component: CurrentWeatherComponent},
  {path: 'forecast', component: ForecastComponent}
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
