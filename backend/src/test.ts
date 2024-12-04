import { connect } from "@nats-io/transport-node";

const nc = await connect({
  user: "auth",
  pass: "auth",
});

nc.publish("lol", "Hello, world!");
