module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: [
            /* config.module.rule('images').use('url-loader') */
            {
              loader:
                "D:\\Projects\\Web\\zloi.space\\src\\node_modules\\url-loader\\dist\\cjs.js",
              options: {
                limit: 4096,
                fallback: {
                  loader:
                    "D:\\Projects\\Web\\zloi.space\\src\\node_modules\\file-loader\\dist\\cjs.js",
                  options: {
                    name: "img/[name].[ext]",
                  },
                },
              },
            },
          ],
        },
      ],
    },
  },
};
