module.exports = {
    wepackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
};
