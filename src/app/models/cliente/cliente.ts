import { Horario } from "../horario/horario";

export class Cliente {
    idCliente?: number;
    nmCliente!: string;
    dsCpf!: string;
    dsEmail!: string;
    dsSenha!: string;
    horarios?: Horario[];

    constructor(idCliente:number, nmCliente: string, dsCpf: string, dsEmail: string, dsSenha: string, horarios?: Horario[]) {
        this.idCliente = idCliente;
        this.nmCliente = nmCliente;
        this.dsCpf = dsCpf;
        this.dsEmail = dsEmail;
        this.dsSenha = dsSenha;
        this.horarios = horarios;
    }
}
