import { Application } from "@reboot-dev/reboot";
import { A, B, C } from "../api/reactive/v1/reactive_rbt";
import { AServicer, BServicer, CServicer } from "./reactive_servicer";

const initialize = async (context) => {
  const a = A.ref("A");
  const b = B.ref("B");
  const c = C.ref("C");
  await a.idempotently().updateAState(context, { aState: "A" });
  await b.idempotently().updateAState(context, { aState: "B" });
  await c.idempotently().updateAState(context, { aState: "C" });
};

new Application({
  servicers: [AServicer, BServicer, CServicer],
  initialize,
}).run();
