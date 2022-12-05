import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Schooling, SchoolingLabel } from 'src/app/models/enuns/schooling';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = new User();
  userObservable: Observable<User> | undefined;
  userId!: number;
  schooling = Schooling;
  schoolingList: string[] = [];
  form: FormGroup = new FormGroup("");
  submitted = false;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadSchooling();
    this.route.params.subscribe((params: Params) => this.userId = params['userId']);
    this.loadForm();
    this.usersService.getById(this.userId).subscribe({
      next: (user: User) => {
        this.userEdit(user);
      }
    });
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

  loadForm() {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      userEmail: [''],
      userBirthdayDate: [''],
      schooling: ['']
    });
  }

  userEdit(user: User) {
    this.form.setValue({
      firstName: [user.firstName],
      lastName: [user.lastName],
      userEmail: [user.userEmail],
      userBirthdayDate: [user.userBirthdayDate],
      schooling: [SchoolingLabel.get(this.schooling[user.schooling])]
    });
  }

  saveUser() {
    const user: User = this.form.value;
    this.usersService.update(user).subscribe({
      next: (response: User) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        alert("Usuário atualizado.");
        this.form.reset();
        this.router.navigate(['users']);
      }
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

  resetForm() {
    this.form.reset();
  }

  backToUsers() {
    this.router.navigate(['users']);
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
