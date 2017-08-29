/**
 * Created by willstreeter on 8/28/17.
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build:  path.join(__dirname, 'build')
};


const commonConfig ={
   entry: {
     app: PATHS.app,
   },
   output: {
    path: PATHS.build,
    filename: '[name].js'
   },
   plugins: [
    new HtmlWebpackPlugin({
        title:"Webpack First Try demo"
     }),
   ],

}
const productionConfig = () => commonConfig;




const developmentConfig = merge([
    {
     devServer: {
         watchOptions: {
             // Delay the rebuild after the first change
             aggregateTimeout: 300,

             //Poll using interval (in ms, accepts boolean too)
             poll: 1000,
         }
     },
     plugins: [
         // Ignore node_modules so CPU usage with poll
         // watching drops significantly.
         new webpack.WatchIgnorePlugin( [
             path.join(__dirname, 'node_modules')
         ])
     ]
    },
    commonConfig
])

//
// const developmentConfig = () =>{
//     const config = {
//         devServer: {
//
//             //Enable history API fallback to HTML5 History API based
//             // routing works. Good for complext setups.
//             historyApiFallback: true,
//
//             //Display only errors to reduce the amount of output.
//             stats: 'errors-only',
//
//             //Parse host and port from env to allow customization
//
//             //IF you use Docker, Vagrant of Cloud9 set
//             //hoset: options.host || '0.0.0.0'
//             //
//             //0.0.0.0 is available to all network devices
//             // unlike default `localhost`.
//             host: process.env.HOST, // Defaults to `localhost`
//             port: process.env.PORT, // Defaults to 8080
//
//         }
//     }
//
//     return Object.assign(
//         {},
//        commonConfig,
//        config
//     );
// }



module.exports = (env)=> {

    if( env === 'production'){
        return productionConfig();
    }

    return developmentConfig;

    //return developmentConfig()

}