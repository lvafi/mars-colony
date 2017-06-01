import { Injectable } from '@angular/core';
import { Alien } from '../models/alien';
import { Observable } from 'rxjs/Observable'; 
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { Report } from '../models/report';
   
@Injectable()
export class ReportService {
  private URL_ALIENS = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
  private ENCOUNTER_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
  constructor(private http: Http) { }
  report: Report;

  getData()  {
    return this.http.get(this.URL_ALIENS)
               .map(this.extract_Aliens);
  }
 extract_Aliens (res:Response) {
   const aliens = res.json();
   return aliens.aliens;
 }

postData(report: Report){
   const headers = new Headers({ 'Content-Type': 'application/json'});
   const options = new RequestOptions({ headers }); 
   return this.http.post(this.ENCOUNTER_URL, {encounter: report},options)
            .map(this.extractData);
  }
 extractData(res: Response) {
    const report = res.json();
    return report;
  }

}
