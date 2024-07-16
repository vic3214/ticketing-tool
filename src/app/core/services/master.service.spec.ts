import { TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoginRequest } from '../interfaces/login/LoginRequest';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(MasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login credenciales incorrectas debe devolver wrong credentials', (done: DoneFn) => {
    const loginRequest: LoginRequest = {
      emailId: 'admin@gmail.com',
      password: 'admin1234',
    };

    service.login(loginRequest).subscribe((response) => {
      expect(response).toEqual({
        message: 'Wrong Credentials',
        result: false,
        data: null,
      });
      done();
    });
  });

  it('login credenciales correctas debe devolver los datos del usuario', (done: DoneFn) => {
    const loginRequest: LoginRequest = {
      emailId: 'admin@gmail.com',
      password: 'admin',
    };

    service.login(loginRequest).subscribe((response) => {
      expect(response).toEqual({
        message: '',
        result: true,
        data: {
          employeeId: 298,
          employeeName: 'admin',
          contactNo: '1122332233',
          emailId: 'admin@gmail.com',
          deptId: 161,
          password: 'admin',
          gender: 'male',
          role: 'Admin',
        },
      });
      done();
    });
  });
});
