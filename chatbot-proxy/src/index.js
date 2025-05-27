function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Only POST requests allowed" }, 405);
    }

    try {
      let body;
try {
  body = await request.json();
} catch (err) {
  console.log("❌ Invalid JSON input");
  return new Response("Invalid JSON input", { status: 400 });
}

      const { businessId, message, sessionId } = body;

      if (!businessId || !message || !sessionId) {
        return jsonResponse({ error: "Missing required fields" }, 400);
      }

      const validBusinessIds = ["tester"];

      if (!validBusinessIds.includes(businessId)) {
        return jsonResponse({ error: "Invalid business ID" }, 403);
      }

      console.log("🌐 env.N8N_WEBHOOK_URL =", env.N8N_WEBHOOK_URL);

      const response = await fetch(env.N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return jsonResponse(data);

    } catch (err) {
      console.error("Worker error:", err); // 👈 Add this
      return jsonResponse({ error: "Internal Server Error", details: err.message }, 500);
      }
  }
};
