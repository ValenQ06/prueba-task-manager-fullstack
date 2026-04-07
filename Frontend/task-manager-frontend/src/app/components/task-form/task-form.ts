import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  @Output() taskCreated = new EventEmitter<void>();

  form!: FormGroup;
  users: any[] = [];
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      userId: ['', Validators.required],
      extraData: [''],
    });

    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  submit() {
    if (this.form.invalid) return;

    const formValue = { ...this.form.value };

    if (!formValue.extraData) {
      formValue.extraData = null;
    }

    this.taskService.createTask(formValue).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully ✔️';
        this.form.reset();
        this.taskCreated.emit();

        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => {
        console.error(err);
        this.successMessage = err.error?.error || 'Error creating task ❌';
      },
    });
  }

}
