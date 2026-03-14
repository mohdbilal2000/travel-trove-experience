// Hostinger Node.js Server for Next.js Standalone
// This file runs your Next.js app on Hostinger's Node.js hosting

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = false;
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

// Set the directory for Next.js
process.env.NODE_ENV = 'production';

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }).listen(port, hostname, (err) => {
        if (err) throw err;
        console.log(`> Guide India Tours running on http://${hostname}:${port}`);
    });
});
