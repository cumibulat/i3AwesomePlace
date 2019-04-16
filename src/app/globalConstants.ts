import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants {
  defaultDateFormat: string = "DDD, DD-MMM-YYYY";

  reportBackgroundColor: Array<string> = 
    ['#CB16737F',
    '#17C1D87F',
    '#EDD3347F',
    '#0BBA917F',
    '#5B24897F',
    '#DB76317F',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'];

  reportBorderColor: Array<string> = 
    ['#94044E',
    '#127F90',
    '#BEA404',
    '#02755F',
    '#300159',
    '#8A3501',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'];
}