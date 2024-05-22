export class FormaPagamento {

    idFormaPagto?: number;
    nmFormaPagto!: string;
    

    constructor(idFormaPagto:number, nmFormaPagto: string) {
        this.idFormaPagto = idFormaPagto;
        this.nmFormaPagto = nmFormaPagto;
       
    }
    
}
