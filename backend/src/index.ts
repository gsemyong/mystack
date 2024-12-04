import { connect } from "@nats-io/transport-node";

const nc = await connect();

nc.subscribe("test", {
  callback: (err, msg) => {
    console.log(msg.data);
  },
});
