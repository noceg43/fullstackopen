const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv.mode:', argv.mode)

    const backend_url = argv.mode === 'production'
        ? 'https://notes2023.fly.dev/api/notes'
        : 'http://localhost:3001/notes'

    return {
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ],
        entry: './src/index.js',
        output: {
            // __dirname variable is a Node.js global variable that points to the directory name of the current module
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        // run the website in development mode, updating the page automatically when changes are made
        // the "build" is saved on the memory, not written to the disk every time
        devServer: {
            static: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        // used to generate source maps, which help in debugging by mapping the compiled code back to the original source code
        devtool: 'source-map',
        // loader used for jsx (React) files
        module: {
            rules: [
                {
                    // add babel-loader dependency in order to be used
                    // what babel does is "transpile" modern JavaScript (ES6+) into a version that older browsers can understand
                    // transpile means converting code from one version of JavaScript to another
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
                // add style-loader and css-loader dependencies in order to be used
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
    }
}

module.exports = config