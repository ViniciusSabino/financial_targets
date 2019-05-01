import moment from "moment";

import context from "../../../src/api/__mocks__/context";
import validator from "../../../src/api/validators/accounts";
import { account, accountEmpty } from "../../../src/api/utils/test/get-account";
import { getCurrentDate } from "../../../src/api/utils/functions/dates";

jest.mock("../../../src/api/utils/functions/dates", () => ({
    getCurrentDate: jest.fn(),
}));

describe("Validator", () => {
    describe("POST -> /account", () => {
        it("should return status 400 and an array of errors when an invalid account is registered", async () => {
            const ctx = {
                ...context,
                request: {
                    body: accountEmpty,
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validCreate(ctx, next);

            expect(ctx.response.status).toEqual(400);
            expect(ctx.response.message.errors.length).toEqual(6);
        });

        it("should return an account without a request body", async () => {
            const ctx = {
                ...context,
                request: {
                    body: account,
                },
            };

            ctx.response.status = 200;
            ctx.response.message = "Ok";

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot({
                    ...ctx,
                    response: {
                        ...ctx.response,
                        status: 200,
                        message: "Ok",
                    },
                });
            });

            await validator.validCreate(ctx, next);

            expect(ctx.response.status).not.toEqual(400);
        });

        it("should return the done status when the amount paid is equal to the value of the account", async () => {
            const ctx = {
                ...context,
                request: {
                    body: {
                        ...account,
                        amountPaid: 100,
                        value: 100,
                    },
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            await validator.validCreate(ctx, next);

            expect(ctx.request.body.status).toEqual("DONE");
        });

        it("should return expired status when the payment date is less than the current date", async () => {
            const ctx = {
                ...context,
                request: {
                    body: {
                        ...account,
                    },
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-05-09T03:24:00.000")).format()
            );

            await validator.validCreate(ctx, next);

            expect(ctx.request.body.status).toEqual("EXPIRED");
        });
    });

    describe("GET -> /accounts and /account/all", () => {
        it("should have the user id before listing accounts", async () => {
            const ctx = {
                ...context,
                request: {
                    header: {
                        userid: 1,
                    },
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            await validator.validList(ctx, next);

            expect(ctx.request.header.userid).toEqual(1);
        });

        it("should return a bad request otherwise have the id of the user before listing", async () => {
            const ctx = {
                ...context,
                request: {
                    header: {
                        userid: 0,
                    },
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validList(ctx, next);

            expect(ctx.response.status).toEqual(400);
            expect(ctx.response.message.errors.length).toEqual(1);
        });
    });

    describe("PUT -> /accounts", () => {
        it("should return status 400 and an array of errors when an invalid account is edit", async () => {
            const ctx = {
                ...context,
                request: {
                    body: accountEmpty,
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validEdit(ctx, next);

            expect(ctx.response.status).toEqual(400);
            expect(ctx.response.message.errors.length).toEqual(7);
        });

        it("should return a bad request if the account date is changed to less than current date", async () => {
            const ctx = {
                ...context,
                request: {
                    body: account,
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-05-09T03:24:00.000")).format()
            );

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validEdit(ctx, next);

            expect(ctx.response.status).toEqual(400);
            expect(ctx.response.message.errors.length).toEqual(1);
        });
    });

    describe("PATCH -> /accounts/makepartialpayment", () => {
        it("should have the acount id before make partial payments", async () => {
            const ctx = {
                ...context,
                request: {
                    body: {
                        accountId: 1,
                    },
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            await validator.validMakePartialPayment(ctx, next);

            expect(ctx.request.body.accountId).toEqual(1);
        });

        it("should return a bad request otherwise have the id of the account before make partial payments", async () => {
            const ctx = {
                ...context,
                request: {
                    body: {
                        accountId: 0,
                    },
                },
            };

            const next = jest.fn(() => {
                expect(ctx).toMatchSnapshot();
            });

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validMakePartialPayment(ctx, next);

            expect(ctx.response.status).toEqual(400);
            expect(ctx.response.message.errors.length).toEqual(1);
        });
    });
});
