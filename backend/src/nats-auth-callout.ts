import { Svc } from "@nats-io/services";
import { connect, nkeys } from "@nats-io/transport-node";

const nkeySeed = "SAAOOUVVU7VBZLCT2ITFJTFRWTGOZJ6NT2EA4VV4CTP5EDE2MEXL2E5ZTA";

const nc = await connect({
  user: "auth",
  pass: "auth",
});

const kp = nkeys.fromSeed(Buffer.from(nkeySeed));

const svc = new Svc(nc);

const service = await svc.add({
  name: "auth",
  version: "0.0.1",
  description: "auth callout",
});

service.addEndpoint("auth", {
  subject: "$SYS.REQ.USER.AUTH",
  handler: async (err, msg) => {
    console.log("auth");

    if (err) {
      console.error(err);
      return;
    }

    console.log(msg.headers);
  },
});
