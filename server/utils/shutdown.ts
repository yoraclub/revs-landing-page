import { Server } from "http";

/**
 * Graceful shutdown handler
 * Properly closes server connections before exiting
 */
export function setupGracefulShutdown(server: Server): void {
  const shutdown = (signal: string) => {
    console.log(`🛑 Received ${signal}, shutting down gracefully`);

    // Close server to stop accepting new connections
    server.close((err) => {
      if (err) {
        console.error("Error during server shutdown:", err);
        process.exit(1);
      }

      console.log("✅ Server closed successfully");
      process.exit(0);
    });

    // Force shutdown after timeout if graceful shutdown takes too long
    const shutdownTimeout = setTimeout(() => {
      console.error(
        "⚠️  Graceful shutdown timeout, forcing shutdown"
      );
      process.exit(1);
    }, 10000); // 10 second timeout

    // Clear timeout if shutdown completes
    shutdownTimeout.unref();
  };

  // Handle shutdown signals
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
