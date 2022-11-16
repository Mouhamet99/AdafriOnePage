import express, { Response, Request } from "express";
import path from "path";
import cors from "cors";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.use('/', express.static(__dirname + '/'))
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/chatbot", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/chatbot.html'));
});


app.get("/message", async (req: Request, res: Response) => {
    const id: string = req.query.transaction_id as string ?? "";
});

app.get('^/*\.html', async (req: Request, res: Response) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.post('/message', async (req: Request, res: Response) => {
    const response = await axios.post("https://graph.facebook.com/v15.0/101945206074990/messages",
        {
            messaging_product: "whatsapp",
            to: "221774495925",
            type: "template",
            template: {
                name: "hello_world",
                language: {code: "en_US"}
            }
        }
        , {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.WtspCloudAccessToken}`,
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        });

        return res.send(response);
});

const port = 3000;
app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});





