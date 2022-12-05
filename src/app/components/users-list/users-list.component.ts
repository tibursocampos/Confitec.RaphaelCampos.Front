import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  user!: User;
  title: string = "Usuários";
  searchEmail!: string;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAll().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.searchEmail = "";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  searchByEmail(): void {
    this.usersService.getByEmail(this.searchEmail).subscribe({
      next: (user: User) => {
        let usersTemp: User[] = [];
        usersTemp.push(user);
        this.users = usersTemp;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 404) {
          alert('Usuário não encontrado com o email digitado.');
          this.loadUsers();
        }
      }
    });
  }

  editUser(userId: number) {
    this.router.navigate(['users', userId]);
  }

  removeUser(userId: number) {
    if (confirm("Deseja realmente apagar este usuário?")) {
      this.usersService.deleteById(userId).subscribe({
        next: (resp: boolean) => {
          console.log(resp);
        },
        error: (error: any) => {
          console.error(error)
        },
        complete: () => {
          alert("Usuário apagado com sucesso.");
          this.loadUsers();
        }
      });
    }
  }
}
