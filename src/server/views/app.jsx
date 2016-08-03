'use strict';

var getWebpackAssets = require('../../tools/get-webpack-assets');
var React = require('react');

var App = React.createClass({

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <title>Angular2 Seed</title>
                    <base href="/"/>
                </head>
                <body>

                    <app>
                        Loading...
                    </app>

                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
                    <script src={getWebpackAssets().polyfills.js}></script>
                    <script src={getWebpackAssets().vendor.js}></script>
                    <script src={getWebpackAssets().main.js}></script>
                </body>
            </html>
        );
    }
});

module.exports = App;
