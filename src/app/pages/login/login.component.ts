import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../../interfaces/login/LoginRequest';
import { LoginResponse } from '../../interfaces/login/LoginResponse';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private masterService = inject(MasterService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  loginRequestObj: LoginRequest = {
    emailId: '',
    password: '',
  };

  onLogin() {
    this.masterService
      .login(this.loginRequestObj)
      .subscribe((res: LoginResponse) => {
        if (res.result) {
          this.cookieService.set('ticketUser', JSON.stringify(res.data));
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message);
        }
      });
  }
}
