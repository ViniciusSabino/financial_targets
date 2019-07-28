const newAccountCompleted = {
    userId: 1,
    name: 'New Account Completed',
    description: 'Description',
    value: 300.0, // equal to amountPaid
    dueDate: '2019-07-20T20:54:37-02:00',
    amountPaid: 300.0,
    type: 'MONTHLY',
    paymentForm: 'CREDIT',
    isRepeat: true,
    tags: ['Tag'],
};

const newAccountPending = {
    userId: 1,
    name: 'New Account Completed',
    description: 'Description',
    value: 300.0, // less than amountPaid
    dueDate: '2019-07-20T20:54:37-02:00',
    amountPaid: 10.0,
    type: 'MONTHLY',
    paymentForm: 'CREDIT',
    isRepeat: true,
    tags: ['Tag'],
};

const createAndEdit = {
    userId: 1,
    name: 'Create And Edit',
    description: 'Description',
    value: 300.0,
    dueDate: '2019-07-20T20:54:37-02:00',
    amountPaid: 10.0,
    type: 'MONTHLY',
    paymentForm: 'CREDIT',
    isRepeat: true,
    tags: ['Tag'],
};

const makePartialPayment = {
    _id: '507f191e810c19729de860ea',
    userId: 1,
    name: 'Make Partial Payment',
    description: 'Description',
    value: 300.0,
    dueDate: '2019-07-20T20:54:37-02:00',
    amountPaid: 10.0,
    type: 'MONTHLY',
    paymentForm: 'CREDIT',
    isRepeat: true,
    tags: ['Tag'],
};

const makePayment = [
    {
        userId: 1,
        name: 'Make Payment 1',
        description: 'Description',
        value: 300.0,
        dueDate: '2019-07-20T20:54:37-02:00',
        amountPaid: 10.0,
        type: 'MONTHLY',
        paymentForm: 'CREDIT',
        isRepeat: true,
        tags: ['Tag'],
    },
    {
        userId: 1,
        name: 'Make Payment 2',
        description: 'Description',
        value: 300.0,
        dueDate: '2019-07-20T20:54:37-02:00',
        amountPaid: 10.0,
        type: 'MONTHLY',
        paymentForm: 'CREDIT',
        isRepeat: true,
        tags: ['Tag'],
    },
];

export default {
    newAccountCompleted,
    newAccountPending,
    createAndEdit,
    makePartialPayment,
    makePayment,
};
