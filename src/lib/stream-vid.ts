import "server-only";
import {StreamClient} from "@stream-io/node-sdk" ;

// Prefer the correctly-named public API key; fall back to misspelled name for backward compatibility.
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY ?? process.env.NEXT_PUBLIC_KEY_STREAM_VIDEO_API_KEY;
const STREAM_SECRET = process.env.STREAM_VIDEO_SECRET_KEY;

// Log the resolved values for debugging (remove in production if needed)
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("[stream-vid] Resolved STREAM_API_KEY:", STREAM_API_KEY ? "✓ found" : "✗ missing");
  // eslint-disable-next-line no-console
  console.log("[stream-vid] Resolved STREAM_SECRET:", STREAM_SECRET ? "✓ found" : "✗ missing");
}

if (!STREAM_API_KEY) {
  throw new Error("Stream API key not found. Set NEXT_PUBLIC_STREAM_VIDEO_API_KEY or NEXT_PUBLIC_KEY_STREAM_VIDEO_API_KEY in env.");
}
if (!STREAM_SECRET) {
  throw new Error("Stream secret not found. Set STREAM_VIDEO_SECRET_KEY in env.");
}

export const streamVideo = new StreamClient(STREAM_API_KEY, STREAM_SECRET);