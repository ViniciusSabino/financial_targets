import accountSchema from '../schemas/account-schema';
import { validSaveRules } from '../shared';
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

const ACTION = 'create';

describe('Validators', () => {
    describe('Services', () => {
        describe('Valid Create', () => {
            it('should return a "badRequest" in case of an error in the schema validation', async () => {
                const errorMessage = 'error occurred in the validation of the schema';

                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.reject(errorMessage));

                const response = await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validSaveRules).not.toHaveBeenCalled();
                expect(nextMock).not.toHaveBeenCalled();
                expect(badRequestMock).toHaveBeenCalledWith(errorMessage);
                expect(response).toEqual(errorMessage);
            });

            it('shoud return a "badRequest" when an error occurs in the validations in the creation rules', async () => {
                const errorsMock = {
                    errors: [
                        ERROR_CODES.dueDateIsInvalid,
                        ERROR_CODES.amountPaidIsEmpty,
                        ERROR_CODES.accountIsNotPaidYet,
                    ],
                    action: 'test',
                };

                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.resolve());

                validSaveRules.mockImplementation(() => errorsMock);

                const response = await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validSaveRules).toHaveBeenCalledWith(ctxMock.request.body, ACTION);
                expect(nextMock).not.toHaveBeenCalledWith();
                expect(badRequestMock).toHaveBeenCalledWith(errorsMock);
                expect(response).toEqual(errorsMock);
            });

            it('should "next" be called to follow the flow if successful', async () => {
                const validateAsyncMock = jest
                    .spyOn(accountSchema, 'validateAsync')
                    .mockImplementation(() => Promise.resolve());

                validSaveRules.mockImplementation(() => ({ errors: [], action: ACTION }));

                await validCreate(ctxMock, nextMock);

                expect(validateAsyncMock).toHaveBeenCalledWith(ctxMock.request.body);
                expect(validSaveRules).toHaveBeenCalledWith(ctxMock.request.body, ACTION);
                expect(nextMock).toHaveBeenCalled();
                expect(badRequestMock).not.toHaveBeenCalled();
            });
        });
    });
});
