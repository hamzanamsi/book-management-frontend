import { Component } from '@angular/core';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'book-management-frontend';
  currentView: 'login' | 'register' = 'login';
  constructor(private authService: AuthService, private router: Router) {}

  showLogin() {
    this.currentView = 'login';
  }

  showRegister() {
    this.currentView = 'register';
  }

  ngOnInit(): void {
    this.authService.autoLogout();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  logout(): void {
    this.authService.logout();
  }
  isBooksManagementPage(): boolean {
    return this.router.url.includes('/books-management');
  }
}
