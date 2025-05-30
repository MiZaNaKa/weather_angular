import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  imports: [NgIf],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent {
  @Input() weatherData: any;

  getIconUrl(): string {
    return this.weatherData
      ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
      : '';
  }

  getFlagEmoji(countryCode: string): string {
    return countryCode
      ? countryCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(127397 + char.charCodeAt(0))
        )
      : '';
  }
}