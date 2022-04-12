import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/authGuard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'authsignin',
    component: SigninComponent,
    canDeactivate: [AuthGuardService],
  },
  {
    path: 'authsignup',
    component: RegisterComponent,
    canDeactivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    SigninComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
