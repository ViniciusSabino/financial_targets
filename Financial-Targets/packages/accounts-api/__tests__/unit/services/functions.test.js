import { accountEnum } from "../../../src/api/utils/enumerators";
import dates from "../../../src/api/utils/functions/dates";
import accountFunctions from "../../../src/api/services/account-functions";

describe("Account Service (Functions)", () => {
    it("should calculate the new payment date based on the type (monthly) and the amount date", () => {
        const { monthly } = accountEnum.type;

        const amountPaid = dates.createMomentDate(new Date("2019-04-07T03:24:00.000"));
        const ajustedDate = accountFunctions.setAccountDate(amountPaid, monthly);

        expect(ajustedDate.format()).toEqual("2019-05-07T03:24:00-03:00");
    });

    it("should calculate the new payment date based on the type (yearly) and the amount date", () => {
        const { yearly } = accountEnum.type;

        const amountPaid = dates.createMomentDate(new Date("2019-04-07T03:24:00.000"));
        const ajustedDate = accountFunctions.setAccountDate(amountPaid, yearly);

        expect(ajustedDate.format()).toEqual("2020-04-07T03:24:00-03:00");
    });
});
