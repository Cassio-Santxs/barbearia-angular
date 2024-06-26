import { Cliente } from './cliente';

describe('Cliente', () => {
  it('should create an instance', () => {
    expect(new Cliente(1,'Nome do Cliente','123.456.789-00','cliente@email.com','senhaDoCliente',)).toBeTruthy();
  });
});
