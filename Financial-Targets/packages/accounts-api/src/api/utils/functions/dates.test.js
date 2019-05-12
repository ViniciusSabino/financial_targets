import moment from "moment";

import { getDaysInCurrentMonth, getDateDifference, getCurrentDate } from "./dates";

import { applicationEnum } from "../enumerators/index";

const minorDate = moment(new Date("2019-04-07T00:00:00.000"));

describe("Utils", () => {
    describe("Dates", () => {
        it("should receive a current data correctly", () => {
            expect(getCurrentDate()).toEqual(moment().format());
        });

        it("should receive the number of days of the current month", () => {
            const daysTheMonth = moment().daysInMonth();
            expect(getDaysInCurrentMonth()).toEqual(daysTheMonth);
        });

        it("should receive the difference in minutes between two dates", () => {
            const largeDate = moment(new Date("2019-04-08T00:00:00.000"));

            const diffMinutes = getDateDifference(
                applicationEnum.date.differences.minutes,
                largeDate,
                minorDate
            );

            expect(diffMinutes).toEqual(1440);
        });

        it("should receive the difference in hours between two dates", () => {
            const largeDate = moment(new Date("2019-04-08T00:00:00.000"));

            const diffHours = getDateDifference(
                applicationEnum.date.differences.hours,
                largeDate,
                minorDate
            );

            expect(diffHours).toEqual(24);
        });

        it("should receive the difference in days between two dates", () => {
            const largeDate = moment(new Date("2019-11-21T00:00:00.000"));

            const diffDays = getDateDifference(
                applicationEnum.date.differences.days,
                largeDate,
                minorDate
            );

            expect(diffDays).toEqual(228);
        });

        it("should receive the difference in weeks between two dates", () => {
            const largeDate = moment(new Date("2019-11-21T00:00:00.000"));

            const diffWeeks = getDateDifference(
                applicationEnum.date.differences.weeks,
                largeDate,
                minorDate
            );

            expect(diffWeeks).toEqual(32);
        });

        it("should receive the difference in months between two dates", () => {
            const largeDate = moment(new Date("2019-11-21T00:00:00.000"));

            const diffMonths = getDateDifference(
                applicationEnum.date.differences.months,
                largeDate,
                minorDate
            );

            expect(diffMonths).toEqual(7);
        });

        it("should receive the difference in years between two dates", () => {
            const largeDate = moment(new Date("2049-04-08T00:00:00.000"));

            const diffYears = getDateDifference(
                applicationEnum.date.differences.years,
                largeDate,
                minorDate
            );

            expect(diffYears).toEqual(30);
        });
    });
});
