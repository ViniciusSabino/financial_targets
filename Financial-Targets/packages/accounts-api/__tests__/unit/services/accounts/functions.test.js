import moment from "moment";

import { accountEnum } from "../../../../src/api/utils/enumerators";
import accountFunctions from "../../../../src/api/services/account-functions";
import { getDaysInCurrentMonth, createMomentDate } from "../../../../src/api/utils/functions/dates";

jest.mock("../../../../src/api/utils/functions/dates", () => ({
    getDaysInCurrentMonth: jest.fn(),
    createMomentDate: jest.fn(),
}));

describe("Account Functions", () => {
    const amountPaid = jest.fn(() => moment(new Date("2019-04-07T03:24:00.000")));

    it("should calculate the new payment date based on the type (monthly) and the amount date", () => {
        const { monthly } = accountEnum.type;

        getDaysInCurrentMonth.mockImplementation(() => "30");
        createMomentDate.mockImplementation(() => moment(new Date("2019-04-07T03:24:00.000")));

        const ajustedDate = accountFunctions.setAccountDate(amountPaid(), monthly);

        expect(ajustedDate.format()).toEqual("2019-05-07T03:24:00-03:00");
    });

    it("should calculate the new payment date based on the type (yearly) and the amount date", () => {
        const { yearly } = accountEnum.type;

        getDaysInCurrentMonth.mockImplementation(() => "30");
        createMomentDate.mockImplementation(() => moment(new Date("2019-04-07T03:24:00.000")));

        const ajustedDate = accountFunctions.setAccountDate(amountPaid(), yearly);

        expect(ajustedDate.format()).toEqual("2020-04-07T03:24:00-03:00");
    });
});
