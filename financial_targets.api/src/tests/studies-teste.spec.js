import { expect } from "chai";

describe("Example", () => {
    let array;

    // roda todas as vezes, antes de CADA bloco
    beforeEach(() => {
        array = [1, 2, 3, 4, 5];
    });

    // descrição sobre os testes em um determinado espaço (função ou método)
    describe("Index", () => {
        // um caso de teste da aplicação
        context("Single Case", () => {
            // métodos utilizados para executar os testes
            it("Hellow World", () => {});

            // testar tipos ou se existe (smoke test)
            it("should be an array", () => {
                expect(array).to.be.a("array");
                // espero que o array
                // to.be = seja
                // a("array") = do tipo array
            });

            // deve ter no array 6 elementos quando um elemento for adicionado
            it("should have a size of 6 when push another value to the array", () => {
                array.push(6);
                expect(array).to.have.length(6);
                // expect = espero que no (array, objeto, variavel)
                // to.have = tenha
                // length(6) = o tamanho de 6
            });

            // não deve conter o valor 5 quando um item for removido do array
            it("should remove the value 5 when use pop in the array", () => {
                array.pop();
                expect(array).to.not.include(5);
                // espero que no array
                // to.not = não
                // include(5) = tenha incluso o valor 5
            });

            // deve ter um tamanho de 4 quando um valor for removido do array
            it("should have a size of 4 when pop a value from the array", () => {
                array.pop();
                expect(array).to.have.length(4);
            });
        });
    });
});
