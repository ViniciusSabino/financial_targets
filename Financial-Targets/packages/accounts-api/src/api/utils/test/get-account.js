const account = {
    name: "Spotify",
    description: "Música",
    value: 16.9,
    dueDate: "2019-05-06T16:54:37-02:00",
    amountPaid: 0.0,
    type: "MONTHLY",
    paymentForm: "CREDIT",
    isRepeat: true,
    userId: 1,
    tags: ["Música"],
};

const accountEmpty = {
    name: "",
    description: "",
    value: 0,
    dueDate: "",
    amountPaid: 0,
    type: "",
    paymentForm: "",
    userId: 0,
};

export { account, accountEmpty };
