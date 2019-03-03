import enumerators from "../../../utils/enumerators";

const { typeFilters } = enumerators.application;

const accountFilters = [
    {
        parameter: "name",
        nameFilter: "name",
        type: typeFilters.inputText
    },
    {
        parameter: "duedatestart",
        nameFilter: "dueDate",
        type: typeFilters.dateStart
    },
    {
        parameter: "duedateend",
        nameFilter: "dueDate",
        type: typeFilters.dateEnd
    },
    {
        parameter: "status",
        nameFilter: "status",
        type: typeFilters.select
    },
    {
        parameter: "type",
        nameFilter: "type",
        type: typeFilters.select
    },
    {
        parameter: "paymentform",
        nameFilter: "paymentForm",
        type: typeFilters.select
    },
    {
        parameter: "isrepeat",
        nameFilter: "isRepeat",
        type: typeFilters.selectBool
    },
    {
        parameter: "tags",
        nameFilter: "tags",
        type: typeFilters.selectMultiple
    }
];

export default accountFilters;
