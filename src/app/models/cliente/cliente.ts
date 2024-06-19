import { Horario } from "../horario/horario";

export class Cliente {
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
        this.horarios = horarios;
        this.username = username;
        this.role = role;
    }
}
