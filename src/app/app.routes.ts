import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { HorariolistComponent } from './components/horario/horariolist/horariolist.component';
import { HorariodetailsComponent } from './components/horario/horariodetails/horariodetails.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "admin", component: PrincipalComponent, children: [
        {path: "horarios", component: HorariolistComponent},
        {path: "horarios/new", component: HorariodetailsComponent},
        {path: "horarios/edit/:id", component: HorariodetailsComponent},
    ]}
];
