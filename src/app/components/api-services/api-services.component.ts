import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-api-services',
  imports: [NgIf],
  templateUrl: './api-services.component.html',
  styleUrl: './api-services.component.css'
})
export class ApiServicesComponent {
  userList:any[]=[];
  weatherList: any = {};
  city = '';
  weatherData: any;
  loading=false;
  error="";

  
  username = '';
  constructor(private http:HttpClient){

  }

  getUsers(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((result:any)=>{
      console.log(result);
      console.log("tik tok");
      this.userList=result
    })
  }


  getWeather() {
    const apiKey = 'ef2d17fd5f7aecd9194032fcf23e606e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;
    this.http.get(url).subscribe(data => {
      this.weatherData = data;
    });
  }

  getIconUrl(): string {
    return this.weatherData ? `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png` : '';
  }

  getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  // SearchWeather() {
  //   const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  //   const city = this.username;
  //   const apiKey = 'ef2d17fd5f7aecd9194032fcf23e606e';
  //   const units = 'metric';

  //   const url = `${apiUrl}?q=${city}&units=${units}&appid=${apiKey}`;

  //   this.http.get(url).subscribe((result: any) => {
  //     console.log(result)
  //     // this.weather.country = result.sys.country 
  //     // this.weather.name = result.name 
  //     // this.weather.temp = result.main.temp
  //     // this.weather.condition = result.weather[0].main
  //     this.weatherList=result      
  //     console.log(result); 
  //     console.log("Khin Khin Thant weather");// Your weather data
  //   });



  //   this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((result: any) => {
  //     console.log(result);
  //     console.log("tik tok");
  //     this.userList = result
  //   })
  // }


  SearchWeather() {
    this.loading=true
    this.error=""
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const city = this.username;
    const apiKey = 'ef2d17fd5f7aecd9194032fcf23e606e';
    const units = 'metric';

    if (!city) return;

    const url = `${apiUrl}?q=${city}&units=${units}&appid=${apiKey}`;

    this.http.get(url).subscribe({
      next: (result: any) => {
        console.log("ye yint aung");
        this.weatherList = result;
        this.loading = false,
        this.error = ""
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        this.loading = false
        this.error = err.message
      }
    });
  }

  

  

  onUsernameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log('Input event:', value);
    this.username=value
    this.city=value
  }
}
