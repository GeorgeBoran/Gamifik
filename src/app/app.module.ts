import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './loguear/login/login.component';
import { RegisterComponent } from './registrar/register/register.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RankingsModule } from './rankings/rankings.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompartidoModule } from './compartido/compartido.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RankingsModule,
    HttpClientModule,
    CompartidoModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
