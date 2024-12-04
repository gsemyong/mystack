import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { wsconnect } from "@nats-io/nats-core";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  React.useEffect(() => {
    wsconnect({
      servers: "ws://localhost:8080",
    }).then(async (nc) => {
      nc.subscribe("test", {
        callback: (err, msg) => {
          console.log(msg.string());
        },
      });
    });
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
