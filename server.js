import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;
// write some method that calls that api every five minutes and cache that 

const html = fs
    .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
    .toString();

const parts = html.split("not rendered");

const app = express();

app.use(
    "/assets",
    express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((req, res) => {
    res.write(parts[0]);
    const stream = renderApp(req.url, {
        onShellReady() {
            // if it is the crowler, do nothing here
            stream.pipe(res); // to join node from response with react 
        },
        onShellError() {
            // do error handling
        },
        onAllReady() {
            // if it is the crowler,
            // stream.pipe(res); // to join node from response with react 

            // last thing to write
            res.write(parts[1]);
            res.end();
        },
        onError(err) {
            console.error(err);
        },
    });
});

console.log(`listening on http://localhost:${ PORT }`);
app.listen(PORT);