import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorComponent } from '../error/error.component';
import { LoadingComponent } from '../loading/loading.component';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';

@Component({
  selector: 'app-search-box',
  imports: [NgIf, ErrorComponent, LoadingComponent, WeatherDetailsComponent],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  city = '';
  weatherData: any;
  loading = false;
  error = "";
  constructor(private http: HttpClient) {

  }

  getWeather() {
    this.loading = true
    const apiKey = 'ef2d17fd5f7aecd9194032fcf23e606e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;
    this.http.get(url).subscribe({
      next: (result: any) => {
        this.weatherData = result;
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

  onCityChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.city = value
  }
}
