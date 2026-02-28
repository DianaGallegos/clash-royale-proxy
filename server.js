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

// ===============================
// PLAYER
// ===============================
app.get("/players/:tag", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");

    const response = await fetch(`${CLASH_API}/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo jugador" });
  }
});

// ===============================
// CLAN MEMBERS
// ===============================
app.get("/clans/:tag/members", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");

    const response = await fetch(`${CLASH_API}/clans/${tag}/members`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo miembros" });
  }
});

// ===============================
// CURRENT RIVER RACE (✅ NUEVO)
// ===============================
app.get("/clans/:tag/currentriverrace", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");

    const response = await fetch(`${CLASH_API}/clans/${tag}/currentriverrace`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo currentriverrace" });
  }
});

// ===============================
// RIVER RACE LOG
// ===============================
app.get("/clans/:tag/riverracelog", async (req, res) => {
  try {
    const tag = req.params.tag.replace("#", "%23");

    const response = await fetch(`${CLASH_API}/clans/${tag}/riverracelog?limit=4`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo riverracelog" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
