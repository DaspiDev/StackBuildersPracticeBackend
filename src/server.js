import puppeteer from "./puppeteer.js";
import Express from "express";
const app = Express();

app.get("/getData", async (req, res) => {
    res.json(await puppeteer())
})

app.listen(5000, () => {console.log("Server started on port 5000")})