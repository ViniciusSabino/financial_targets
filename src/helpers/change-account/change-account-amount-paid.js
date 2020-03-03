const changeAccountAmountPaid = (currentAmountPaid, unpaidAccount) => {
    const { amountPaid, value } = unpaidAccount;

    const updatedAmountPaid = amountPaid ? currentAmountPaid + amountPaid : currentAmountPaid;

    if (updatedAmountPaid <= value) return updatedAmountPaid;

    return value;
};

export default changeAccountAmountPaid;
