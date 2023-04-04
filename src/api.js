import express from "express";
import cors from "cors";
import axios from "axios";

import { getStats } from "./utils/stats.js";
import { getLeaderboard } from "./utils/leaderboard.js";
import { getRecents } from "./utils/recents.js";
import { mapState } from "./utils/mapped.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/stats", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const stats = await getStats();
    res.send(stats);
    res.end();
  } catch (error) {
    res.send({ error: "error_calculating_stats" });
    res.end();
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const leaderboard = await getLeaderboard();
    res.send(leaderboard);
    res.end();
  } catch (error) {
    res.send({ error: "error_calculating_stats" });
    res.end();
  }
});

app.get("/mapped-state", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const result = await mapState();
    res.send(result);
    res.end();
  } catch (error) {
    res.send({ error: "error_calculating_stats" });
    res.end();
  }
});

app.get("/recents/:type", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { type } = req.params;
    const recents = await getRecents(type);
    res.send(recents);
    res.end();
  } catch (error) {
    res.send({ error: "error_calculating_stats" });
    res.end();
  }
});

app.listen(port, async () => {
  console.log(`listening at PORT: ${port}`);
});
