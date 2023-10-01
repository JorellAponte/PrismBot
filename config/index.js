module.exports = {
    client: {
        token: "NDk1NzM4MzIyMDIzNjEyNDE2.Gblwo6.WxjJiHepa9snvTUsh9jB4JRMLn78ndNGQH1nGg",
        id: "495738322023612416"
    },
    handler: {
        prefix: "!",
        deploy: true,
        commands: {
            prefix: true,
            slash: true,
            user: true,
            message: true
        },
        mongodb: {
            uri: "mongodb://127.0.0.1:27017/prismbotdb",
            toggle: true
        }
    },
    users: {
        developers: ["156866329968771072"]
    }
};