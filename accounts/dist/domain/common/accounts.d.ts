import moment from 'moment';
declare const getNewAccountDate: (type: any, dueDate: any) => moment.Moment;
declare const setAccountStatus: (amountPaid: any, unpaidAccount: any) => any;
declare const setAccountAmountPaid: (currentAmountPaid: any, unpaidAccount: any) => any;
export { getNewAccountDate, setAccountStatus, setAccountAmountPaid };
