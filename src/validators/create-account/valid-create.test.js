import accountSchema from '../schemas/account-schema';
import { validSaveAccount } from '../shared';
import validCreate from './valid-create';
import { ERROR_CODES } from '../../utils/enums';

jest.mock('../schemas/account-schema');
jest.mock('../shared', () => ({
    validSaveAccount: jest.fn(),
}));

const nextMock = jest.fn();
const badRequestMock = jest.fn((body) => body);

const ctxMock = {
    request: {
        body: {
            name: 'Meu Vivo',
            description: 'Smartphone',
            // ...
        },
    },

    badRequest: badRequestMock,
};

describe('validators', () => {
    describe('create-account', () => {
        describe('valid-create', () => {
            it('deve retornar um badRequest caso ocorra um erro na validação do schema', async () => {
                const errorMessage = 'error occurred in the validation of the schema';

                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.reject(errorMessage));

                const response = await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validSaveAccount).not.toHaveBeenCalled();
                expect(nextMock).not.toHaveBeenCalled();
                expect(badRequestMock).toHaveBeenCalledWith(errorMessage);
                expect(response).toEqual(errorMessage);
            });

            it('deve retornar um badRequest quando ocorrer um erro nas validações nas regras de criação', async () => {
                const errorsMock = [
                    ERROR_CODES.dueDateIsInvalid,
                    ERROR_CODES.amountPaidIsEmpty,
                    ERROR_CODES.accountIsNotPaidYet,
                ];

                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.resolve());

                validSaveAccount.mockImplementation(() => errorsMock);

                const response = await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validSaveAccount).toHaveBeenCalledWith(ctxMock.request.body);
                expect(nextMock).not.toHaveBeenCalledWith();
                expect(badRequestMock).toHaveBeenCalledWith(errorsMock);
                expect(response).toEqual(errorsMock);
            });

            it('deve "next" ser chamado para seguir o fluxo para o proximo middleware', async () => {
                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.resolve());

                validSaveAccount.mockImplementation(() => []);

                await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validSaveAccount).toHaveBeenCalledWith(ctxMock.request.body);
                expect(nextMock).toHaveBeenCalled();
                expect(badRequestMock).not.toHaveBeenCalled();
            });
        });
    });
});
