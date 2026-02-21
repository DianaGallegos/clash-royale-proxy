const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

const CLASH_API = "https://api.clashroyale.com/v1";
const TOKEN = process.env.CLASH_TOKEN;

app.get("/", (req, res) => {
  res.send("✅ Clash Royale Proxy funcionando");
});

app.get("/players/:tag", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");

    const response = await fetch(`${CLASH_API}/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo jugador" });
  }
});

app.get("/clans/:tag/members", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");

    const response = await fetch(`${CLASH_API}/clans/${tag}/members`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo miembros" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
