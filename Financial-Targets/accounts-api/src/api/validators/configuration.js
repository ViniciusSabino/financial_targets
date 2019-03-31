import enumerators from "../utils/enumerators";
import dictionary from "../utils/dictionaries";

const validDataSubmitted = (configurations) => {
    const { config: baseConfigurations } = enumerators.configuration;
    const errors = [];

    configurations.config.forEach((config) => {
        const baseConfig = baseConfigurations.find((base) => base.name === config.name);
        const errorMessage = dictionary.configuration.find((c) => c.name == config.name);

        if (
            config.value > baseConfig.maxValue ||
            (baseConfig?.minValue && config.value < baseConfig.minValue)
        )
            errors.push(errorMessage);
    });

    return errors;
};

const validSaveConfiguration = (ctx, next) => {
    const configurations = ctx.request.body;

    if (!configurations.userId)
        return ctx.badRequest({
            errors: [dictionary.configuration.find((c) => c.name === "USER_ID_EMPTY")],
        });

    const errors = validDataSubmitted(configurations);

    return errors.length ? ctx.badRequest({ errors }) : next();
};

export default {
    validSaveConfiguration,
};
