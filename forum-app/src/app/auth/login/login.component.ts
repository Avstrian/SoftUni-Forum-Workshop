import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

const myRequired = (control: AbstractControl) => {
  //console.log('validator called');
  return Validators.required(control);
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage?: string;

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', { validators: [myRequired, emailValidator], updateOn: 'submit' }),
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {

    // this.loginFormGroup.get('email')?.valueChanges.subscribe(value => {
    //   console.log('email changed', value);
    // })
  }

  loginHandler(): void {
    //TODO validate user's data.
    // this.userService.login();
    // this.router.navigate(['/home'])

    console.log('Fromclickhandler', this.loginFormGroup.value);
  }

  handleLogin(): void {
    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: user => {
        console.log(user)
        this.router.navigate(['/home']);

        this.messageBus.notifyForMessage({ 
          text: 'User is successfully logged in!', 
          type: MessageType.Success
        });
      },
      complete: () => {
        console.log('login completed');
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
    //console.log('FromNgSubmit', this.loginFormGroup.value);

  }

}
