import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDocument, Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDbServiceService {
  private documentsUrl = '/api/documents';

  constructor(private http: HttpClient) { }

  // Get documents
  getDocuments(myDocument: Object): Promise<any> { // getDocuments(): Promise<Array<IDocument>> {
    return this.http.post(this.documentsUrl, myDocument)
                    .toPromise()
                    .then(response => response)
                    .catch(this.error);
  }
  
  private error(error: any) {
    let message = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}

