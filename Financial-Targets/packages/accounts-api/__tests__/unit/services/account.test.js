import { getCurrentDate } from "../../../src/api/utils/functions/dates";

jest.mock("../../../src/api/utils/functions/dates", () => ({
    getCurrentDate: jest.fn(),
}));

describe("Services", () => {
    describe("List All Accounts", () => {
        it("should update the date of a 'done' monthly when the month/year is already another resetting the account", () => {
            const accountsExpect = [
                {
                    amountPaid: 0,
                    isRepeat: true,
                    tags: [],
                    _id: 1,
                    name: "Teste",
                    description: "",
                    value: 500,
                    dueDate: "2019-10-01T18:54:37.000Z",
                },
            ];
        });
    });
});
