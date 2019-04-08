import moment from "moment";
import dates from "../../../src/api/utils/functions/dates";
import { applicationEnum } from "../../../src/api/utils/enumerators/";

describe("Utils (Dates)", () => {
    it("should receive a current data correctly", () => {
        expect(dates.getCurrentDate()).toEqual(moment().format());
    });

    it("should receive the number of days of the current month", () => {
        const daysTheMonth = moment().daysInMonth();
        expect(dates.getDaysInCurrentMonth()).toEqual(daysTheMonth);
    });

    it("should receive the difference in minutes between two dates", () => {
        const minorDate = moment(new Date("2019-04-07T00:00:00.000"));
        const largeDate = moment(new Date("2019-04-08T00:00:00.000"));

        const diffMinutes = dates.getDateDifference(
            applicationEnum.date.differences.minutes,
            largeDate,
            minorDate
        );

        expect(diffMinutes).toEqual(1440);
    });

    it("should receive the difference in hours between two dates", () => {
        const minorDate = moment(new Date("2019-04-07T00:00:00.000"));
        const largeDate = moment(new Date("2019-04-08T00:00:00.000"));

        const diffHours = dates.getDateDifference(
            applicationEnum.date.differences.hours,
            largeDate,
            minorDate
        );

        expect(diffHours).toEqual(24);
    });

    it("should receive the difference in days between two dates", () => {
        const minorDate = moment(new Date("2019-04-07T00:00:00.000"));
        const largeDate = moment(new Date("2019-11-21T00:00:00.000"));

        const diffDays = dates.getDateDifference(
            applicationEnum.date.differences.days,
            largeDate,
            minorDate
        );

        expect(diffDays).toEqual(228);
    });

    it("should receive the difference in weeks between two dates", () => {
        const minorDate = moment(new Date("2019-04-07T00:00:00.000"));
        const largeDate = moment(new Date("2019-11-21T00:00:00.000"));

        const diffWeeks = dates.getDateDifference(
            applicationEnum.date.differences.weeks,
            largeDate,
            minorDate
        );

        expect(diffWeeks).toEqual(32);
    });

    it("should receive the difference in months between two dates", () => {
        const minorDate = moment(new Date("2019-04-07T00:00:00.000"));
        const largeDate = moment(new Date("2019-11-21T00:00:00.000"));

        const diffMonths = dates.getDateDifference(
            applicationEnum.date.differences.months,
            largeDate,
            minorDate
        );

        expect(diffMonths).toEqual(7);
    });

    it("should receive the difference in years between two dates", () => {
        const minorDate = moment(new Date("2019-04-07T00:00:00.000"));
        const largeDate = moment(new Date("2019-04-08T00:00:00.000"));

        const diffYears = dates.getDateDifference(
            applicationEnum.date.differences.years,
            largeDate,
            minorDate
        );

        expect(diffYears).toEqual(0);
    });
});
