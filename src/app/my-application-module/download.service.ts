import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private filePathUrl = '/api/files/pdf';

  constructor(private http: HttpClient) {}
  
  /*async downloadPdf(params: HttpParams): Promise<Observable<Blob>> { // getDocuments(): Promise<Array<IDocument>> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    

    /*return this.http.get<Blob>(this.filePathUrl, { headers: headers, responseType: 'blob' as 'json'});
  }*/

  downloadPdfByFilePath(url: string): Observable<Blob> {
    return this.http.get(this.filePathUrl, { responseType: 'blob'})
  }
}
