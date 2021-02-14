import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDocument } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDbServiceService {
  private documentsUrl = '/api/documents';

  constructor(private http: HttpClient) { }

  // Get documents
  get(): Promise<any> { // get(): Promise<Array<IDocument>> {
    return this.http.get(this.documentsUrl)
                    .toPromise()
                    .then(response => response)
                    .catch(this.error);
  }
  
  private error(error: any) {
    let message = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}

