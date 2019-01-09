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

const date = {
  differences: {
    years: 'years',
    months: 'months',
    weeks: 'weeks',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    milliseconds: 'milliseconds'
  }
};

const configuration = {
  modules: {
    account: 'ACCOUNTS',
    goals: 'GOALS'
  },
  config: {
    accountLimit: 'ACCOUNT_LIMIT',
    accountValueLimit: 'ACCOUNT_VALUE_LIMIT',
    accountTagsLimit: 'ACCOUNT_TAGS_LIMIT'
  }
};

export default {
  account,
  goal,
  date,
  configuration
};
