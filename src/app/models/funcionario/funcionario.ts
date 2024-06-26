import { Horario } from "../horario/horario";

export class Funcionario {
    idFuncionario?: number;
    nmFuncionario!: string;
    flFuncionario!: boolean;
    dsCpf!: string;
    dsEmail!: string;
    dsSenha!: string;
    horarios?: Horario[];
    role!:string;

    constructor(idFuncionario: number | undefined, nmFuncionario: string, flFuncionario: boolean, dsCpf: string, dsEmail: string, dsSenha: string, horarios?: Horario[]) {
        this.idFuncionario = idFuncionario;
        this.nmFuncionario = nmFuncionario;
        this.flFuncionario = flFuncionario;
        this.dsCpf = dsCpf;
        this.dsEmail = dsEmail;
        this.dsSenha = dsSenha;
        this.horarios = horarios;
    }
}
