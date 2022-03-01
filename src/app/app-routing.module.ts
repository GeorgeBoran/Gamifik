import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './loguear/login/login.component';
import { RegisterComponent } from './registrar/register/register.component';
import { VisualizarRankingComponent } from './rankings/visualizar-ranking/visualizar-ranking.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'registro',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'pagina',
    component: PerfilUsuarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'ranking',
    component: VisualizarRankingComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
