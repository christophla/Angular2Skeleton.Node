module.exports = {
    main: {
        host: '0.0.0.0',
        labels: {
            api: 'api'
        },
        port: 3000,
        public: '../client'
    },
    auth: {
        restrict: ['/api'],
    },
    authorization: {
        tokenkey: 'X-Auth-Token'
    },
    mail: {
        mail: {
            from: 'youremail@example.com'
        },
        config: {
            service: 'Gmail',
            auth: {
                user: 'youremail@example.com',
                pass: 'yourpass'
            }
        }
    }

};
