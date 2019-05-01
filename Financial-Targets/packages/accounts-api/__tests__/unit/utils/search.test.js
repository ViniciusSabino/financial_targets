import search from "../../../src/api/utils/functions/search";
import accountFilters from "../../../src/api/services/search/filters";

describe("Utils", () => {
    describe("Search", () => {
        it("should receive an object for condition in mongoose", () => {
            const params = {
                name: "Vinícius",
                status: "PENDING",
                tags: "Financeiro,Teste",
                duedatestart: "2019-01-24 18:54:37.000Z",
                duedateend: "2019-01-24 18:54:37.000Z",
                isrepeat: true,
            };

            const expectConditions = {
                name: {
                    $regex: "Vinícius",
                    $options: "i",
                },
                status: {
                    $eq: "PENDING",
                },
                tags: {
                    $in: ["Financeiro", "Teste"],
                },
                dueDate: {
                    $gte: params.duedatestart,
                    $lte: params.duedateend,
                },
                isRepeat: true,
            };

            const resultFilters = search.createFilterConditions(params, accountFilters);

            expect(resultFilters).toHaveProperty("name", expectConditions.name);
            expect(resultFilters).toHaveProperty("status", expectConditions.status);
            expect(resultFilters).toHaveProperty("tags", expectConditions.tags);
            expect(resultFilters).toHaveProperty("dueDate", expectConditions.dueDate);
            expect(resultFilters).toHaveProperty("isRepeat", expectConditions.isRepeat);
        });

        it("should must properly mount the mongoose sort object when it receives (order, sort)", () => {
            const sortObj = search.sortBy("desc", "name");

            expect(sortObj).toHaveProperty("name", -1);
        });
    });
});
