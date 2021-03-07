import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDbServiceService {
  private documentsApiUrl = '/api/documents';

  constructor(private http: HttpClient) { }

  async getDocumentListByVerificationCode(verificationCode: string): Promise<any> {
    const params = new HttpParams().set('params', verificationCode);

    return this.http.get(this.documentsApiUrl, {params})
                    .toPromise()
                    .then(response => response)
                    .catch(this.error);
  }

  private error(error: any) {
    let message = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}

