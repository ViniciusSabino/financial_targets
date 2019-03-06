import Router from "koa-joi-router";

import accounts from "../controllers/accounts";
import validator from "../validators/accounts";

const router = Router();

router.prefix("/accounts");

router.route([
    {
        method: "POST",
        path: "/",
        handler: [validator.validCreate, accounts.create],
    },
    {
        method: "GET",
        path: "/",
        handler: [validator.validList, accounts.find],
    },
    {
        method: "GET",
        path: "/all",
        handler: [validator.validList, accounts.listAll],
    },
    {
        method: "PUT",
        path: "/",
        handler: [validator.validEdit, accounts.edit],
    },
    {
        method: "DELETE",
        path: "/",
        handler: [accounts.deleteAccount],
    },
    {
        method: "PATCH",
        path: "/",
        handler: [accounts.makePayment],
    },
    {
        method: "PATCH",
        path: "/makepartialpayment",
        handler: [validator.validMakePartialPayment, accounts.makePartialPayment],
    },
    {
        method: "PATCH",
        path: "/sendnext",
        handler: [accounts.sendNext],
    },
]);

export default router;
