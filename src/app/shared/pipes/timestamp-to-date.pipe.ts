import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: Timestamp): string {
    if (value) {
      const date = value.toDate();
      const day = ('0' + date.getDate()).slice(-2); 
      const month = ('0' + (date.getMonth() + 1)).slice(-2); 
      const year = date.getFullYear();

      return `${day}/${month}/${year}`; 
    }
    return '';
  }

}
