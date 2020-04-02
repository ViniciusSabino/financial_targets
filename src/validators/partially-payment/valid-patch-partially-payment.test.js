import { ERROR_CODES } from '../../utils/enums';
import validPatchPartiallyPayment from './valid-patch-partially-payment';

const nextMock = jest.fn();
const badRequestMock = jest.fn();

describe('validators', () => {
    describe('partially-payment', () => {
        describe('valid-patch-partially-payment', () => {
            it('deve seguir para o próximo middleware caso não possua erros na validação', () => {
                const ctxMock = {
                    request: {
                        body: {
                            id: '30390sasa1-',
                            amountPaid: 30,
                        },

                        badRequest: badRequestMock,
                    },
                };

                validPatchPartiallyPayment(ctxMock, nextMock);

                expect(badRequestMock).not.toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalled();
            });

            it('deve retornar ser chamado um "badRequest" quando id ou amountPaid não conter no body da requisição', () => {
                const ctxMock = {
                    request: {
                        body: {},
                    },

                    badRequest: badRequestMock,
                };

                validPatchPartiallyPayment(ctxMock, nextMock);

                expect(badRequestMock).toHaveBeenCalledWith([
                    ERROR_CODES.accountIdIsEmpty,
                    ERROR_CODES.amountPaidIsEmpty,
                ]);

                expect(nextMock).not.toHaveBeenCalled();
            });
        });
    });
});
