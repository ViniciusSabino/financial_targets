declare const adapterPartiallyPayment: (amountPaid: any, unpaidAccount: any) => {
    amountPaid: any;
    status: any;
    dueDate: import("moment").Moment;
};
export default adapterPartiallyPayment;
