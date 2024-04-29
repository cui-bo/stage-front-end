import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  options = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Accept', 'application/pdf'),
    responseType: 'blob' as 'json'
  };

  constructor(protected http: HttpClient) {
  }

  public getPdf() {
    return this.http.get<ArrayBuffer>('http://localhost:8000/api/v1/reporting/pdf', this.options);
  }
}
