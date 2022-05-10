const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' &&
                    require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
                    background: paths.appSrc + '/chrome/background.js',
                    hello: paths.appSrc+ '/hello.js'

                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                plugins: [
                   ...webpackConfig.plugins,
                   new HtmlWebpackPlugin({
                    inject: true,
                    chunks: ["options"],
                    template: paths.appSrc + '/hello.html',
                    filename: 'hello.html',
                    }),
                ]
            }
        },
    }
}