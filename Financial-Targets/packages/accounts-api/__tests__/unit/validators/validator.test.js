import validator from "../../../src/api/validators/accounts";

describe("Validators", () => {
    describe("Valid Data Submitted", () => {
        const account = {
            name: "Teste",
            dueDate: "2019-05-26T16:54:37-02:00",
            type: "MONTHLY",
            paymentForm: "TICKET",
            isRepeat: true,
            userId: 1,
            tags: [],
        };

        it("should return a list of erros when the account data is not filled in", () => {
            const errors = validator.validDataSubmitted({});

            expect(errors.length).toEqual(6);
        });

        it("should return an error if the account paid is greater than the account", () => {
            const errors = validator.validDataSubmitted({ ...account, value: 50, amountPaid: 60 });

            expect(errors.length).toEqual(1);
        });

        it("should return an error if the amount paid is negative", () => {
            const errors = validator.validDataSubmitted({ ...account, value: 10, amountPaid: -2 });

            expect(errors.length).toEqual(1);
        });
    });
});
