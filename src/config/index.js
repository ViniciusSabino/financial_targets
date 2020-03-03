const { env } = process;

export default {
    name: 'Financal Targets - Accounts API',
    environment: env.NODE_ENV || 'development',
    port: Number(env.PORT) || 8080,
    mongodb: {
        connection: `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${
            env.MONGODB_CONNECTION
        }/${env.MONGODB_DATABASE}`,
    },
};
