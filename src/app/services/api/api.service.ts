import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from './models/http-options';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) {}

  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this._httpClient.get<T>(`${environment.apiUrl}${url}`, options)
  }

  post<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
    return this._httpClient.post<T>(`${environment.apiUrl}${url}`, body, options);
  }

  put<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
    return this._httpClient.put<T>(`${environment.apiUrl}${url}`, body, options);
  }

  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this._httpClient.delete<T>(`${environment.apiUrl}${url}`, options);
  }

  getHttpOptions<T>(params: T): HttpOptions {
    const httpParams = new HttpParams();

    return {
      // @ts-ignore
      params: httpParams.appendAll(params)
    }
  }
}
