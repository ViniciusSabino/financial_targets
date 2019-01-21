import enumerators from "../../utils/enumerators";

const { typeFilters } = enumerators.application;

const accountFilters = [
    {
        name: "name",
        nameFilter: "name",
        type: typeFilters.inputText
    },
    {
        name: "duedatestart",
        nameFilter: "dueDate",
        type: typeFilters.dateStart
    },
    {
        name: "duedateend",
        nameFilter: "dueDate",
        type: typeFilters.dateEnd
    },
    {
        name: "status",
        nameFilter: "status",
        type: typeFilters.select
    },
    {
        name: "type",
        nameFilter: "type",
        type: typeFilters.select
    },
    {
        name: "paymentform",
        nameFilter: "paymentForm",
        type: typeFilters.select
    },
    {
        name: "isrepeat",
        nameFilter: "isRepeat",
        type: typeFilters.selectBool
    },
    {
        name: "tags",
        nameFilter: "tags",
        type: typeFilters.selectMultiple
    }
];

export default accountFilters;
