import accountSchema from '../schemas/account-schema';
import { validCreateRules } from '../shared';
import validCreate from './valid-create';
import { ERROR_CODES } from '../../utils/enums';

jest.mock('../schemas/account-schema');
jest.mock('../shared');

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

describe('Validators', () => {
    describe('Create', () => {
        describe('Valid Create', () => {
            it('should return a "badRequest" in case of an error in the schema validation', async () => {
                const errorMessage = 'error occurred in the validation of the schema';

                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.reject(errorMessage));

                const response = await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validCreateRules).not.toHaveBeenCalled();
                expect(nextMock).not.toHaveBeenCalled();
                expect(badRequestMock).toHaveBeenCalledWith(errorMessage);
                expect(response).toEqual(errorMessage);
            });

            it('shoud return a "badRequest" when an error occurs in the validations in the creation rules', async () => {
                const errorsMock = [
                    ERROR_CODES.dueDateIsInvalid,
                    ERROR_CODES.amountPaidIsEmpty,
                    ERROR_CODES.accountIsNotPaidYet,
                ];

                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.resolve());

                validCreateRules.mockImplementation(() => errorsMock);

                const response = await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validCreateRules).toHaveBeenCalledWith(ctxMock.request.body);
                expect(nextMock).not.toHaveBeenCalledWith();
                expect(badRequestMock).toHaveBeenCalledWith(errorsMock);
                expect(response).toEqual(errorsMock);
            });

            it('should "next" be called to follow the flow if successful', async () => {
                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.resolve());

                validCreateRules.mockImplementation(() => []);

                await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validCreateRules).toHaveBeenCalledWith(ctxMock.request.body);
                expect(nextMock).toHaveBeenCalled();
                expect(badRequestMock).not.toHaveBeenCalled();
            });
        });
    });
});
