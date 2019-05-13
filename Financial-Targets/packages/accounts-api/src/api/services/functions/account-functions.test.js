import moment from "moment";

import { accountEnum } from "../../utils/enumerators";
import { setAccountDate } from "./account-functions";
import { getDaysInCurrentMonth, createMomentDate } from "../../utils/functions/dates";

jest.mock("../../utils/functions/dates", () => ({
    getDaysInCurrentMonth: jest.fn(),
    createMomentDate: jest.fn(),
}));

const amountPaid = jest.fn(() => moment(new Date("2019-04-07T03:24:00.000")));

getDaysInCurrentMonth.mockImplementation(() => "30");
createMomentDate.mockImplementation(() => moment(new Date("2019-04-07T03:24:00.000")));

describe("Account Functions", () => {
    it("should calculate the new payment date based on the type (monthly) and the amount date", () => {
        const { monthly } = accountEnum.type;

        const ajustedDate = setAccountDate(amountPaid(), monthly);

        expect(ajustedDate).toEqual("2019-05-07T03:24:00-03:00");
    });

    it("should calculate the new payment date based on the type (yearly) and the amount date", () => {
        const { yearly } = accountEnum.type;

        const ajustedDate = setAccountDate(amountPaid(), yearly);

        expect(ajustedDate).toEqual("2020-04-07T03:24:00-03:00");
    });
});
