import service from "../services/goals";

const addGoal = async ctx => {
    const goal = ctx.request.body;
    const data = await service.addGoal(goal);
    return ctx.created({ data });
};

const listAllGoals = async ctx => {
    const { userid } = ctx.request.header;
    const data = await service.listAllGoals(userid);
    return ctx.ok(data);
};

const details = async ctx => {
    const { userid, goalid } = ctx.request.header;
    const data = await service.details({ userId: userid, goalId: goalid });
    return ctx.ok(data);
};

export default {
    addGoal,
    listAllGoals,
    details
};
