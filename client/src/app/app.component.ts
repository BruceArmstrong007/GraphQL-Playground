import {
  CreateUserGQL,
  GetUserGQL,
  UpdateUserGQL,
  UserUpdatedGQL,
} from './../generated-types';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';

interface UserUpdatedData {
  userUpdated: {
    _id: string;
    email: string;
    username: string;
    name: string;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CreateUserGQL, GetUserGQL, UpdateUserGQL, UserUpdatedGQL, Apollo],
})
export class AppComponent {
  title = 'hello';

  // Testing GraphQL API for Query and Mutation

  constructor(
    private readonly createUser: CreateUserGQL,
    private readonly getUser: GetUserGQL,
    private readonly updateUser: UpdateUserGQL,
    private readonly userUpdated: UserUpdatedGQL
  ) {
    let email = 'bruce.armstrong9@gmail.com',
      name = 'Bruce Armstrong',
      username = 'brucearmstrong5678',
      password = 'bruce123213';
    const _id = '653bab8f4fedde9989a0be4f';

    // this.createUser
    //   .mutate({ createUserInput: { email, password, username, name } })
    //   .subscribe((res) => {
    //     console.log(res);
    //   });

    this.getUser.watch({ _id }).valueChanges.subscribe((res) => {
      console.log(res);
    });

    const sub = this.userUpdated;
    console.log(sub.document);

    (name = 'Bruce Armstrong'),
      (username = 'brucearmstrong5678'),
      this.updateUser
        .mutate({ updateUserInput: { _id, username, name } })
        .subscribe((res) => {
          console.log(res);
        });
  }
}
