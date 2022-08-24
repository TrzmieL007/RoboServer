const routes = require('./routes');
const Routes = routes.routes;
const NoPage = routes['404'];

const handler = (req, res, next) => {
    const url = req.url.replace(/(\/[^#?\/]+).*/, "$1");
    switch(url){
        case Routes.INDEX:
            return routes.serveStatic(req, res, 'index.html');
        case Routes.CMD:
            return routes.cmd(req, res);
        case Routes.STREAM:

        default:
            return NoPage(req, res, url);
    }
}

module.exports = { handler };