var path = require("path");
module.exports = {
    entry: "./scripts/index.ts",
    cache: false,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        library: {
            name: "MYAPP",
            type: "var",
        },
        filename: "app-client.js",
        path: path.resolve(__dirname, "./wwwroot/js"),
    }
};
