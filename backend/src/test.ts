import { connect } from "@nats-io/transport-node";

const nc = await connect();

nc.publish("test", "Hello, world!");
