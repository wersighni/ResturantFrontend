import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GedService {
 //private apiUrl =  environment.urlBack
 constructor(private http: HttpClient) {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token,
  });

 }
  private apiUrl =  environment.urlBack
  private token: any;
  private headers: HttpHeaders;


  getInfoDoc(docId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/file/metadata/${docId}`,    );
  }
 

   upload(file: File, treeStructure: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('treeStructure', treeStructure);

    const req = new HttpRequest('POST', `${this.apiUrl}/file/`, formData, {
      headers: this.headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


download(docId:any): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/file/${docId}`, {
    

    responseType: 'blob'
  });
  
}


}
