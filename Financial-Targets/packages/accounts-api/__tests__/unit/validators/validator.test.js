import moment from "moment";

import context from "../../../src/api/__mocks__/context";
import validator from "../../../src/api/validators/accounts";
import { account, accountEmpty } from "../../../src/api/utils/test/get-account";
import { getCurrentDate } from "../../../src/api/utils/functions/dates";

jest.mock("../../../src/api/utils/functions/dates", () => ({
    getCurrentDate: jest.fn(),
}));

beforeEach(() => {
    context.response.status = 200;
    context.response.message = "Ok";
});

describe("Validator", () => {
    describe("POST -> /account, Create Account", () => {
        it("should return status 400 and an array of errors when an invalid account is registered", async () => {
            const ctx = {
                ...context,
                request: {
                    body: accountEmpty,
                },
            };

            const next = jest.fn(() => ctx);

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validCreate(ctx, next);

            const NUMBER_OF_FIELDS = 6; // register acccount
            const ERROR_STATUS_CODE = 400;

            expect(ctx.response.status).toEqual(ERROR_STATUS_CODE);
            expect(ctx.response.message.errors.length).toEqual(NUMBER_OF_FIELDS);
        });

        it("should return an account without a request body", async () => {
            const ctx = {
                ...context,
                request: {
                    body: account,
                },
            };

            const next = jest.fn(() => ctx);

            await validator.validCreate(ctx, next);

            const OK_STATUS_CODE = 200;
            const NUMBER_OF_FIELDS = 11; // validated account

            expect(ctx.response.status).toEqual(OK_STATUS_CODE);
            expect(ctx.state).toHaveProperty("name", "Spotify");
            expect(Object.keys(ctx.state).length).toEqual(NUMBER_OF_FIELDS);
        });

        it("should return the 'DONE' status when the amount paid is equal to the value of the account", async () => {
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

            const next = jest.fn(() => ctx);

            await validator.validCreate(ctx, next);

            expect(ctx.state.status).toEqual("DONE");
        });

        it("should return 'EXPIRED' status when the payment date is less than the current date", async () => {
            const ctx = {
                ...context,
                request: {
                    body: account,
                },
            };

            const next = jest.fn(() => ctx);

            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-05-09T03:24:00.000")).format()
            );

            await validator.validCreate(ctx, next);

            expect(ctx.state.status).toEqual("EXPIRED");
        });

        it("should return 'PENDING' status when registering a monthly fee and it is not yet paid", async () => {
            const ctx = {
                ...context,
                request: {
                    body: account,
                },
            };

            const next = jest.fn(() => ctx);

            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-05-01T03:24:00.000")).format()
            );

            await validator.validCreate(ctx, next);

            expect(ctx.state.status).toEqual("PENDING");
        });
    });

    describe("GET -> /accounts, Filter and List Accounts", () => {
        it("should have the user id before listing accounts", async () => {
            const ctx = {
                ...context,
                request: {
                    header: {
                        userid: 1,
                    },
                },
            };

            const next = jest.fn(() => ctx);

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

            const next = jest.fn(() => ctx);

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

            const next = jest.fn(() => ctx);

            ctx.badRequest = (payload) => {
                ctx.response.message = payload;
                ctx.response.status = 400;
            };

            await validator.validEdit(ctx, next);

            expect(ctx.response.status).toEqual(400);
            expect(ctx.response.message.errors.length).toEqual(7);
        });

        it("should return a bad request if the account date is changed to less than current date", async () => {
            // dueDate Mock = 2019-05-06T16:54:37-02:00

            const ctx = {
                ...context,
                request: {
                    body: account,
                },
            };

            const next = jest.fn(() => ctx);

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

        it("should update status to pendind in edit", async () => {
            // dueDate Mock = 2019-05-06T16:54:37-02:00

            const ctx = {
                ...context,
                request: {
                    body: { ...account, _id: 1, amountPaid: 399, value: 400 },
                },
            };

            const next = jest.fn(() => ctx);

            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-05-01T03:24:00.000")).format()
            );

            await validator.validEdit(ctx, next);

            // CONDITION 1: dueDate > currentDate AND amountPaid < value
            expect(ctx.request.body.status).toEqual("PENDING");
        });

        it("should update status to expired in edit", async () => {
            const ctx = {
                ...context,
                request: {
                    body: { ...account, _id: 1, amountPaid: 399, value: 400 },
                },
            };

            const next = jest.fn(() => ctx);

            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-05-10T03:24:00.000")).format()
            );

            await validator.validEdit(ctx, next);

            // CONDITION 2: dueDate < currentDate AND amountPaid < value
            expect(ctx.request.body.status).toEqual("EXPIRED");
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

            const next = jest.fn(() => ctx);

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

            const next = jest.fn(() => ctx);

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
