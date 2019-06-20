export default {
    request: {
        method: "POST",
        url: "/accounts",
        header: {
            "content-type": "application/json",
            "user-agent": "PostmanRuntime/7.11.0",
            accept: "*/*",
            "cache-control": "no-cache",
            "postman-token": "1a806c31-c425-4d9f-9fec-c63607620960",
            host: "localhost:8080",
            "accept-encoding": "gzip, deflate",
            "content-length": "222",
            connection: "keep-alive",
        },
    },
    response: {
        status: 200,
        message: "Ok",
        header: {},
    },
    app: {
        subdomainOffset: 2,
        proxy: false,
        env: "development",
    },
    originalUrl: "/accounts",
    req: "<original node req>",
    res: "<original node res>",
    socket: "<original node socket>",
};
