import Joi from '@hapi/joi';

import validPatch from './valid-patch';
import getDynamicSchema from '../schemas/get-dynamic-schema';

const nextMock = jest.fn();
const badRequestMock = jest.fn((body) => body);

jest.mock('../schemas/get-dynamic-schema');

describe('Validators', () => {
    describe('Services', () => {
        describe('Valid Patch', () => {
            it('should validate the schema correctly and "next ()" be called', async () => {
                const ctxMock = {
                    request: {
                        params: { id: 1 },
                        body: {
                            name: 'new Name',
                            description: 'new Description',
                        },
                    },

                    badRequest: badRequestMock,
                };

                await validPatch(ctxMock, nextMock);

                expect(nextMock).toHaveBeenCalled();
                expect(badRequestMock).not.toHaveBeenCalled();
            });

            it('should return a badRequest when invalid fields are passed for the update', async () => {
                const ctxMock = {
                    request: {
                        params: { id: 1 },
                        body: {
                            name: 'New Name',
                            description: 'new Description',
                            invalid: 'Invalid Field',
                        },
                    },

                    badRequest: badRequestMock,
                };

                getDynamicSchema.mockImplementation(() => {
                    throw new Error('The following fields do not belong to an account: invalid');
                });

                await validPatch(ctxMock, nextMock);

                expect(nextMock).not.toHaveBeenCalled();
                expect(badRequestMock).toHaveBeenCalledWith(
                    Error('The following fields do not belong to an account: invalid')
                );
            });

            it('should return a badRequest when the passed schema is invalid', async () => {
                const ctxMock = {
                    request: {
                        params: { id: 1 },
                        body: {
                            name: 'ab', // invalid (min 3)
                            description: 'new Description',
                        },
                    },

                    badRequest: badRequestMock,
                };

                getDynamicSchema.mockImplementation(() => ({
                    name: Joi.string()
                        .min(3)
                        .max(20)
                        .required(),
                    description: Joi.string()
                        .max(40)
                        .optional(),
                }));

                await validPatch(ctxMock, nextMock);

                expect(nextMock).not.toHaveBeenCalled();
                expect(badRequestMock).toHaveBeenCalledWith(
                    Error('"name" length must be at least 3 characters long')
                );
            });
        });
    });
});
