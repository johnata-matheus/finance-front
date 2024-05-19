import { Component, OnInit } from '@angular/core';
import { HeaderAuthComponent } from '../components/header-auth/header-auth.component';
import { GoogleAuthComponent } from '../components/google-auth/google-auth.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SeparationAuthComponent } from '../components/separation-auth/separation-auth.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../models/Login';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderAuthComponent, GoogleAuthComponent, ButtonComponent, SeparationAuthComponent, GoogleAuthComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormulario();
  }

  loginFormulario() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  fazerLogin() {
    if (this.formLogin.invalid) {
      return;
    }

    this.authService.login(this.formLogin.getRawValue()).subscribe({
      next: (value) => {
        this.router.navigate(['/dashboard']);
        console.log(value);
      },
      error: () => this.toastService.error("Usuário ou senha inválidas", '', { timeOut: 3000, progressBar: true })
    });
  }

}
