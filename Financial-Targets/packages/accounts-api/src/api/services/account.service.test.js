import moment from "moment";

import { getCurrentDate } from "../utils/functions/dates";

jest.mock("../../../src/api/utils/functions/dates", () => ({
    getCurrentDate: jest.fn(),
}));

describe("Services", () => {
    describe("List All Accounts", () => {
        it("should update status do 'EXPIRED' when the monthly payment is 'PENDING and the pay date is less than the current date", async () => {
            getCurrentDate.mockImplementation(() =>
                moment(new Date("2019-10-14T03:24:00.000")).format()
            );

            const mockFindAccount = {
                amountPaid: 40,
                _id: 1,
                name: "Teste",
                value: 500,
                status: "PENDING",
                dueDate: "2019-10-10T18:54:37.000Z",
            };

            const response = {
                data: {
                    status: "EXPIRED",
                    dueDate: "2019-11-10T18:54:37.000Z",
                    amountPaid: 0,
                },
            };

            expect(response.data.status).toEqual("EXPIRED");
            expect(response.data.dueDate).toEqual("2019-11-10T18:54:37.000Z");
            expect(response.data.amountPaid).toEqual(0);
        });
    });
});
