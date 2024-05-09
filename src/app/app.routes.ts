import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LivroslistComponent } from './components/livro/livroslist/livroslist.component';
import { EditoraslistComponent } from './components/editora/editoraslist/editoraslist.component';
import { AutoreslistComponent } from './components/autor/autoreslist/autoreslist.component';
import { LivrosdetailsComponent } from './components/livro/livrosdetails/livrosdetails.component';
import { EditorasdetailsComponent } from './components/editora/editorasdetails/editorasdetails.component';
import { AutoresdetailsComponent } from './components/autor/autoresdetails/autoresdetails.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "admin", component: PrincipalComponent, children: [
        {path:"livros", component: LivroslistComponent},
        {path:"editoras", component: EditoraslistComponent},
        {path:"autores", component: AutoreslistComponent},
        {path: "livros/new", component: LivrosdetailsComponent},
        {path: "livros/edit/:id", component: LivrosdetailsComponent},
        {path: "editoras/new", component: EditorasdetailsComponent},
        {path: "editoras/edit/:id", component: EditorasdetailsComponent},
        {path: "autores/new", component: AutoresdetailsComponent},
        {path: "autores/edit/:id", component: AutoresdetailsComponent},
    ]}
];
