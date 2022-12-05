import { Schooling, SchoolingLabel } from './../../models/enuns/schooling';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  user: User = new User();
  schooling = Schooling;
  schoolingList: string[] = [];
  form: FormGroup = new FormGroup("");
  submitted = false;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) { this.createForm() }

  ngOnInit(): void {
    this.loadSchooling();
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        userEmail: ['', [Validators.required, Validators.email]],
        userBirthdayDate: ['', [Validators.required]],
        schooling: ['', [Validators.required]],
      }
    );
  }

  get fcontrol(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      userEmail: [''],
      userBirthdayDate: [''],
      schooling: ['']
    });
  }

  loadSchooling() {
    for (let index = 0; index < 4; index++) {
      let label = SchoolingLabel.get(this.schooling[index]);
      if (label) {
        this.schoolingList.push(label);
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;
    const user: User = this.form.value;
    this.usersService.create(user).subscribe({
      next: (response: User) => {
        console.log(response)
        this.submitted = true
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        alert("Usuário adicionado com sucesso.");
        this.onReset();
      }
    });
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
