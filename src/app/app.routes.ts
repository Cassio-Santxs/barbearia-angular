import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { HorariolistComponent } from './components/horario/horariolist/horariolist.component';
import { HorariodetailsComponent } from './components/horario/horariodetails/horariodetails.component';
import { ClientedetailsComponent } from './components/cliente/clientedetails/clientedetails.component';
import { ClientelistComponent } from './components/cliente/clientelist/clientelist.component';
import { FormaPagamentodetailsComponent } from './components/formaPagamento/forma-pagamentodetails/forma-pagamentodetails.component';
import { FormaPagamentolistComponent } from './components/formaPagamento/forma-pagamentolist/forma-pagamentolist.component';
import { FuncionariodetailsComponent } from './components/funcionario/funcionariodetails/funcionariodetails.component';
import { FuncionariolistComponent } from './components/funcionario/funcionariolist/funcionariolist.component';
import { PagamentodetailsComponent } from './components/pagamento/pagamentodetails/pagamentodetails.component';
import { PagamentolistComponent } from './components/pagamento/pagamentolist/pagamentolist.component';
import { loginGuard } from './auth/login.guard';
import { CadastroComponent } from './components/layout/cadastro/cadastro.component'; // Importação corrigida
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { LogdetailsComponent } from './components/log/logdetails/logdetails.component';
import { LoglistComponent } from './components/log/loglist/loglist.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "cadastro", component: CadastroComponent  },
    { path: "cliente", component: PerfilClienteComponent, canActivate: [loginGuard], children: [
        { path: "perfil", component: ClientedetailsComponent },
        { path: "horarios", component: HorariolistComponent },
    ]}, 
    
    { path: "admin", component: PrincipalComponent, canActivate: [loginGuard], children: [
        { path: "dashboard", component: DashboardComponent },

        { path: "horarios", component: HorariolistComponent },
        { path: "horarios/new", component: HorariodetailsComponent },
        { path: "horarios/edit/:id", component: HorariodetailsComponent },

        { path: "clientes", component: ClientelistComponent },
        { path: "clientes/new", component: ClientedetailsComponent },
        { path: "clientes/edit/:id", component: ClientedetailsComponent },

        { path: "formaPagamento", component: FormaPagamentolistComponent },
        { path: "formaPagamento/new", component: FormaPagamentodetailsComponent },
        { path: "formaPagamento/edit/:id", component: FormaPagamentodetailsComponent },

        { path: "funcionario", component: FuncionariolistComponent },
        { path: "funcionario/new", component: FuncionariodetailsComponent },
        { path: "funcionario/edit/:id", component: FuncionariodetailsComponent },

        { path: "pagamento", component: PagamentolistComponent },
        { path: "pagamento/new", component: PagamentodetailsComponent },
        { path: "pagamento/edit/:id", component: PagamentodetailsComponent },

        { path: "log", component: LoglistComponent },
        { path: "log/new", component: LogdetailsComponent },
        { path: "log/edit/:id", component: LogdetailsComponent },
    ]}
];
