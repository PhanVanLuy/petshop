import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

    compare(numberFirst: number, numberSecond: number) {
        if (numberFirst === null) {
            numberFirst = 0;
        }
        if (numberSecond === null) {
            numberSecond = 0;
        }
        if (numberFirst > numberSecond) {
            return -1;
        }

        if (numberFirst < numberSecond) {
            return 1;
        }
        return 0;
    }
}
