import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskForm } from '../../components/task-form/task-form';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskForm, RouterModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks: any[] = [];
  users: any[] = [];
  filterStatus: string = '';
  taskToDelete: number | null = null;
  selectedTask: any = null;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res;
      this.cdr.detectChanges();
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  changeStatus(id: number, status: string) {
    this.taskService.changeStatus(id, status).subscribe(() => {
      this.loadTasks();
    });
  }

  filteredTasks() {
    if (!this.filterStatus) return this.tasks;
    return this.tasks.filter((t) => t.status === this.filterStatus);
  }

  askDelete(id: number) {
    this.taskToDelete = id;
  }

  confirmDelete() {
    if (!this.taskToDelete) return;

    this.taskService.deleteTask(this.taskToDelete).subscribe({
      next: () => {
        this.taskToDelete = null;
        this.loadTasks();
      },
      error: (err) => {
        alert(err.error?.error || 'Error deleting task');
        this.taskToDelete = null;
      },
    });
  }

  cancelDelete() {
    this.taskToDelete = null;
  }

  openTask(task: any) {
  this.selectedTask = task;
}

closeTask() {
  this.selectedTask = null;
}
}
