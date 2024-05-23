import { FormaPagamento } from "../formaPagamento/forma-pagamento";
import { Horario } from "../horario/horario";

export class Pagamento {
    idPagamento!: number;
    dtPagamento!: string;
    horario!: Horario;
    formaPagamento!: FormaPagamento;
    dsSituacao!:string;

    constructor(idPagamento: number, dtPagamento: string, horario: Horario, formaPagamento: FormaPagamento, dsSituacao: string) {
        this.idPagamento = idPagamento;
        this.dtPagamento = dtPagamento;
        this.horario = horario;
        this.formaPagamento = formaPagamento;
        this.dsSituacao = dsSituacao;
    }
}
