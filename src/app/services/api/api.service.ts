import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { IAPIServerResponse } from 'src/app/interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class Api {
  url: string = 'http://localhost:3005';

  constructor(public http: HttpClient) {
    if (environment.production) {
      this.url = 'https://sellinbot.com/api';
    }
  }

  get<T>(endpoint: string, params?: any, reqOpts?: any, withCredentials=false) {
    let url = this.url + '/' + endpoint;
    if (endpoint.indexOf('http') == 0) {
      url = endpoint;
    }

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        // reqOpts.params.set(k, params[k]);
        reqOpts.params = reqOpts.params.append(k, params[k]);
      }
    }
    reqOpts.withCredentials = withCredentials
    return this.http.get<IAPIServerResponse<T>>(url);
  }

  post<T>(endpoint: string, body: any) {
    let url = this.url + '/' + endpoint;
    if (endpoint.indexOf('http') == 0) {
      url = endpoint;
    }
    return this.http.post<IAPIServerResponse<T>>(url, body);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    let url = this.url + '/' + endpoint;
    if (endpoint.indexOf('http') == 0) {
      url = endpoint;
    }
    return this.http.put(url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    let url = this.url + '/' + endpoint;
    if (endpoint.indexOf('http') == 0) {
      url = endpoint;
    }
    return this.http.delete(url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    let url = this.url + '/' + endpoint;
    if (endpoint.indexOf('http') == 0) {
      url = endpoint;
    }
    return this.http.put(url + '/' + endpoint, body, reqOpts);
  }
}