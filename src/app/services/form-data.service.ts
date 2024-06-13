import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  formdata: any;
  constructor() {
    this.formdata = [];
  }
  getData() {
    return this.formdata;
  }
  addData(data: any) {
    this.formdata.push(data);
  }
}
