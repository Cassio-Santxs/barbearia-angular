export class Log {
    idLog?: number;
    vlAntigo!: string;
    vlNovo!: string;
    dsTabela!: string;
    dtAlteracao!: string;
    dsEmailUsuario!: string;

    constructor(idLog: number | undefined, vlNovo: string, vlAntigo: string, dtAlteracao: string, dsEmailUsuario: string, dsTabela: string) {
        this.idLog = idLog;
        this.vlNovo = vlNovo;
        this.vlAntigo = vlAntigo;
        this.dtAlteracao = dtAlteracao;
        this.dsEmailUsuario = dsEmailUsuario;
        this.dsTabela = dsTabela;
    }
}
