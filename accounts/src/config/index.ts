const { env } = process;

export default {
    environment: env.NODE_ENV || 'development',
    port: env.PORT || 8080,
    mongodb: {
        connection: `mongodb://${env.MONGODB_CONNECTION}:${env.MONGODB_PORT}/${
            env.MONGODB_DATABASE
        }`,
    },
};
