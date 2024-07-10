import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../interfaces/login/LoginRequest';
import { LoginResponse } from '../interfaces/login/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  private http = inject(HttpClient);

  login(obj: LoginRequest) {
    return this.http.post<LoginResponse>(this.apiUrl + 'Login', obj);
  }
}
