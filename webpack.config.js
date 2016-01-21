var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pwd = __dirname;
var devtoolModuleFilenameTemplate = process.platform === "win32" ? "[resource-path]" : "file:///[resource-path]";
var regexPathSep = process.platform === "win32" ? "\\\\" : "\/";

var config = {};

/**************** INPUT ***************/
config.entry = {
    app: 'PROJECTNAME',
    head: [
        '.modernizrrc'
    ]
};

/**************** OUTPUT ***************/
config.output = {
    path: path.normalize(pwd + '/build'),
    filename: '[name].js',
    publicPath: '/static/',
    devtoolModuleFilenameTemplate: devtoolModuleFilenameTemplate
};

/**************** PLUGINS ***************/
config.plugins = [
    new ExtractTextPlugin("[name].css"),
];
if (process.env.PRODUCTION) {
    config.plugins.push(new webpack.optimize.DedupePlugin())
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        output: {comments: false}
    }));
}

/**************** RESOLVING NAMES ***************/
config.resolve = {
    root: [
        path.normalize(pwd + '/modules'),
    ],
    alias: {
        'jquery': 'jquery/dist/jquery',
    },
    // you can now require('file') instead of require('file.js') or require('file.json')
    extensions: ['', '.js', '.json']
};

/**************** DEV TOOLS ***************/
if (!process.env.PRODUCTION) {
    config.devtool = "sourcemap";
}


/**************** MODULE LOADING ***************/
var svgExtraLoaders = '';
if (process.env.PRODUCTION) {
    svgExtraLoaders = '!svgo';
}
var skipProcessingLoader = "imports?this=>window&module=>false&exports=>false&define=>false";
config.module = {
    loaders: [
        // Libraries that match this, doesn't support Commonjs, AMD
        // They are exposed to global JS environment
        {
            test: /block-ui|tooltipster/,
            loader: skipProcessingLoader
        },
        // Loader for the custom modernizer build
        {
            test: /\.modernizrrc$/,
            loader: "modernizr"
        },
        // Styling
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!ruby-sass")
        },
        {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss")},
        // Images
        {test: /\.gif$/, loader: "url?limit=100000&mimetype=image/gif"},
        {test: /\.png$/, loader: "url?limit=100000&mimetype=image/png"},
        {test: /\.jpg$/, loader: "file"},
        {test: /\.html$/, loader: "mustache"},
        {test: /\.svg$/, loader: "raw"+svgExtraLoaders},
        // JS
        {
            test: new RegExp('(:?modules'+regexPathSep+'|node_modules'+regexPathSep+'skate).+\.js$'),
            loader: 'babel',
            query: {
                cacheDirectory: true,
                plugins: ['transform-class-properties'],
                presets: ['es2015']
            }
        }
    ]
};

/**************** POSTCSS module ***************/
config.postcss = [autoprefixer({ browsers: [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
]})];

/**************** File changes watching/monitoring options ***************/
config.watchOptions = {
    aggregateTimeout: 100
};

module.exports = config;
