const account = {
  status: {
    done: 'DONE',
    expired: 'EXPIRED',
    pending: 'PENDING'
  },

  type: {
    monthly: 'MONTHLY',
    yearly: 'YEARLY'
  },

  paymentForm: {
    credit: 'CREDIT',
    debitCard: 'DEBIT_CARD',
    ticket: 'TICKET'
  }
};

const goal = {
  type: {
    shortRun: 'SHORT_RUN',
    middleRun: 'MIDDLE_RUN',
    longRun: 'LONG_RUN'
  }
};

export default {
  account,
  goal
};
