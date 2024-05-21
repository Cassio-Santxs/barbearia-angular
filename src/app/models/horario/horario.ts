import { Cliente } from "../cliente/cliente";
import { Funcionario } from "../funcionario/funcionario";

export class Horario {
  idHorario!: number;
  dtHorario!: string;
  cliente!: Cliente;
  funcionario!: Funcionario;
  vlHorario!: number;

    constructor(idHorario: number, dtHorario: string, cliente: Cliente, funcionario: Funcionario, vlHorario: number) {
        this.idHorario = idHorario;
        this.dtHorario = dtHorario;
        this.dtHorario = dtHorario;
        this.cliente = cliente;
        this.funcionario = funcionario;
        this.vlHorario = vlHorario;
      }
}
