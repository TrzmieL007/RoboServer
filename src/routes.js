const utils = require('./utils');
const keys = utils.getKeys;
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const Routes = {
    CMD: '/cmd',
    STREAM: '/stream',
    INDEX: '/'
};

const FourOhFour = (req, res, url) => {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(404);
    res.end(`<h1>HTTP 404 Error</h1>The page <strong>${url}</strong> was not found.`);
}

const cmd = (req, res) => {
    const passedParams = utils.getParamsFromUrl(req.url);
    if(passedParams.spawn){
        const arguments = Array.isArray(passedParams.arguments)
            ? passedParams.arguments
            : [passedParams.arguments];
        const prog = spawn(passedParams.spawn, arguments);
        let buffer = '';
        let error = '';
        prog.stdout.on('data', data => buffer += data);
        prog.stderr.on('data', data => error += data);
        prog.on('close', code => {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(error ? 500 : 200);
            res.end(JSON.stringify({
                success: !error,
                message: `Executed program ${passedParams.spawn}. The program ended with code ${code}`,
                stdOut: buffer,
                stdErr: error,
            }));
        })
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            message: 'Received your request',
            passedParams,
        }));
    }
}

const serveStatic = (req, res, filePath, contentType) => {
    const ext = path.extname(filePath);
    fs.readFile(path.resolve(__dirname, '..', 'static', filePath), (error, data) => {
        if(error){
            res.setHeader('Content-Type', contentType || 'text/html');
            res.writeHead(500);
            res.end(error.message);
            return;
        }
        res.setHeader('Content-Type', contentType || utils.getContentType(ext));
        res.writeHead(200);
        res.write(data);
        res.end();
    })
}

module.exports = {
    routes: Routes,
    '404': FourOhFour,
    cmd,
    serveStatic,
};