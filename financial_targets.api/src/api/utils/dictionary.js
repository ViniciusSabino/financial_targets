const account = {
  nameIsEmpty: { message: 'Informe o nome da mensalidade' },
  valueIsEmpty: { message: 'Informe o valor da mensalidade.' },
  valueExceeded: { message: 'O valor da mensalidade está acima de R$ 5.000,00.' },
  dueDateIsEmpty: { message: 'Informe a data de vencimento da mensalidade.' },
  amountPaidIsInvalid: { message: 'O valor pago até o momento não pode ser maior que valor da mensalidade.' },
  typeIsEmpty: { message: 'Informe o tipo da mensalidade' },
  paymentFormIsEmpty: { message: 'A forma de pagamento precisa ser informada.' },
  tagsIsExceeded: { message: 'A mensalidade não deve conter mais do que 3 tags' },
  userIdIsEmpty: { message: 'Informe o id do usuário' }
};

export default {
  account
};
