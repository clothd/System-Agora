import express from "express";
import dotenv from "dotenv";
import session from "cookie-session";
import { shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";

dotenv.config();
const app = express();
app.use(express.json());
// Configure Shopify API
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_SCOPES.split(","),
  hostName: new URL(process.env.SHOPIFY_APP_URL).host,
  sessionStorage: sessionStorage, 
});

// Store token in session
app.use(
  session({
    name: "shopify-session",
    keys: [process.env.SHOPIFY_API_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }),
);

// Redirect merchants to install the app
app.get("/auth", async (req, res) => {
  const { shop } = req.query;
  if (!shop) return res.status(400).send("Missing shop parameter");

  const authUrl = await shopify.auth.beginAuth(
    req,
    res,
    shop,
    "/auth/callback",
    true,
  );
  res.redirect(authUrl);
});

// Handle Shopify OAuth callback
app.get("/auth/callback", async (req, res) => {
  try {
    const session = await shopify.auth.validateAuthCallback(
      req,
      res,
      req.query,
    );
    req.session.shopify = session;
    res.redirect(`/app?shop=${session.shop}`);
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).send("Authentication failed");
  }
});

// Example: Fetch shop details (protected route)
app.get("/api/shop", async (req, res) => {
  if (!req.session.shopify) return res.status(401).send("Unauthorized");

  const client = new shopify.clients.Rest({ session: req.session.shopify });
  const shopData = await client.get({ path: "shop" });
  res.json(shopData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//LLM service here
app.post("/api/chat", verifyShopifySession, async (req, res) => {
  try {
    const { message } = req.body;

    const llmResponse = await callLLMService(message);

    res.json({ response: llmResponse });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Error processing message" });
  }
});
