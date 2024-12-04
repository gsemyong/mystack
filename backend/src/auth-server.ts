import { auth } from "./auth";

Bun.serve({
  async fetch(req) {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Expose-Headers": "Content-Length",
          "Access-Control-Max-Age": "600",
          "Access-Control-Allow-Credentials": "true",
        },
      });
    }

    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
    // validate request method
    if (BETTER_AUTH_ACCEPT_METHODS.includes(req.method)) {
      const response = await auth.handler(req);
      // Add CORS headers to all responses
      const headers = new Headers(response.headers);
      headers.set("Access-Control-Allow-Origin", "http://localhost:3001");
      headers.set("Access-Control-Allow-Credentials", "true");
      headers.set("Access-Control-Expose-Headers", "Content-Length");

      return new Response(response.body, {
        status: response.status,
        headers,
      });
    } else {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Expose-Headers": "Content-Length",
        },
      });
    }
  },
  port: 3000,
});
