import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private cookieService = inject(CookieService);
  private router = inject(Router);

  onLogOff() {
    this.cookieService.delete('ticketUser');
    this.router.navigateByUrl('login');
  }
}
