import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

// Autor: Roberto Cabrera C.
// Descripción:  

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: Timestamp | Date): string {
    if (value) {
      let date: Date;

      // Si es un Timestamp, lo convertimos a Date
      if (value instanceof Timestamp) {
        date = value.toDate();
      } 
      // Si es un Date, lo usamos directamente
      else if (value instanceof Date) {
        date = value;
      } 
      else {
        return '';
      }

      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return '';
  }

}
