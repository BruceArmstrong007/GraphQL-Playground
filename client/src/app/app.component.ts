import {
  CreateUserGQL,
  GetUserDocument,
  GetUserGQL,
} from './../generated-types';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CreateUserGQL, GetUserGQL, Apollo],
})
export class AppComponent {
  title = 'hello';


  // Testing GraphQL API for Query and Mutation

  constructor(
    private readonly createUser: CreateUserGQL,
    private readonly getUser: GetUserGQL
  ) {
    let email = 'bruce.armstrong9@gmail.com',
      name = 'Bruce Armstrong',
      username = 'brucearmstrong09',
      password = 'bruce123213';
    this.createUser
      .mutate({ createUserInput: { email, password, username, name } })
      .subscribe((res) => {
        console.log(res);
      });

    const _id = '653bab8f4fedde9989a0be4f';
    this.getUser.watch({ _id }).valueChanges.subscribe((res) => {
      console.log(res);
    });
  }
}
