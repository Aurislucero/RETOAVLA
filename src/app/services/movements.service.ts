import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { IMovements, InewArrayForMonth } from '../interfaces/movements';
@Injectable()
export class MovementsService {
  newArrayForMonth: InewArrayForMonth[] = []
  constructor(private _http: HttpClient) {
  }
  API = 'assets/mockup/movements.json';
  get(type: number, metric: string, year: string) {

    return this._http
      .get<any>(this.API)
      .pipe(
        map((data) => {
          return this.filterForTypeFamily(type, data, year, metric)
        })
      );
  }

  listYears() {
    return this._http
      .get<any>(this.API)
      .pipe(
        map((data) => {
          const years: string[] = []
          data.filter((element: any) => years.push(element.date.split("-")[0]));
          return Array.from(new Set(years));
        })
      );
  }

  listTypesOfFamily() {
    return this._http
      .get<any>(this.API)
      .pipe(
        map((data) => {
          const type: number[] = []
          data.filter((element: any) => type.push(element.family));
          return Array.from(new Set(type));
        })
      );
  }

  filter(type: number, metric: string, year: string) {
    this.newArrayForMonth = [];
    return this.get(type, metric, year)
  }

  sortedForMonth(data: IMovements[], metric: string) {
    this.newArrayForMonth = [];
    const sorted: any = {};
    data.forEach((e: IMovements) => {
      let lk = e.date.split("-")[1];
      sorted[lk] = sorted[lk] || [];
      sorted[lk].push(e);
    });


    for (let i = 1; i <= 12; i++) {
      if (sorted[this.newFormat(i)]) {
        let newObject: InewArrayForMonth = {
          month: this.convertFormatMonth(sorted[this.newFormat(i)]),
          operation: this.operation(sorted[this.newFormat(i)], metric)
        }
        this.newArrayForMonth.push(newObject)
      }
    }
    return { typeOperation: metric, data: this.newArrayForMonth }
  }

  filterForTypeFamily(type: number, data: IMovements[], year: string, metric: string) {
    const newData = data.filter((elem: IMovements) => elem.family === type && elem.date.split("-")[0] === year)
    return this.sortedForMonth(newData, metric)
  }


  convertFormatMonth(newsorted: any) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let f = newsorted[0].date;
    return months[new Date(f).getMonth()]//devuelve el mes en español
  }

  newFormat(index: number) {
    return (index < 10) ? '0' + index : index
  }

  operation(data: IMovements[], metric: string) {
    switch (metric) {
      case 'Total':
        return this.total(data)
        break;
      case 'Promedio':
        return this.prom(data)
        break;
      case 'Mínimo':
        return this.min(data)
        break;
      case 'Máximo':
        return this.max(data)
        break;
    }



  }
  total(data: IMovements[]) {
    return data.map((item: any) => item.amount).reduce((prev: any, curr: any) => prev + curr, 0);
  }

  prom(data: IMovements[]) {
    let sumatoria = data.map((item: any) => item.amount).reduce((prev: any, curr: any) => prev + curr, 0); //Pero si no encuentras nada o no hay siguiente, regresa 0
    return sumatoria / data.length;
  }
  min(data: IMovements[]) {
    return Math.min(...data.map(item => (item.amount < 0) ? item.amount = item.amount * -1 : item.amount));
  }
  max(data: IMovements[]) {
    return Math.max(...data.map(item => (item.amount < 0) ? item.amount = item.amount * -1 : item.amount));
  }


}
