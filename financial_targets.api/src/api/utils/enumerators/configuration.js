const configuration = {
    modules: {
        account: "ACCOUNTS",
        goals: "GOALS"
    },

    config: [
        {
            name: "ACCOUNT_LIMIT",
            module: "ACCOUNTS",
            value: 7,
            maxValue: 30
        },
        {
            name: "ACCOUNT_VALUE_LIMIT",
            module: "ACCOUNTS",
            value: 5000,
            maxValue: 20000,
            minValue: 5
        },
        {
            name: "ACCOUNT_TAGS_LIMIT",
            module: "ACCOUNTS",
            value: 5,
            maxValue: 30
        }
    ]
};

export default configuration;
