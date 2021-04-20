import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private filePathApiUrl = '/api/files/pdf';

  constructor(private http: HttpClient) {}

  async getFileByFilePath(filePath: string): Promise<any> {
    const params = new HttpParams().set('params', filePath);
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');

    return this.http.get(this.filePathApiUrl, {headers, params, responseType: 'blob' as 'json'})
                                                      .toPromise()
                                                      .then(response => response)
                                                      .catch(this.error);;
  }

  private error(error: any) {
    let message = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
