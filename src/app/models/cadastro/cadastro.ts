import { Horario } from "../horario/horario";
// parte usada como espelho do back end utilizado para armanezenar no banco de dados
export class Cadastro {
    idCliente?: number;
    nmCliente!: string;
    dsCpf!: string;
    dsEmail!: string;
    dsSenha!: string;
    horarios?: Horario[];
    username?: string;
    role?: string;

    constructor(idCliente:number, nmCliente: string, dsCpf: string, dsEmail: string, dsSenha: string, horarios?: Horario[], username?: string, role?: string) {
        this.idCliente = idCliente;
        this.nmCliente = nmCliente;
        this.dsCpf = dsCpf;
        this.dsEmail = dsEmail;
        this.dsSenha = dsSenha;
        this.username = username;
        this.role = role;
        this.horarios = horarios;
       
    }
}
