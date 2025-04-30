import { ReaderContext, WriterContext, allow } from "@reboot-dev/reboot";
import { Empty, PartialMessage } from "@bufbuild/protobuf";

import {
  A,
  B,
  C,
  GetResponse,
  UpdateAStateRequest,
  UpdateBStateResponse,
  UpdateCStateResponse,
} from "../api/reactive/v1/reactive_rbt";

export class AServicer extends A.Servicer {
  authorizer() {
    return allow();
  }

  async getAState(
    context: ReaderContext,
    state: A.State,
    reqeust: Empty
  ): Promise<PartialMessage<GetResponse>> {
    let { combinedResponse } = await B.ref("B").getBState(context);
    combinedResponse = state.aState + combinedResponse;
    return { combinedResponse };
  }

  async updateAState(
    context: WriterContext,
    state: A.State,
    request: PartialMessage<UpdateAStateRequest>
  ): Promise<PartialMessage<Empty>> {
    state.aState = request.aState;
    return {};
  }
}

export class BServicer extends B.Servicer {
  authorizer() {
    return allow();
  }

  async getBState(
    context: ReaderContext,
    state: B.State,
    request: Empty
  ): Promise<PartialMessage<GetResponse>> {
    let { combinedResponse } = await C.ref("C").getCState(context);
    combinedResponse = state.bState + combinedResponse;
    return { combinedResponse };
  }

  async updateBState(
    context: WriterContext,
    state: B.State,
    request: PartialMessage<UpdateBStateResponse>
  ): Promise<PartialMessage<Empty>> {
    state.bState = request.bState;
    return {};
  }
}

export class CServicer extends C.Servicer {
  authorizer() {
    return allow();
  }

  async getCState(
    context: ReaderContext,
    state: C.State,
    request: Empty
  ): Promise<PartialMessage<GetResponse>> {
    return { combinedResponse: state.cState };
  }

  async updateCState(
    context: WriterContext,
    state: C.State,
    request: PartialMessage<UpdateCStateResponse>
  ): Promise<PartialMessage<Empty>> {
    state.cState = request.cState;
    return {};
  }
}
