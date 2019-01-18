import service from "../services/goals";

const addGoal = async ctx => {
    const goal = ctx.request.body;
    const data = await service.addGoal(goal);
    return ctx.created({ data });
};

export default {
    addGoal
};
