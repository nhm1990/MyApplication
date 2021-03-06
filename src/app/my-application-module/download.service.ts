import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private filePathApiUrl = '/api/files/pdf';

  constructor(private http: HttpClient) {}

  async getFileByFilePath(filePath: string): Promise<Observable<Blob>> {
    console.log("TEMPTESTNH3643643 filePath: " + filePath);
    const params = new HttpParams().set('params', filePath);
    //const headers = new HttpHeaders();
    //headers.set('Accept', 'application/pdf');

    return this.http.get(this.filePathApiUrl, {params: params, responseType: 'blob'});
  }
}
