const account = {
    nameIsEmpty: { message: "Informe o nome da mensalidade." },
    valueIsEmpty: { message: "Informe o valor da mensalidade." },
    valueExceeded: {
        message: "O valor da mensalidade está acima de R$ 5.000,00.",
    },
    dueDateIsEmpty: { message: "Informe a data de vencimento da mensalidade." },
    amountPaidIsInvalid: {
        message: "O valor pago até o momento não pode ser maior que valor da mensalidade.",
    },
    amoountPaidIsNegative: {
        message: "O valor pago não pode ser um valor abaixo que 0.",
    },
    typeIsEmpty: { message: "Informe o tipo da mensalidade." },
    paymentFormIsEmpty: {
        message: "A forma de pagamento precisa ser informada.",
    },
    tagsIsExceeded: {
        message: "A mensalidade não deve conter mais do que 3 tags.",
    },
    userIdIsEmpty: { message: "Informe o id do usuário." },
    dataEditIsInvalid: {
        message: "A data da mensalidade não pode ser menor que a data atual.",
    },
    paymentDone: { message: "O pagamento já foi efetuado, não será possivel efetuar novamente" },
};

export default account;
