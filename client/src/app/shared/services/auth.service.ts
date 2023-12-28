import { Injectable } from '@angular/core';
import { Patient, User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../modal/confim-logout/confim-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}
/*
  register(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>('/api/auth/register', patient);
  }*/

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
  logout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setToken(null);
        localStorage.clear();
      }
    });
  }

  openLogoutConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setToken(null);
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
