import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class Users implements OnInit {
  users: any[] = [];

  name: string = '';
  email: string = '';
  userToDelete: number | null = null;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.cdr.detectChanges();
    });
  }

  createUser() {
    if (!this.name || !this.email) return;

    const user = {
      name: this.name,
      email: this.email,
    };

    this.userService.createUser(user).subscribe(() => {
      this.name = '';
      this.email = '';
      this.loadUsers();
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  askDelete(id: number) {
    this.userToDelete = id;
    this.errorMessage = '';
  }

  confirmDelete() {
    if (!this.userToDelete) return;

    this.userService.deleteUser(this.userToDelete).subscribe({
      next: () => {
        this.userToDelete = null;
        this.loadUsers();
        this.userToDelete = null;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error deleting user';

        this.cdr.detectChanges();
      },
    });
  }

  cancelDelete() {
    this.userToDelete = null;
    this.errorMessage = '';
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
