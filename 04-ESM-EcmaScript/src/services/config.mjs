const dev = "development";
const prod = "production";

const config = {
    [dev]: {
        database: "mongodb://localhost:27017/devdb",
        port: 3000,
    },
    [prod]: {
        database: "mongodb://localhost:27017/proddb",
        port: 8000,
    },
};

export default config;