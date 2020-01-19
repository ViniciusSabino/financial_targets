export enum AccountType {
    monthly = 'MONTHLY',
    yearly = 'YEARLY',
}

export enum AccountPaymentForm {
    credit = 'CREDIT',
    debitCard = 'DEBIT_CARD',
    ticket = 'TICKET',
}

export enum AccountStatus {
    done = 'DONE',
    expired = 'EXPIRED',
    pending = 'PENDING',
}

export enum AccountErrors {
    dueDateIsInvalid = 'DUE_DATE_IS_INVALID',
    amountPaidIsInvalid = 'AMOUNT_PAID_IS_INVALID',
    amountPaidIsEmpty = 'AMOUNT_PAID_IS_EMPTY',
    accountIdIsEmpty = 'ACCOUNT_ID_IS_EMPTY',
    accountAlreadyPaid = 'ACCOUNT_ALREADY_PAID',
    accountNotExists = 'ACCOUNT_NOT_EXISTS',
}

export enum FieldTypes {
    number = 'NUMBER',
    string = 'STRING',
    date = 'DATE',
    enum = 'ENUM',
    array = 'ARRAY',
    boolean = 'BOOLEAN',
    dateStart = 'DATE_START',
    dateEnd = 'DATE_END',
}

export interface Account {
    _id?: string;
    name: string;
    description?: string;
    value: number;
    dueDate: string;
    amountPaid?: number;
    type: AccountType;
    paymentForm: AccountPaymentForm;
    status: AccountStatus;
    isRepeat: boolean;
    tags?: string[];
}
