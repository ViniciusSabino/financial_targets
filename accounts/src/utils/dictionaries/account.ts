const accountDictionary = {
    // amountPaid
    amountPaidIsInvalid: {
        message: 'O valor pago até o momento não deve ser maior que valor da conta.',
    },
    amountPaidIsEmpty: {
        message: 'O valor pago deve ser preenchido!',
    },
    amountPaidDone: {
        message: 'A conta já está paga!',
    },

    // dueDate
    dueDateIsInvalid: {
        message: 'A data da conta não pode ser menor que a data atual.',
    },

    // accountId
    accountIdIsEmpty: {
        message: 'O Id da conta deve ser informado!',
    },

    // userId
    userIdIsEmpty: {
        message: 'O Id do usuário não foi informado!',
    },
};

export default accountDictionary;
