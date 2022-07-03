import { create, test, enforce, only } from "vest";

const suite = create((data = {}) => {
  test("name", "Preencha o campo de nome.", () => {
    enforce(data.name).isNotBlank();
  });

  test("name", "O nome não pode ter menos que 2 caracteres.", () => {
    enforce(data.name).longerThan(2);
  });

  test("email", "Preencha o campo de email.", () => {
    enforce(data.email).isNotBlank();
  });

  test("cpf", "Preencha o campo de cpf.", () => {
    enforce(data.cpf).isNotBlank();
  });

  test("celular", "Preencha o campo de celular.", () => {
    enforce(data.celular).isNotBlank();
  });

  test("cep", "Preencha o campo de cep.", () => {
    enforce(data.cep).isNotBlank();
  });

  test("endereco", "Preencha o campo de endereco.", () => {
    enforce(data.endereco).isNotBlank();
  });

  test("cidade", "Preencha o campo de cidade.", () => {
    enforce(data.cidade).isNotBlank();
  });

  test("estado", "Preencha o campo de estado.", () => {
    enforce(data.estado).isNotBlank();
  });
});

export default suite;
