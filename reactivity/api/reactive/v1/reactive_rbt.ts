/* eslint-disable */
// @ts-nocheck

import { reboot_native, ensureError } from "@reboot-dev/reboot";


import {
  Empty
} from "@bufbuild/protobuf";
import {
  GetResponse,
  UpdateAStateRequest,
  UpdateBStateResponse,
  UpdateCStateResponse,
} from "./reactive_pb.js";

// Additionally re-export all messages_and_enums from the pb module.
export {
  GetResponse,
  UpdateAStateRequest,
  UpdateBStateResponse,
  UpdateCStateResponse,
};

import {
  A as AProto,
} from "./reactive_pb.js";
import {
  B as BProto,
} from "./reactive_pb.js";
import {
  C as CProto,
} from "./reactive_pb.js";

import * as uuid from "uuid";

import * as reboot from "@reboot-dev/reboot";
import {
  Context,
  ExternalContext,
  WorkflowContext,
  ReaderContext,
  WriterContext,
  TransactionContext,
} from "@reboot-dev/reboot";
import * as protobuf_es from "@bufbuild/protobuf";
import * as reboot_api from "@reboot-dev/reboot-api";


// To support writers seeing partial updates of transactions,
// and transactions seeing updates from writers, we need to store
// a reference to the latest state in an ongoing transaction.
//
// Moreover, we need to update that _reference_ after each writer
// executes within a transaction. We do that in the generated
// code, see below.
const ongoingTransactionStates: { [id: string] : any; } = {};

const ERROR_TYPES = [
  // gRPC errors.
  reboot_api.errors_pb.Cancelled,
  reboot_api.errors_pb.Unknown,
  reboot_api.errors_pb.InvalidArgument,
  reboot_api.errors_pb.DeadlineExceeded,
  reboot_api.errors_pb.NotFound,
  reboot_api.errors_pb.AlreadyExists,
  reboot_api.errors_pb.PermissionDenied,
  reboot_api.errors_pb.ResourceExhausted,
  reboot_api.errors_pb.FailedPrecondition,
  reboot_api.errors_pb.Aborted,
  reboot_api.errors_pb.OutOfRange,
  reboot_api.errors_pb.Unimplemented,
  reboot_api.errors_pb.Internal,
  reboot_api.errors_pb.Unavailable,
  reboot_api.errors_pb.DataLoss,
  reboot_api.errors_pb.Unauthenticated,
  // Reboot errors.
  //
  // NOTE: also add any new errors into `rbt/v1alpha1/index.ts`.
  reboot_api.errors_pb.StateAlreadyConstructed,
  reboot_api.errors_pb.StateNotConstructed,
  reboot_api.errors_pb.TransactionParticipantFailedToPrepare,
  reboot_api.errors_pb.TransactionParticipantFailedToCommit,
  reboot_api.errors_pb.UnknownService,
  reboot_api.errors_pb.UnknownTask,
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!


type ARequestTypes =
        Empty
        | UpdateAStateRequest
;

const A_GET_A_STATE_ERROR_TYPES = [
  ...ERROR_TYPES,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

type AGetAStateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof A_GET_A_STATE_ERROR_TYPES
  >[number];

const A_UPDATE_A_STATE_ERROR_TYPES = [
  ...ERROR_TYPES,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

type AUpdateAStateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof A_UPDATE_A_STATE_ERROR_TYPES
  >[number];



type BRequestTypes =
        Empty
        | UpdateBStateResponse
;

const B_GET_B_STATE_ERROR_TYPES = [
  ...ERROR_TYPES,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

type BGetBStateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof B_GET_B_STATE_ERROR_TYPES
  >[number];

const B_UPDATE_B_STATE_ERROR_TYPES = [
  ...ERROR_TYPES,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

type BUpdateBStateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof B_UPDATE_B_STATE_ERROR_TYPES
  >[number];



type CRequestTypes =
        Empty
        | UpdateCStateResponse
;

const C_GET_C_STATE_ERROR_TYPES = [
  ...ERROR_TYPES,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

type CGetCStateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof C_GET_C_STATE_ERROR_TYPES
  >[number];

const C_UPDATE_C_STATE_ERROR_TYPES = [
  ...ERROR_TYPES,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

type CUpdateCStateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof C_UPDATE_C_STATE_ERROR_TYPES
  >[number];



export abstract class AServicer extends reboot.Servicer<A.State> {
  static __rbtModule__ = "reactive.v1.reactive_rbt";
  static __servicerNodeAdaptor__ = "AServicerNodeAdaptor";

  // External reference to the native `Servicer`.
  #external?: any | undefined;

  protected ref(
    options?: { bearerToken?: string }
  ) {
    const context = reboot.getContext();
    return new A.WeakReference(context.stateId, options?.bearerToken);
  }

  abstract getAState(
    context: ReaderContext,
    state: A.State,
    request: Empty,
  ): Promise<
  GetResponse | protobuf_es.PartialMessage<GetResponse>
  >;

  async _GetAState(
    context: ReaderContext,
    jsonState: string,
    jsonRequest: string
  ): Promise<string> {
    try {
      let state = A.State.fromJsonString(
        jsonState
      );
      const response = await reboot.runWithContext(context, () => {
        return this.getAState(
          context,
          state,
          Empty.fromJsonString(jsonRequest)
        );
      });
      return JSON.stringify({
        response
      });
    } catch (e) {
      if (e instanceof reboot_api.Aborted) {
        return JSON.stringify({
          status: e.toStatus()
        });
      }

      // Ensure we have an `Error` and then `console.error()` it so
      // that developers see a stack trace of what is going on.
      //
      // Only do this if it IS NOT an `Aborted` which we handle above.
      const error = ensureError(e);
      // Write an empy message which includes a newline to make it
      // easier to identify the stack trace.
      console.error("");
      console.error(error);
      console.error("");
      console.error(
        `Unhandled error in 'reactive.v1.A.getAState'; propagating as 'Unknown'\n`
      );

      throw error;
    }
  }

  abstract updateAState(
    context: WriterContext,
    state: A.State,
    request: UpdateAStateRequest,
  ): Promise<
  Empty | protobuf_es.PartialMessage<Empty>
  >;

  async _UpdateAState(
    context: WriterContext,
    jsonState: string,
    jsonRequest: string
  ): Promise<string> {
    try {
      let state = A.State.fromJsonString(
        jsonState
      );
      if (context.stateId in ongoingTransactionStates) {
        state = ongoingTransactionStates[context.stateId].clone();
      }
      const response = await reboot.runWithContext(context, () => {
        return this.updateAState(
          context,
          state,
          UpdateAStateRequest.fromJsonString(jsonRequest)
        );
      });
      // TODO: it's premature to overwrite the state now given that the
      // writer might still "fail" and an error will get propagated back
      // to the ongoing transaction which will still see the effects of
      // this writer. What we should be doing instead is creating a
      // callback API that we invoke only after a writer completes
      // that lets us update the state _reference_ then.
      if (context.stateId in ongoingTransactionStates) {
        ongoingTransactionStates[context.stateId].copyFrom(state);
      }
      return JSON.stringify({
        effects: new A.UpdateAStateEffects({ state, response })
      });
    } catch (e) {
      if (e instanceof reboot_api.Aborted) {
        return JSON.stringify({
          status: e.toStatus()
        });
      }

      // Ensure we have an `Error` and then `console.error()` it so
      // that developers see a stack trace of what is going on.
      //
      // Only do this if it IS NOT an `Aborted` which we handle above.
      const error = ensureError(e);
      // Write an empy message which includes a newline to make it
      // easier to identify the stack trace.
      console.error("");
      console.error(error);
      console.error("");
      console.error(
        `Unhandled error in 'reactive.v1.A.updateAState'; propagating as 'Unknown'\n`
      );

      throw error;
    }
  }


  __storeExternal(external: any) {
    this.#external = external;
  }

  get __external() {
    if (this.#external === undefined) {
      throw new Error(`Unexpected undefined external`);
    }
    return this.#external;
  }

  authorizer(): reboot.Authorizer<A.State, ARequestTypes> | reboot.AuthorizerRule<A.State, ARequestTypes> | null {
    return null;
  }

  _authorizer() {
    // Get authorizer, if any, converting from a rule if necessary.
    const authorizer = ((authorizerOrRule) => {
      if (authorizerOrRule instanceof reboot.AuthorizerRule) {
        return new AAuthorizer({ _default: authorizerOrRule });
      }
      return authorizerOrRule;
    })(this.authorizer());

    if (authorizer !== null) {
      authorizer._authorize = async function(
        methodName: string,
        context: ReaderContext,
        bytesState?: Uint8Array,
        bytesRequest?: Uint8Array
      ): Promise<Uint8Array> {
        let state: A.State | undefined = undefined;
        if (bytesState !== undefined) {
          state = A.State.fromBinary(bytesState);
        }
        let request: ARequestTypes | undefined  = undefined;
        const anyRequest = protobuf_es.Any.fromBinary(bytesRequest);
        if (anyRequest.is(Empty)) {
          request = new Empty();
          anyRequest.unpackTo(request);
        } else if (anyRequest.is(UpdateAStateRequest)) {
          request = new UpdateAStateRequest();
          anyRequest.unpackTo(request);
        } else {
          throw new Error(`Unexpected type for ${request}: ${anyRequest.typeUrl}.`);
        }
        return protobuf_es.Any.pack(
          await authorizer.authorize(methodName, context, state, request)
        ).toBinary();
      };
    }
    return authorizer;
  }

  static _State = class {

    #servicer: AServicer

    constructor(servicer: AServicer) {
      this.#servicer = servicer;
    }

    async read(
      context: reboot.WorkflowContext
    ): Promise<A.State> {
      return A.State.fromJsonString(
        await reboot_native.Servicer_read(
          this.#servicer.__external,
          context.__external
        )
      );
    }

    async write(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: A.State) => Promise<void>,
      options?: {
        stringify?: undefined;
        parse?: undefined;
        validate?: undefined
      }
    ): Promise<void>;

    async write<T>(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: A.State) => Promise<T>,
      options: {
        stringify?: (result: T) => string;
        parse: (value: string) => T;
        validate?: undefined;
      } | {
        stringify?: (result: T) => string;
        parse?: undefined;
        validate: (result: T) => boolean;
      }
    ): Promise<T>;

    async write<T>(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: A.State) => Promise<T>,
      options: {
        stringify?: (result: T) => string;
        parse?: (value: string) => T;
        validate?: (result: T) => boolean
      } = {}
    ): Promise<void | T> {
      return await this.idempotently(idempotencyAlias)
        .write(context, writer, options);
    }

    static _Idempotently = class {

      #external: any;
      #options: reboot_api.IdempotencyOptions;

      constructor(external: any, options: reboot_api.IdempotencyOptions) {
        this.#external = external;
        this.#options = options;
      }

      async write(
        context: reboot.WorkflowContext,
        writer: (state: A.State) => Promise<void>,
        options?: {
          stringify?: undefined;
          parse?: undefined;
          validate?: undefined
        },
        unidempotently?: boolean
      ): Promise<void>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: A.State) => Promise<T>,
        options: {
          stringify?: (result: T) => string;
          parse: (value: string) => T;
          validate?: undefined;
        } | {
          stringify?: (result: T) => string;
          parse?: undefined;
          validate: (result: T) => boolean;
        },
        unidempotently?: boolean
      ): Promise<T>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: A.State) => Promise<T>,
        {
          stringify = JSON.stringify,
          parse = JSON.parse,
          validate
        }: {
          stringify?: (result: T) => string;
          parse?: (value: string) => T;
          validate?: (result: T) => boolean
        },
        unidempotently: boolean = false,
      ): Promise<void | T> {
        const result = await reboot_native.Servicer_write(
          this.#external,
          context.__external,
          async (jsonState: string) => {
            const state = A.State.fromJsonString(
              jsonState
            );
            try {
              const t = await writer(state);

              // Fail early if the developer thinks that they have some value
              // that they want to validate but we got `undefined`.
              if (t === undefined && validate !== undefined) {
                throw new Error(
                  "Not expecting `validate` as you are returning `void` (or explicitly `undefined`); did you mean to return a value (or if you want to explicitly return the absence of a value use `null`)"
                );
              }

              return JSON.stringify({
                // NOTE: we use the empty string to represent a
                // `callable` returning `void` (or explicitly
                // `undefined`).
                //
                // To differentiate returning `void` (or explicitly
                // `undefined`) from `stringify` returning an empty
                // string we use `{ value: stringify(t) }`.
                result: (
                  t !== undefined && JSON.stringify({ value: stringify(t) })
                ) || "",
                state,
              });
            } catch (e) {
              throw ensureError(e);
            }
          },
          JSON.stringify({ idempotency: this.#options, unidempotently }),
        );

        // NOTE: we parse and validate `value` every time, even the first
        // time, so as to catch bugs where the `value` returned from
        // `callable` might not parse or be valid. We will have already
        // persisted `result`, so in the event of a bug the developer will
        // have to change the idempotency alias so that `callable` is
        // re-executed. These semantics are the same as Python (although
        // Python uses the `type` keyword argument instead of the
        // `parse` and `validate` properties we use here).

        // TODO: assert(result !== undefined);

        if (result !== "") {
          const { value } = JSON.parse(result);
          const t = parse(value);
          if (!unidempotently) {
            if (parse !== JSON.parse) {
              if (validate === undefined) {
                throw new Error("Missing `validate` property");
              } else if (!validate(t)) {
                throw new Error("Failed to validate memoized result");
              }
            }
          }
          return t;
        }

        // TODO: assert(result === "");

        // Otherwise `callable` must have returned void (or explicitly
        // `undefined`), fall through.
      }
    };

    public idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions) {
      const options = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String)
        ? { alias: aliasOrOptions }
        : aliasOrOptions;
      if (options.alias === undefined && options.key === undefined) {
        throw new Error(
          "Inline writers require either an idempotency alias or key"
        );
      }
      return new AServicer._State._Idempotently(
        this.#servicer.__external,
        options,
      );
    }

    static _Unidempotently = class {

      #external: any;

      constructor(external: any) {
        this.#external = external;
      }

      async write(
        context: reboot.WorkflowContext,
        writer: (state: A.State) => Promise<void>
      ): Promise<void>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: A.State) => Promise<T>
      ): Promise<T>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: A.State) => Promise<T>
      ): Promise<T> {
        return new AServicer._State._Idempotently(
          this.#external,
          { key: uuid.v4() }
        ).write<T>(
          context,
          writer,
          {},
          true
        );
      }
    };

    public unidempotently() {
      return new AServicer._State._Unidempotently(
        this.#servicer.__external
      );
    }
  };

  get state() {
    return new AServicer._State(this);
  }
}

export type AAuthorizerRules = {
  getAState?: reboot.AuthorizerRule<A.State, Empty>;
  updateAState?: reboot.AuthorizerRule<A.State, UpdateAStateRequest>;
};

export class AAuthorizer extends reboot.Authorizer<A.State, ARequestTypes> {

  #rules: AAuthorizerRules & {
    _default: reboot.AuthorizerRule<A.State, protobuf_es.Message>;
  };

  constructor(
    rules: AAuthorizerRules & {
      _default?: reboot.AuthorizerRule<A.State, protobuf_es.Message>;
    }
  ) {
    super();
    this.#rules = { ...rules, _default: rules._default ?? reboot.allowIf({ all: [ reboot.isAppInternal ] }) };
  }

  async authorize(
    methodName: string,
    context: ReaderContext,
    state?: A.State,
    request?: ARequestTypes
  ): Promise<reboot.AuthorizerDecision> {
    if (methodName == 'reactive.v1.AMethods.GetAState') {
      return await this.getAState(
        context,
        state,
        request as Empty,
      );
    } else if (methodName == 'reactive.v1.AMethods.UpdateAState') {
      return await this.updateAState(
        context,
        state,
        request as UpdateAStateRequest,
      );
    } else {
      return new reboot_api.errors_pb.PermissionDenied();
    }
  }

  async getAState(
    context: ReaderContext,
    state: A.State,
    request: Empty,
  ): Promise<reboot.AuthorizerDecision> {
    return await (
      this.#rules.getAState ?? this.#rules._default
    ).execute({
      context,
      state,
      request: request as Empty,
    });
  }
  async updateAState(
    context: ReaderContext,
    state: A.State,
    request: UpdateAStateRequest,
  ): Promise<reboot.AuthorizerDecision> {
    return await (
      this.#rules.updateAState ?? this.#rules._default
    ).execute({
      context,
      state,
      request: request as UpdateAStateRequest,
    });
  }
}

export abstract class BServicer extends reboot.Servicer<B.State> {
  static __rbtModule__ = "reactive.v1.reactive_rbt";
  static __servicerNodeAdaptor__ = "BServicerNodeAdaptor";

  // External reference to the native `Servicer`.
  #external?: any | undefined;

  protected ref(
    options?: { bearerToken?: string }
  ) {
    const context = reboot.getContext();
    return new B.WeakReference(context.stateId, options?.bearerToken);
  }

  abstract getBState(
    context: ReaderContext,
    state: B.State,
    request: Empty,
  ): Promise<
  GetResponse | protobuf_es.PartialMessage<GetResponse>
  >;

  async _GetBState(
    context: ReaderContext,
    jsonState: string,
    jsonRequest: string
  ): Promise<string> {
    try {
      let state = B.State.fromJsonString(
        jsonState
      );
      const response = await reboot.runWithContext(context, () => {
        return this.getBState(
          context,
          state,
          Empty.fromJsonString(jsonRequest)
        );
      });
      return JSON.stringify({
        response
      });
    } catch (e) {
      if (e instanceof reboot_api.Aborted) {
        return JSON.stringify({
          status: e.toStatus()
        });
      }

      // Ensure we have an `Error` and then `console.error()` it so
      // that developers see a stack trace of what is going on.
      //
      // Only do this if it IS NOT an `Aborted` which we handle above.
      const error = ensureError(e);
      // Write an empy message which includes a newline to make it
      // easier to identify the stack trace.
      console.error("");
      console.error(error);
      console.error("");
      console.error(
        `Unhandled error in 'reactive.v1.B.getBState'; propagating as 'Unknown'\n`
      );

      throw error;
    }
  }

  abstract updateBState(
    context: WriterContext,
    state: B.State,
    request: UpdateBStateResponse,
  ): Promise<
  Empty | protobuf_es.PartialMessage<Empty>
  >;

  async _UpdateBState(
    context: WriterContext,
    jsonState: string,
    jsonRequest: string
  ): Promise<string> {
    try {
      let state = B.State.fromJsonString(
        jsonState
      );
      if (context.stateId in ongoingTransactionStates) {
        state = ongoingTransactionStates[context.stateId].clone();
      }
      const response = await reboot.runWithContext(context, () => {
        return this.updateBState(
          context,
          state,
          UpdateBStateResponse.fromJsonString(jsonRequest)
        );
      });
      // TODO: it's premature to overwrite the state now given that the
      // writer might still "fail" and an error will get propagated back
      // to the ongoing transaction which will still see the effects of
      // this writer. What we should be doing instead is creating a
      // callback API that we invoke only after a writer completes
      // that lets us update the state _reference_ then.
      if (context.stateId in ongoingTransactionStates) {
        ongoingTransactionStates[context.stateId].copyFrom(state);
      }
      return JSON.stringify({
        effects: new B.UpdateBStateEffects({ state, response })
      });
    } catch (e) {
      if (e instanceof reboot_api.Aborted) {
        return JSON.stringify({
          status: e.toStatus()
        });
      }

      // Ensure we have an `Error` and then `console.error()` it so
      // that developers see a stack trace of what is going on.
      //
      // Only do this if it IS NOT an `Aborted` which we handle above.
      const error = ensureError(e);
      // Write an empy message which includes a newline to make it
      // easier to identify the stack trace.
      console.error("");
      console.error(error);
      console.error("");
      console.error(
        `Unhandled error in 'reactive.v1.B.updateBState'; propagating as 'Unknown'\n`
      );

      throw error;
    }
  }


  __storeExternal(external: any) {
    this.#external = external;
  }

  get __external() {
    if (this.#external === undefined) {
      throw new Error(`Unexpected undefined external`);
    }
    return this.#external;
  }

  authorizer(): reboot.Authorizer<B.State, BRequestTypes> | reboot.AuthorizerRule<B.State, BRequestTypes> | null {
    return null;
  }

  _authorizer() {
    // Get authorizer, if any, converting from a rule if necessary.
    const authorizer = ((authorizerOrRule) => {
      if (authorizerOrRule instanceof reboot.AuthorizerRule) {
        return new BAuthorizer({ _default: authorizerOrRule });
      }
      return authorizerOrRule;
    })(this.authorizer());

    if (authorizer !== null) {
      authorizer._authorize = async function(
        methodName: string,
        context: ReaderContext,
        bytesState?: Uint8Array,
        bytesRequest?: Uint8Array
      ): Promise<Uint8Array> {
        let state: B.State | undefined = undefined;
        if (bytesState !== undefined) {
          state = B.State.fromBinary(bytesState);
        }
        let request: BRequestTypes | undefined  = undefined;
        const anyRequest = protobuf_es.Any.fromBinary(bytesRequest);
        if (anyRequest.is(Empty)) {
          request = new Empty();
          anyRequest.unpackTo(request);
        } else if (anyRequest.is(UpdateBStateResponse)) {
          request = new UpdateBStateResponse();
          anyRequest.unpackTo(request);
        } else {
          throw new Error(`Unexpected type for ${request}: ${anyRequest.typeUrl}.`);
        }
        return protobuf_es.Any.pack(
          await authorizer.authorize(methodName, context, state, request)
        ).toBinary();
      };
    }
    return authorizer;
  }

  static _State = class {

    #servicer: BServicer

    constructor(servicer: BServicer) {
      this.#servicer = servicer;
    }

    async read(
      context: reboot.WorkflowContext
    ): Promise<B.State> {
      return B.State.fromJsonString(
        await reboot_native.Servicer_read(
          this.#servicer.__external,
          context.__external
        )
      );
    }

    async write(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: B.State) => Promise<void>,
      options?: {
        stringify?: undefined;
        parse?: undefined;
        validate?: undefined
      }
    ): Promise<void>;

    async write<T>(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: B.State) => Promise<T>,
      options: {
        stringify?: (result: T) => string;
        parse: (value: string) => T;
        validate?: undefined;
      } | {
        stringify?: (result: T) => string;
        parse?: undefined;
        validate: (result: T) => boolean;
      }
    ): Promise<T>;

    async write<T>(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: B.State) => Promise<T>,
      options: {
        stringify?: (result: T) => string;
        parse?: (value: string) => T;
        validate?: (result: T) => boolean
      } = {}
    ): Promise<void | T> {
      return await this.idempotently(idempotencyAlias)
        .write(context, writer, options);
    }

    static _Idempotently = class {

      #external: any;
      #options: reboot_api.IdempotencyOptions;

      constructor(external: any, options: reboot_api.IdempotencyOptions) {
        this.#external = external;
        this.#options = options;
      }

      async write(
        context: reboot.WorkflowContext,
        writer: (state: B.State) => Promise<void>,
        options?: {
          stringify?: undefined;
          parse?: undefined;
          validate?: undefined
        },
        unidempotently?: boolean
      ): Promise<void>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: B.State) => Promise<T>,
        options: {
          stringify?: (result: T) => string;
          parse: (value: string) => T;
          validate?: undefined;
        } | {
          stringify?: (result: T) => string;
          parse?: undefined;
          validate: (result: T) => boolean;
        },
        unidempotently?: boolean
      ): Promise<T>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: B.State) => Promise<T>,
        {
          stringify = JSON.stringify,
          parse = JSON.parse,
          validate
        }: {
          stringify?: (result: T) => string;
          parse?: (value: string) => T;
          validate?: (result: T) => boolean
        },
        unidempotently: boolean = false,
      ): Promise<void | T> {
        const result = await reboot_native.Servicer_write(
          this.#external,
          context.__external,
          async (jsonState: string) => {
            const state = B.State.fromJsonString(
              jsonState
            );
            try {
              const t = await writer(state);

              // Fail early if the developer thinks that they have some value
              // that they want to validate but we got `undefined`.
              if (t === undefined && validate !== undefined) {
                throw new Error(
                  "Not expecting `validate` as you are returning `void` (or explicitly `undefined`); did you mean to return a value (or if you want to explicitly return the absence of a value use `null`)"
                );
              }

              return JSON.stringify({
                // NOTE: we use the empty string to represent a
                // `callable` returning `void` (or explicitly
                // `undefined`).
                //
                // To differentiate returning `void` (or explicitly
                // `undefined`) from `stringify` returning an empty
                // string we use `{ value: stringify(t) }`.
                result: (
                  t !== undefined && JSON.stringify({ value: stringify(t) })
                ) || "",
                state,
              });
            } catch (e) {
              throw ensureError(e);
            }
          },
          JSON.stringify({ idempotency: this.#options, unidempotently }),
        );

        // NOTE: we parse and validate `value` every time, even the first
        // time, so as to catch bugs where the `value` returned from
        // `callable` might not parse or be valid. We will have already
        // persisted `result`, so in the event of a bug the developer will
        // have to change the idempotency alias so that `callable` is
        // re-executed. These semantics are the same as Python (although
        // Python uses the `type` keyword argument instead of the
        // `parse` and `validate` properties we use here).

        // TODO: assert(result !== undefined);

        if (result !== "") {
          const { value } = JSON.parse(result);
          const t = parse(value);
          if (!unidempotently) {
            if (parse !== JSON.parse) {
              if (validate === undefined) {
                throw new Error("Missing `validate` property");
              } else if (!validate(t)) {
                throw new Error("Failed to validate memoized result");
              }
            }
          }
          return t;
        }

        // TODO: assert(result === "");

        // Otherwise `callable` must have returned void (or explicitly
        // `undefined`), fall through.
      }
    };

    public idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions) {
      const options = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String)
        ? { alias: aliasOrOptions }
        : aliasOrOptions;
      if (options.alias === undefined && options.key === undefined) {
        throw new Error(
          "Inline writers require either an idempotency alias or key"
        );
      }
      return new BServicer._State._Idempotently(
        this.#servicer.__external,
        options,
      );
    }

    static _Unidempotently = class {

      #external: any;

      constructor(external: any) {
        this.#external = external;
      }

      async write(
        context: reboot.WorkflowContext,
        writer: (state: B.State) => Promise<void>
      ): Promise<void>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: B.State) => Promise<T>
      ): Promise<T>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: B.State) => Promise<T>
      ): Promise<T> {
        return new BServicer._State._Idempotently(
          this.#external,
          { key: uuid.v4() }
        ).write<T>(
          context,
          writer,
          {},
          true
        );
      }
    };

    public unidempotently() {
      return new BServicer._State._Unidempotently(
        this.#servicer.__external
      );
    }
  };

  get state() {
    return new BServicer._State(this);
  }
}

export type BAuthorizerRules = {
  getBState?: reboot.AuthorizerRule<B.State, Empty>;
  updateBState?: reboot.AuthorizerRule<B.State, UpdateBStateResponse>;
};

export class BAuthorizer extends reboot.Authorizer<B.State, BRequestTypes> {

  #rules: BAuthorizerRules & {
    _default: reboot.AuthorizerRule<B.State, protobuf_es.Message>;
  };

  constructor(
    rules: BAuthorizerRules & {
      _default?: reboot.AuthorizerRule<B.State, protobuf_es.Message>;
    }
  ) {
    super();
    this.#rules = { ...rules, _default: rules._default ?? reboot.allowIf({ all: [ reboot.isAppInternal ] }) };
  }

  async authorize(
    methodName: string,
    context: ReaderContext,
    state?: B.State,
    request?: BRequestTypes
  ): Promise<reboot.AuthorizerDecision> {
    if (methodName == 'reactive.v1.BMethods.GetBState') {
      return await this.getBState(
        context,
        state,
        request as Empty,
      );
    } else if (methodName == 'reactive.v1.BMethods.UpdateBState') {
      return await this.updateBState(
        context,
        state,
        request as UpdateBStateResponse,
      );
    } else {
      return new reboot_api.errors_pb.PermissionDenied();
    }
  }

  async getBState(
    context: ReaderContext,
    state: B.State,
    request: Empty,
  ): Promise<reboot.AuthorizerDecision> {
    return await (
      this.#rules.getBState ?? this.#rules._default
    ).execute({
      context,
      state,
      request: request as Empty,
    });
  }
  async updateBState(
    context: ReaderContext,
    state: B.State,
    request: UpdateBStateResponse,
  ): Promise<reboot.AuthorizerDecision> {
    return await (
      this.#rules.updateBState ?? this.#rules._default
    ).execute({
      context,
      state,
      request: request as UpdateBStateResponse,
    });
  }
}

export abstract class CServicer extends reboot.Servicer<C.State> {
  static __rbtModule__ = "reactive.v1.reactive_rbt";
  static __servicerNodeAdaptor__ = "CServicerNodeAdaptor";

  // External reference to the native `Servicer`.
  #external?: any | undefined;

  protected ref(
    options?: { bearerToken?: string }
  ) {
    const context = reboot.getContext();
    return new C.WeakReference(context.stateId, options?.bearerToken);
  }

  abstract getCState(
    context: ReaderContext,
    state: C.State,
    request: Empty,
  ): Promise<
  GetResponse | protobuf_es.PartialMessage<GetResponse>
  >;

  async _GetCState(
    context: ReaderContext,
    jsonState: string,
    jsonRequest: string
  ): Promise<string> {
    try {
      let state = C.State.fromJsonString(
        jsonState
      );
      const response = await reboot.runWithContext(context, () => {
        return this.getCState(
          context,
          state,
          Empty.fromJsonString(jsonRequest)
        );
      });
      return JSON.stringify({
        response
      });
    } catch (e) {
      if (e instanceof reboot_api.Aborted) {
        return JSON.stringify({
          status: e.toStatus()
        });
      }

      // Ensure we have an `Error` and then `console.error()` it so
      // that developers see a stack trace of what is going on.
      //
      // Only do this if it IS NOT an `Aborted` which we handle above.
      const error = ensureError(e);
      // Write an empy message which includes a newline to make it
      // easier to identify the stack trace.
      console.error("");
      console.error(error);
      console.error("");
      console.error(
        `Unhandled error in 'reactive.v1.C.getCState'; propagating as 'Unknown'\n`
      );

      throw error;
    }
  }

  abstract updateCState(
    context: WriterContext,
    state: C.State,
    request: UpdateCStateResponse,
  ): Promise<
  Empty | protobuf_es.PartialMessage<Empty>
  >;

  async _UpdateCState(
    context: WriterContext,
    jsonState: string,
    jsonRequest: string
  ): Promise<string> {
    try {
      let state = C.State.fromJsonString(
        jsonState
      );
      if (context.stateId in ongoingTransactionStates) {
        state = ongoingTransactionStates[context.stateId].clone();
      }
      const response = await reboot.runWithContext(context, () => {
        return this.updateCState(
          context,
          state,
          UpdateCStateResponse.fromJsonString(jsonRequest)
        );
      });
      // TODO: it's premature to overwrite the state now given that the
      // writer might still "fail" and an error will get propagated back
      // to the ongoing transaction which will still see the effects of
      // this writer. What we should be doing instead is creating a
      // callback API that we invoke only after a writer completes
      // that lets us update the state _reference_ then.
      if (context.stateId in ongoingTransactionStates) {
        ongoingTransactionStates[context.stateId].copyFrom(state);
      }
      return JSON.stringify({
        effects: new C.UpdateCStateEffects({ state, response })
      });
    } catch (e) {
      if (e instanceof reboot_api.Aborted) {
        return JSON.stringify({
          status: e.toStatus()
        });
      }

      // Ensure we have an `Error` and then `console.error()` it so
      // that developers see a stack trace of what is going on.
      //
      // Only do this if it IS NOT an `Aborted` which we handle above.
      const error = ensureError(e);
      // Write an empy message which includes a newline to make it
      // easier to identify the stack trace.
      console.error("");
      console.error(error);
      console.error("");
      console.error(
        `Unhandled error in 'reactive.v1.C.updateCState'; propagating as 'Unknown'\n`
      );

      throw error;
    }
  }


  __storeExternal(external: any) {
    this.#external = external;
  }

  get __external() {
    if (this.#external === undefined) {
      throw new Error(`Unexpected undefined external`);
    }
    return this.#external;
  }

  authorizer(): reboot.Authorizer<C.State, CRequestTypes> | reboot.AuthorizerRule<C.State, CRequestTypes> | null {
    return null;
  }

  _authorizer() {
    // Get authorizer, if any, converting from a rule if necessary.
    const authorizer = ((authorizerOrRule) => {
      if (authorizerOrRule instanceof reboot.AuthorizerRule) {
        return new CAuthorizer({ _default: authorizerOrRule });
      }
      return authorizerOrRule;
    })(this.authorizer());

    if (authorizer !== null) {
      authorizer._authorize = async function(
        methodName: string,
        context: ReaderContext,
        bytesState?: Uint8Array,
        bytesRequest?: Uint8Array
      ): Promise<Uint8Array> {
        let state: C.State | undefined = undefined;
        if (bytesState !== undefined) {
          state = C.State.fromBinary(bytesState);
        }
        let request: CRequestTypes | undefined  = undefined;
        const anyRequest = protobuf_es.Any.fromBinary(bytesRequest);
        if (anyRequest.is(Empty)) {
          request = new Empty();
          anyRequest.unpackTo(request);
        } else if (anyRequest.is(UpdateCStateResponse)) {
          request = new UpdateCStateResponse();
          anyRequest.unpackTo(request);
        } else {
          throw new Error(`Unexpected type for ${request}: ${anyRequest.typeUrl}.`);
        }
        return protobuf_es.Any.pack(
          await authorizer.authorize(methodName, context, state, request)
        ).toBinary();
      };
    }
    return authorizer;
  }

  static _State = class {

    #servicer: CServicer

    constructor(servicer: CServicer) {
      this.#servicer = servicer;
    }

    async read(
      context: reboot.WorkflowContext
    ): Promise<C.State> {
      return C.State.fromJsonString(
        await reboot_native.Servicer_read(
          this.#servicer.__external,
          context.__external
        )
      );
    }

    async write(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: C.State) => Promise<void>,
      options?: {
        stringify?: undefined;
        parse?: undefined;
        validate?: undefined
      }
    ): Promise<void>;

    async write<T>(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: C.State) => Promise<T>,
      options: {
        stringify?: (result: T) => string;
        parse: (value: string) => T;
        validate?: undefined;
      } | {
        stringify?: (result: T) => string;
        parse?: undefined;
        validate: (result: T) => boolean;
      }
    ): Promise<T>;

    async write<T>(
      idempotencyAlias: string,
      context: reboot.WorkflowContext,
      writer: (state: C.State) => Promise<T>,
      options: {
        stringify?: (result: T) => string;
        parse?: (value: string) => T;
        validate?: (result: T) => boolean
      } = {}
    ): Promise<void | T> {
      return await this.idempotently(idempotencyAlias)
        .write(context, writer, options);
    }

    static _Idempotently = class {

      #external: any;
      #options: reboot_api.IdempotencyOptions;

      constructor(external: any, options: reboot_api.IdempotencyOptions) {
        this.#external = external;
        this.#options = options;
      }

      async write(
        context: reboot.WorkflowContext,
        writer: (state: C.State) => Promise<void>,
        options?: {
          stringify?: undefined;
          parse?: undefined;
          validate?: undefined
        },
        unidempotently?: boolean
      ): Promise<void>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: C.State) => Promise<T>,
        options: {
          stringify?: (result: T) => string;
          parse: (value: string) => T;
          validate?: undefined;
        } | {
          stringify?: (result: T) => string;
          parse?: undefined;
          validate: (result: T) => boolean;
        },
        unidempotently?: boolean
      ): Promise<T>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: C.State) => Promise<T>,
        {
          stringify = JSON.stringify,
          parse = JSON.parse,
          validate
        }: {
          stringify?: (result: T) => string;
          parse?: (value: string) => T;
          validate?: (result: T) => boolean
        },
        unidempotently: boolean = false,
      ): Promise<void | T> {
        const result = await reboot_native.Servicer_write(
          this.#external,
          context.__external,
          async (jsonState: string) => {
            const state = C.State.fromJsonString(
              jsonState
            );
            try {
              const t = await writer(state);

              // Fail early if the developer thinks that they have some value
              // that they want to validate but we got `undefined`.
              if (t === undefined && validate !== undefined) {
                throw new Error(
                  "Not expecting `validate` as you are returning `void` (or explicitly `undefined`); did you mean to return a value (or if you want to explicitly return the absence of a value use `null`)"
                );
              }

              return JSON.stringify({
                // NOTE: we use the empty string to represent a
                // `callable` returning `void` (or explicitly
                // `undefined`).
                //
                // To differentiate returning `void` (or explicitly
                // `undefined`) from `stringify` returning an empty
                // string we use `{ value: stringify(t) }`.
                result: (
                  t !== undefined && JSON.stringify({ value: stringify(t) })
                ) || "",
                state,
              });
            } catch (e) {
              throw ensureError(e);
            }
          },
          JSON.stringify({ idempotency: this.#options, unidempotently }),
        );

        // NOTE: we parse and validate `value` every time, even the first
        // time, so as to catch bugs where the `value` returned from
        // `callable` might not parse or be valid. We will have already
        // persisted `result`, so in the event of a bug the developer will
        // have to change the idempotency alias so that `callable` is
        // re-executed. These semantics are the same as Python (although
        // Python uses the `type` keyword argument instead of the
        // `parse` and `validate` properties we use here).

        // TODO: assert(result !== undefined);

        if (result !== "") {
          const { value } = JSON.parse(result);
          const t = parse(value);
          if (!unidempotently) {
            if (parse !== JSON.parse) {
              if (validate === undefined) {
                throw new Error("Missing `validate` property");
              } else if (!validate(t)) {
                throw new Error("Failed to validate memoized result");
              }
            }
          }
          return t;
        }

        // TODO: assert(result === "");

        // Otherwise `callable` must have returned void (or explicitly
        // `undefined`), fall through.
      }
    };

    public idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions) {
      const options = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String)
        ? { alias: aliasOrOptions }
        : aliasOrOptions;
      if (options.alias === undefined && options.key === undefined) {
        throw new Error(
          "Inline writers require either an idempotency alias or key"
        );
      }
      return new CServicer._State._Idempotently(
        this.#servicer.__external,
        options,
      );
    }

    static _Unidempotently = class {

      #external: any;

      constructor(external: any) {
        this.#external = external;
      }

      async write(
        context: reboot.WorkflowContext,
        writer: (state: C.State) => Promise<void>
      ): Promise<void>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: C.State) => Promise<T>
      ): Promise<T>;

      async write<T>(
        context: reboot.WorkflowContext,
        writer: (state: C.State) => Promise<T>
      ): Promise<T> {
        return new CServicer._State._Idempotently(
          this.#external,
          { key: uuid.v4() }
        ).write<T>(
          context,
          writer,
          {},
          true
        );
      }
    };

    public unidempotently() {
      return new CServicer._State._Unidempotently(
        this.#servicer.__external
      );
    }
  };

  get state() {
    return new CServicer._State(this);
  }
}

export type CAuthorizerRules = {
  getCState?: reboot.AuthorizerRule<C.State, Empty>;
  updateCState?: reboot.AuthorizerRule<C.State, UpdateCStateResponse>;
};

export class CAuthorizer extends reboot.Authorizer<C.State, CRequestTypes> {

  #rules: CAuthorizerRules & {
    _default: reboot.AuthorizerRule<C.State, protobuf_es.Message>;
  };

  constructor(
    rules: CAuthorizerRules & {
      _default?: reboot.AuthorizerRule<C.State, protobuf_es.Message>;
    }
  ) {
    super();
    this.#rules = { ...rules, _default: rules._default ?? reboot.allowIf({ all: [ reboot.isAppInternal ] }) };
  }

  async authorize(
    methodName: string,
    context: ReaderContext,
    state?: C.State,
    request?: CRequestTypes
  ): Promise<reboot.AuthorizerDecision> {
    if (methodName == 'reactive.v1.CMethods.GetCState') {
      return await this.getCState(
        context,
        state,
        request as Empty,
      );
    } else if (methodName == 'reactive.v1.CMethods.UpdateCState') {
      return await this.updateCState(
        context,
        state,
        request as UpdateCStateResponse,
      );
    } else {
      return new reboot_api.errors_pb.PermissionDenied();
    }
  }

  async getCState(
    context: ReaderContext,
    state: C.State,
    request: Empty,
  ): Promise<reboot.AuthorizerDecision> {
    return await (
      this.#rules.getCState ?? this.#rules._default
    ).execute({
      context,
      state,
      request: request as Empty,
    });
  }
  async updateCState(
    context: ReaderContext,
    state: C.State,
    request: UpdateCStateResponse,
  ): Promise<reboot.AuthorizerDecision> {
    return await (
      this.#rules.updateCState ?? this.#rules._default
    ).execute({
      context,
      state,
      request: request as UpdateCStateResponse,
    });
  }
}


export class AState extends AProto {

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<protobuf_es.BinaryReadOptions>
  ) {
    const state = new A.State();
    state.fromBinary(bytes, options);
    return state;
  }

  static fromJson(
    jsonValue: protobuf_es.JsonValue,
    options?: Partial<protobuf_es.JsonReadOptions>
  ) {
    const state = new A.State();
    state.fromJson(jsonValue, options);
    return state;
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<protobuf_es.JsonReadOptions>
  ) {
    const state = new A.State();
    state.fromJsonString(jsonString, options);
    return state;
  }

  public clone() {
    const state = new A.State();
    state.copyFrom(super.clone());
    return state;
  }

  public copyFrom(that: A.State | AProto) {
    // Unfortunately, protobuf-es does not have `CopyFrom` like Python
    // or C++ protobuf. Instead, protobuf-es has `fromJson` but it
    // performs a merge. Thus, we have to first clear all of the fields
    // in the message before calling `fromJson`.
    reboot.clearFields(this);
    this.fromJson(that.toJson());
  }
}


export class BState extends BProto {

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<protobuf_es.BinaryReadOptions>
  ) {
    const state = new B.State();
    state.fromBinary(bytes, options);
    return state;
  }

  static fromJson(
    jsonValue: protobuf_es.JsonValue,
    options?: Partial<protobuf_es.JsonReadOptions>
  ) {
    const state = new B.State();
    state.fromJson(jsonValue, options);
    return state;
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<protobuf_es.JsonReadOptions>
  ) {
    const state = new B.State();
    state.fromJsonString(jsonString, options);
    return state;
  }

  public clone() {
    const state = new B.State();
    state.copyFrom(super.clone());
    return state;
  }

  public copyFrom(that: B.State | BProto) {
    // Unfortunately, protobuf-es does not have `CopyFrom` like Python
    // or C++ protobuf. Instead, protobuf-es has `fromJson` but it
    // performs a merge. Thus, we have to first clear all of the fields
    // in the message before calling `fromJson`.
    reboot.clearFields(this);
    this.fromJson(that.toJson());
  }
}


export class CState extends CProto {

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<protobuf_es.BinaryReadOptions>
  ) {
    const state = new C.State();
    state.fromBinary(bytes, options);
    return state;
  }

  static fromJson(
    jsonValue: protobuf_es.JsonValue,
    options?: Partial<protobuf_es.JsonReadOptions>
  ) {
    const state = new C.State();
    state.fromJson(jsonValue, options);
    return state;
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<protobuf_es.JsonReadOptions>
  ) {
    const state = new C.State();
    state.fromJsonString(jsonString, options);
    return state;
  }

  public clone() {
    const state = new C.State();
    state.copyFrom(super.clone());
    return state;
  }

  public copyFrom(that: C.State | CProto) {
    // Unfortunately, protobuf-es does not have `CopyFrom` like Python
    // or C++ protobuf. Instead, protobuf-es has `fromJson` but it
    // performs a merge. Thus, we have to first clear all of the fields
    // in the message before calling `fromJson`.
    reboot.clearFields(this);
    this.fromJson(that.toJson());
  }
}




export class AGetAStateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      A_GET_A_STATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new A.GetAStateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new A.GetAStateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: AGetAStateAbortedError,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    this.error = error;

    let code = reboot_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  readonly error: AGetAStateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

export class AGetAStateTask {

  readonly taskId: reboot_api.tasks_pb.TaskId;

  #promise: Promise<GetResponse>;

  private constructor(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    taskId: reboot_api.tasks_pb.TaskId
  ) {
    this.taskId = taskId;
    this.#promise = new Promise(async (resolve, reject) => {
      const json = JSON.parse(
        await reboot_native.Task_await({
          context: context.__external,
          rbtModule: "reactive.v1.reactive_rbt",
          stateName: "A",
          method: "GetAState",
          jsonTaskId: JSON.stringify(taskId),
        })
      );

      if ("status" in json) {
        reject(
          A
            .GetAStateAborted
            .fromStatus(reboot_api.Status.fromJson(json["status"]))
        );
      } else {
        // TODO: assert("response" in json)
        resolve(GetResponse.fromJson(json["response"]));
      }
    });
  }

  static retrieve(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    { taskId }: { taskId: reboot_api.tasks_pb.TaskId }
  ) {
    return new AGetAStateTask(
      context, taskId
    );
  }

  then(...args: Parameters<Promise<GetResponse>["then"]>) {
    return this.#promise.then(...args);
  }
}


export class AUpdateAStateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      A_UPDATE_A_STATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new A.UpdateAStateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new A.UpdateAStateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: AUpdateAStateAbortedError,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    this.error = error;

    let code = reboot_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  readonly error: AUpdateAStateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

export class AUpdateAStateTask {

  readonly taskId: reboot_api.tasks_pb.TaskId;

  #promise: Promise<Empty>;

  private constructor(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    taskId: reboot_api.tasks_pb.TaskId
  ) {
    this.taskId = taskId;
    this.#promise = new Promise(async (resolve, reject) => {
      const json = JSON.parse(
        await reboot_native.Task_await({
          context: context.__external,
          rbtModule: "reactive.v1.reactive_rbt",
          stateName: "A",
          method: "UpdateAState",
          jsonTaskId: JSON.stringify(taskId),
        })
      );

      if ("status" in json) {
        reject(
          A
            .UpdateAStateAborted
            .fromStatus(reboot_api.Status.fromJson(json["status"]))
        );
      } else {
        // TODO: assert("response" in json)
        resolve(Empty.fromJson(json["response"]));
      }
    });
  }

  static retrieve(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    { taskId }: { taskId: reboot_api.tasks_pb.TaskId }
  ) {
    return new AUpdateAStateTask(
      context, taskId
    );
  }

  then(...args: Parameters<Promise<Empty>["then"]>) {
    return this.#promise.then(...args);
  }
}




export class BGetBStateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      B_GET_B_STATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new B.GetBStateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new B.GetBStateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: BGetBStateAbortedError,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    this.error = error;

    let code = reboot_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  readonly error: BGetBStateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

export class BGetBStateTask {

  readonly taskId: reboot_api.tasks_pb.TaskId;

  #promise: Promise<GetResponse>;

  private constructor(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    taskId: reboot_api.tasks_pb.TaskId
  ) {
    this.taskId = taskId;
    this.#promise = new Promise(async (resolve, reject) => {
      const json = JSON.parse(
        await reboot_native.Task_await({
          context: context.__external,
          rbtModule: "reactive.v1.reactive_rbt",
          stateName: "B",
          method: "GetBState",
          jsonTaskId: JSON.stringify(taskId),
        })
      );

      if ("status" in json) {
        reject(
          B
            .GetBStateAborted
            .fromStatus(reboot_api.Status.fromJson(json["status"]))
        );
      } else {
        // TODO: assert("response" in json)
        resolve(GetResponse.fromJson(json["response"]));
      }
    });
  }

  static retrieve(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    { taskId }: { taskId: reboot_api.tasks_pb.TaskId }
  ) {
    return new BGetBStateTask(
      context, taskId
    );
  }

  then(...args: Parameters<Promise<GetResponse>["then"]>) {
    return this.#promise.then(...args);
  }
}


export class BUpdateBStateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      B_UPDATE_B_STATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new B.UpdateBStateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new B.UpdateBStateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: BUpdateBStateAbortedError,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    this.error = error;

    let code = reboot_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  readonly error: BUpdateBStateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

export class BUpdateBStateTask {

  readonly taskId: reboot_api.tasks_pb.TaskId;

  #promise: Promise<Empty>;

  private constructor(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    taskId: reboot_api.tasks_pb.TaskId
  ) {
    this.taskId = taskId;
    this.#promise = new Promise(async (resolve, reject) => {
      const json = JSON.parse(
        await reboot_native.Task_await({
          context: context.__external,
          rbtModule: "reactive.v1.reactive_rbt",
          stateName: "B",
          method: "UpdateBState",
          jsonTaskId: JSON.stringify(taskId),
        })
      );

      if ("status" in json) {
        reject(
          B
            .UpdateBStateAborted
            .fromStatus(reboot_api.Status.fromJson(json["status"]))
        );
      } else {
        // TODO: assert("response" in json)
        resolve(Empty.fromJson(json["response"]));
      }
    });
  }

  static retrieve(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    { taskId }: { taskId: reboot_api.tasks_pb.TaskId }
  ) {
    return new BUpdateBStateTask(
      context, taskId
    );
  }

  then(...args: Parameters<Promise<Empty>["then"]>) {
    return this.#promise.then(...args);
  }
}




export class CGetCStateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      C_GET_C_STATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new C.GetCStateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new C.GetCStateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: CGetCStateAbortedError,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    this.error = error;

    let code = reboot_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  readonly error: CGetCStateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

export class CGetCStateTask {

  readonly taskId: reboot_api.tasks_pb.TaskId;

  #promise: Promise<GetResponse>;

  private constructor(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    taskId: reboot_api.tasks_pb.TaskId
  ) {
    this.taskId = taskId;
    this.#promise = new Promise(async (resolve, reject) => {
      const json = JSON.parse(
        await reboot_native.Task_await({
          context: context.__external,
          rbtModule: "reactive.v1.reactive_rbt",
          stateName: "C",
          method: "GetCState",
          jsonTaskId: JSON.stringify(taskId),
        })
      );

      if ("status" in json) {
        reject(
          C
            .GetCStateAborted
            .fromStatus(reboot_api.Status.fromJson(json["status"]))
        );
      } else {
        // TODO: assert("response" in json)
        resolve(GetResponse.fromJson(json["response"]));
      }
    });
  }

  static retrieve(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    { taskId }: { taskId: reboot_api.tasks_pb.TaskId }
  ) {
    return new CGetCStateTask(
      context, taskId
    );
  }

  then(...args: Parameters<Promise<GetResponse>["then"]>) {
    return this.#promise.then(...args);
  }
}


export class CUpdateCStateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      C_UPDATE_C_STATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new C.UpdateCStateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new C.UpdateCStateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: CUpdateCStateAbortedError,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    this.error = error;

    let code = reboot_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  readonly error: CUpdateCStateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

export class CUpdateCStateTask {

  readonly taskId: reboot_api.tasks_pb.TaskId;

  #promise: Promise<Empty>;

  private constructor(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    taskId: reboot_api.tasks_pb.TaskId
  ) {
    this.taskId = taskId;
    this.#promise = new Promise(async (resolve, reject) => {
      const json = JSON.parse(
        await reboot_native.Task_await({
          context: context.__external,
          rbtModule: "reactive.v1.reactive_rbt",
          stateName: "C",
          method: "UpdateCState",
          jsonTaskId: JSON.stringify(taskId),
        })
      );

      if ("status" in json) {
        reject(
          C
            .UpdateCStateAborted
            .fromStatus(reboot_api.Status.fromJson(json["status"]))
        );
      } else {
        // TODO: assert("response" in json)
        resolve(Empty.fromJson(json["response"]));
      }
    });
  }

  static retrieve(
    context: reboot.WorkflowContext | reboot.ExternalContext,
    { taskId }: { taskId: reboot_api.tasks_pb.TaskId }
  ) {
    return new CUpdateCStateTask(
      context, taskId
    );
  }

  then(...args: Parameters<Promise<Empty>["then"]>) {
    return this.#promise.then(...args);
  }
}




export class AWeakReference {
  #external: any;
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string, bearerToken?: string) {
    this.#id = id;
    this.#options = {
      bearerToken: bearerToken,
    };
    this.#external = reboot_native.Service_constructor({
      rbtModule: "reactive.v1.reactive_rbt",
      nodeAdaptor: "AWeakReferenceNodeAdaptor",
      id: this.#id,
    });
  }

  get stateId(): string {
    return this.#id;
  }

  async __externalServiceCallGetAState(
    context: Context | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<Empty>,
    options?: reboot_api.CallOptions
  ): Promise<any> {
    const request = partialRequest instanceof Empty ?
      partialRequest : new Empty(partialRequest);

    const json = JSON.parse(
      await reboot_native.Service_call({
        external: this.#external,
        kind: "reader",
        method: "GetAState",
        requestModule: "google.protobuf.empty_pb2",
        requestType: "Empty",
        context: context.__external,
        jsonRequest: JSON.stringify(request || {}),
        jsonOptions: JSON.stringify(options || {}),
      })
    );

    if ("status" in json) {
      throw A
        .GetAStateAborted
        .fromStatus(reboot_api.Status.fromJson(json["status"]));
    }

    return json;
  }

  async getAState(
    context: ReaderContext | WriterContext | TransactionContext | WorkflowContext | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<Empty>,
  ): Promise<GetResponse> {
    const json = await this.__externalServiceCallGetAState(
      context,
      partialRequest,
      this.#options,
    );

    // TODO: assert("response" in json)

    return GetResponse.fromJson(json["response"]);
  }

  async __externalServiceCallUpdateAState(
    context: Context | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<UpdateAStateRequest>,
    options?: reboot_api.CallOptions
  ): Promise<any> {
    const request = partialRequest instanceof UpdateAStateRequest ?
      partialRequest : new UpdateAStateRequest(partialRequest);

    const json = JSON.parse(
      await reboot_native.Service_call({
        external: this.#external,
        kind: "writer",
        method: "UpdateAState",
        requestModule: "reactive.v1.reactive_pb2",
        requestType: "UpdateAStateRequest",
        context: context.__external,
        jsonRequest: JSON.stringify(request || {}),
        jsonOptions: JSON.stringify(options || {}),
      })
    );

    if ("status" in json) {
      throw A
        .UpdateAStateAborted
        .fromStatus(reboot_api.Status.fromJson(json["status"]));
    }

    return json;
  }

  async updateAState(
    context: TransactionContext | WorkflowContext | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<UpdateAStateRequest>,
  ): Promise<Empty> {
    const json = await this.__externalServiceCallUpdateAState(
      context,
      partialRequest,
      this.#options,
    );

    // TODO: assert("response" in json)

    return Empty.fromJson(json["response"]);
  }


  static _Idempotently = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async updateAState(
      context: reboot.TransactionContext | reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateAStateRequest>
    ): Promise<Empty> {
      const json = await this.#weakReference.__externalServiceCallUpdateAState(
        context,
        partialRequest,
        this.#options,
      );

       // TODO: assert("response" in json)

       return Empty.fromJson(json["response"]);
    }


    public schedule(options?: reboot_api.ScheduleOptions) {
      return new A.WeakReference._Schedule(
        this.#weakReference,
        {
          ...this.#options,
          schedule: options || { when: new Date() }
        },
      );
    }

    public spawn(options?: reboot_api.ScheduleOptions) {
      return new A.WeakReference._Spawn(
        this.#weakReference,
        {
          ...this.#options,
          schedule: options || { when: new Date() }
        },
      );
    }
  };

  public idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions = {} as reboot_api.IdempotencyOptions) {
    const idempotency = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String) ? { alias: aliasOrOptions } : aliasOrOptions;
    return new A.WeakReference._Idempotently(
      this,
      {
        ...this.#options,
        idempotency: idempotency,
      },
    );
  }

  public unidempotently() {
    return this.idempotently({ key: uuid.v4() });
  }

  static _Schedule = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions,
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async getAState(
      context: reboot.WriterContext | reboot.TransactionContext,
      partialRequest?: protobuf_es.PartialMessage<Empty>
    ): Promise<reboot_api.tasks_pb.TaskId> {
      const json = await this.#weakReference.__externalServiceCallGetAState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return taskId;
    }

    async updateAState(
      context: reboot.WriterContext | reboot.TransactionContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateAStateRequest>
    ): Promise<reboot_api.tasks_pb.TaskId> {
      const json = await this.#weakReference.__externalServiceCallUpdateAState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return taskId;
    }


  };

  public schedule(options?: reboot_api.ScheduleOptions) {
    return new A.WeakReference._Schedule(
      this,
      {
        ...this.#options,
        schedule: options || { when: new Date() }
      },
    );
  }

  static _Spawn = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions,
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async getAState(
      context: reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<Empty>
    ): Promise<{ task: AGetAStateTask }> {
      const json = await this.#weakReference.__externalServiceCallGetAState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return {
        task: A.GetAStateTask
          .retrieve(context, { taskId })
      };
    }

    async updateAState(
      context: reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateAStateRequest>
    ): Promise<{ task: AUpdateAStateTask }> {
      const json = await this.#weakReference.__externalServiceCallUpdateAState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return {
        task: A.UpdateAStateTask
          .retrieve(context, { taskId })
      };
    }


  };

  public spawn(options?: reboot_api.ScheduleOptions) {
    return new A.WeakReference._Spawn(
      this,
      {
        ...this.#options,
        schedule: options || { when: new Date() }
      },
    );
  }
}

export class A {

  static Servicer = AServicer;
  static State = AState;
  static Authorizer = AAuthorizer;
  static WeakReference = AWeakReference;


  static GetAStateAborted = AGetAStateAborted;

  static GetAStateTask = AGetAStateTask;



  static UpdateAStateAborted = AUpdateAStateAborted;

  static UpdateAStateTask = AUpdateAStateTask;

  static UpdateAStateEffects = class {
    state: AProto;
    response: Empty;

    constructor(effects: {
      state: protobuf_es.PartialMessage<AProto>;
      response: protobuf_es.PartialMessage<Empty>;
    }) {
      this.state = effects.state instanceof AProto
        ? effects.state
        : new AProto(effects.state);

      this.response = effects.response instanceof Empty
        ? effects.response
        : new Empty(effects.response);
    }
  };


  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new A.WeakReference(id, options?.bearerToken);
  }


  public static idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions = {} as reboot_api.IdempotencyOptions) {
    const idempotency = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String) ? { alias: aliasOrOptions } : aliasOrOptions;
    return new A._ConstructIdempotently(idempotency);
  }

  static _ConstructIdempotently = class {
    #idempotency: reboot_api.IdempotencyOptions;

    constructor(idempotency: reboot_api.IdempotencyOptions) {
      this.#idempotency = idempotency;
    }

  };
}

export namespace A {
  export type GetAStateAborted = typeof A.GetAStateAborted.prototype;
}
export namespace A {
  export type UpdateAStateAborted = typeof A.UpdateAStateAborted.prototype;
}

export namespace A {
  export type UpdateAStateTask = typeof A.UpdateAStateTask.prototype;
  export type UpdateAStateEffects = typeof A.UpdateAStateEffects.prototype;
}


export namespace A {
  export type RequestTypes = ARequestTypes;
  export type WeakReference = typeof A.WeakReference.prototype;
  export type State = typeof A.State.prototype;
}

export class BWeakReference {
  #external: any;
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string, bearerToken?: string) {
    this.#id = id;
    this.#options = {
      bearerToken: bearerToken,
    };
    this.#external = reboot_native.Service_constructor({
      rbtModule: "reactive.v1.reactive_rbt",
      nodeAdaptor: "BWeakReferenceNodeAdaptor",
      id: this.#id,
    });
  }

  get stateId(): string {
    return this.#id;
  }

  async __externalServiceCallGetBState(
    context: Context | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<Empty>,
    options?: reboot_api.CallOptions
  ): Promise<any> {
    const request = partialRequest instanceof Empty ?
      partialRequest : new Empty(partialRequest);

    const json = JSON.parse(
      await reboot_native.Service_call({
        external: this.#external,
        kind: "reader",
        method: "GetBState",
        requestModule: "google.protobuf.empty_pb2",
        requestType: "Empty",
        context: context.__external,
        jsonRequest: JSON.stringify(request || {}),
        jsonOptions: JSON.stringify(options || {}),
      })
    );

    if ("status" in json) {
      throw B
        .GetBStateAborted
        .fromStatus(reboot_api.Status.fromJson(json["status"]));
    }

    return json;
  }

  async getBState(
    context: ReaderContext | WriterContext | TransactionContext | WorkflowContext | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<Empty>,
  ): Promise<GetResponse> {
    const json = await this.__externalServiceCallGetBState(
      context,
      partialRequest,
      this.#options,
    );

    // TODO: assert("response" in json)

    return GetResponse.fromJson(json["response"]);
  }

  async __externalServiceCallUpdateBState(
    context: Context | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<UpdateBStateResponse>,
    options?: reboot_api.CallOptions
  ): Promise<any> {
    const request = partialRequest instanceof UpdateBStateResponse ?
      partialRequest : new UpdateBStateResponse(partialRequest);

    const json = JSON.parse(
      await reboot_native.Service_call({
        external: this.#external,
        kind: "writer",
        method: "UpdateBState",
        requestModule: "reactive.v1.reactive_pb2",
        requestType: "UpdateBStateResponse",
        context: context.__external,
        jsonRequest: JSON.stringify(request || {}),
        jsonOptions: JSON.stringify(options || {}),
      })
    );

    if ("status" in json) {
      throw B
        .UpdateBStateAborted
        .fromStatus(reboot_api.Status.fromJson(json["status"]));
    }

    return json;
  }

  async updateBState(
    context: TransactionContext | WorkflowContext | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<UpdateBStateResponse>,
  ): Promise<Empty> {
    const json = await this.__externalServiceCallUpdateBState(
      context,
      partialRequest,
      this.#options,
    );

    // TODO: assert("response" in json)

    return Empty.fromJson(json["response"]);
  }


  static _Idempotently = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async updateBState(
      context: reboot.TransactionContext | reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateBStateResponse>
    ): Promise<Empty> {
      const json = await this.#weakReference.__externalServiceCallUpdateBState(
        context,
        partialRequest,
        this.#options,
      );

       // TODO: assert("response" in json)

       return Empty.fromJson(json["response"]);
    }


    public schedule(options?: reboot_api.ScheduleOptions) {
      return new B.WeakReference._Schedule(
        this.#weakReference,
        {
          ...this.#options,
          schedule: options || { when: new Date() }
        },
      );
    }

    public spawn(options?: reboot_api.ScheduleOptions) {
      return new B.WeakReference._Spawn(
        this.#weakReference,
        {
          ...this.#options,
          schedule: options || { when: new Date() }
        },
      );
    }
  };

  public idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions = {} as reboot_api.IdempotencyOptions) {
    const idempotency = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String) ? { alias: aliasOrOptions } : aliasOrOptions;
    return new B.WeakReference._Idempotently(
      this,
      {
        ...this.#options,
        idempotency: idempotency,
      },
    );
  }

  public unidempotently() {
    return this.idempotently({ key: uuid.v4() });
  }

  static _Schedule = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions,
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async getBState(
      context: reboot.WriterContext | reboot.TransactionContext,
      partialRequest?: protobuf_es.PartialMessage<Empty>
    ): Promise<reboot_api.tasks_pb.TaskId> {
      const json = await this.#weakReference.__externalServiceCallGetBState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return taskId;
    }

    async updateBState(
      context: reboot.WriterContext | reboot.TransactionContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateBStateResponse>
    ): Promise<reboot_api.tasks_pb.TaskId> {
      const json = await this.#weakReference.__externalServiceCallUpdateBState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return taskId;
    }


  };

  public schedule(options?: reboot_api.ScheduleOptions) {
    return new B.WeakReference._Schedule(
      this,
      {
        ...this.#options,
        schedule: options || { when: new Date() }
      },
    );
  }

  static _Spawn = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions,
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async getBState(
      context: reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<Empty>
    ): Promise<{ task: BGetBStateTask }> {
      const json = await this.#weakReference.__externalServiceCallGetBState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return {
        task: B.GetBStateTask
          .retrieve(context, { taskId })
      };
    }

    async updateBState(
      context: reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateBStateResponse>
    ): Promise<{ task: BUpdateBStateTask }> {
      const json = await this.#weakReference.__externalServiceCallUpdateBState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return {
        task: B.UpdateBStateTask
          .retrieve(context, { taskId })
      };
    }


  };

  public spawn(options?: reboot_api.ScheduleOptions) {
    return new B.WeakReference._Spawn(
      this,
      {
        ...this.#options,
        schedule: options || { when: new Date() }
      },
    );
  }
}

export class B {

  static Servicer = BServicer;
  static State = BState;
  static Authorizer = BAuthorizer;
  static WeakReference = BWeakReference;


  static GetBStateAborted = BGetBStateAborted;

  static GetBStateTask = BGetBStateTask;



  static UpdateBStateAborted = BUpdateBStateAborted;

  static UpdateBStateTask = BUpdateBStateTask;

  static UpdateBStateEffects = class {
    state: BProto;
    response: Empty;

    constructor(effects: {
      state: protobuf_es.PartialMessage<BProto>;
      response: protobuf_es.PartialMessage<Empty>;
    }) {
      this.state = effects.state instanceof BProto
        ? effects.state
        : new BProto(effects.state);

      this.response = effects.response instanceof Empty
        ? effects.response
        : new Empty(effects.response);
    }
  };


  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new B.WeakReference(id, options?.bearerToken);
  }


  public static idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions = {} as reboot_api.IdempotencyOptions) {
    const idempotency = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String) ? { alias: aliasOrOptions } : aliasOrOptions;
    return new B._ConstructIdempotently(idempotency);
  }

  static _ConstructIdempotently = class {
    #idempotency: reboot_api.IdempotencyOptions;

    constructor(idempotency: reboot_api.IdempotencyOptions) {
      this.#idempotency = idempotency;
    }

  };
}

export namespace B {
  export type GetBStateAborted = typeof B.GetBStateAborted.prototype;
}
export namespace B {
  export type UpdateBStateAborted = typeof B.UpdateBStateAborted.prototype;
}

export namespace B {
  export type UpdateBStateTask = typeof B.UpdateBStateTask.prototype;
  export type UpdateBStateEffects = typeof B.UpdateBStateEffects.prototype;
}


export namespace B {
  export type RequestTypes = BRequestTypes;
  export type WeakReference = typeof B.WeakReference.prototype;
  export type State = typeof B.State.prototype;
}

export class CWeakReference {
  #external: any;
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string, bearerToken?: string) {
    this.#id = id;
    this.#options = {
      bearerToken: bearerToken,
    };
    this.#external = reboot_native.Service_constructor({
      rbtModule: "reactive.v1.reactive_rbt",
      nodeAdaptor: "CWeakReferenceNodeAdaptor",
      id: this.#id,
    });
  }

  get stateId(): string {
    return this.#id;
  }

  async __externalServiceCallGetCState(
    context: Context | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<Empty>,
    options?: reboot_api.CallOptions
  ): Promise<any> {
    const request = partialRequest instanceof Empty ?
      partialRequest : new Empty(partialRequest);

    const json = JSON.parse(
      await reboot_native.Service_call({
        external: this.#external,
        kind: "reader",
        method: "GetCState",
        requestModule: "google.protobuf.empty_pb2",
        requestType: "Empty",
        context: context.__external,
        jsonRequest: JSON.stringify(request || {}),
        jsonOptions: JSON.stringify(options || {}),
      })
    );

    if ("status" in json) {
      throw C
        .GetCStateAborted
        .fromStatus(reboot_api.Status.fromJson(json["status"]));
    }

    return json;
  }

  async getCState(
    context: ReaderContext | WriterContext | TransactionContext | WorkflowContext | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<Empty>,
  ): Promise<GetResponse> {
    const json = await this.__externalServiceCallGetCState(
      context,
      partialRequest,
      this.#options,
    );

    // TODO: assert("response" in json)

    return GetResponse.fromJson(json["response"]);
  }

  async __externalServiceCallUpdateCState(
    context: Context | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<UpdateCStateResponse>,
    options?: reboot_api.CallOptions
  ): Promise<any> {
    const request = partialRequest instanceof UpdateCStateResponse ?
      partialRequest : new UpdateCStateResponse(partialRequest);

    const json = JSON.parse(
      await reboot_native.Service_call({
        external: this.#external,
        kind: "writer",
        method: "UpdateCState",
        requestModule: "reactive.v1.reactive_pb2",
        requestType: "UpdateCStateResponse",
        context: context.__external,
        jsonRequest: JSON.stringify(request || {}),
        jsonOptions: JSON.stringify(options || {}),
      })
    );

    if ("status" in json) {
      throw C
        .UpdateCStateAborted
        .fromStatus(reboot_api.Status.fromJson(json["status"]));
    }

    return json;
  }

  async updateCState(
    context: TransactionContext | WorkflowContext | ExternalContext,
    partialRequest?: protobuf_es.PartialMessage<UpdateCStateResponse>,
  ): Promise<Empty> {
    const json = await this.__externalServiceCallUpdateCState(
      context,
      partialRequest,
      this.#options,
    );

    // TODO: assert("response" in json)

    return Empty.fromJson(json["response"]);
  }


  static _Idempotently = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async updateCState(
      context: reboot.TransactionContext | reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateCStateResponse>
    ): Promise<Empty> {
      const json = await this.#weakReference.__externalServiceCallUpdateCState(
        context,
        partialRequest,
        this.#options,
      );

       // TODO: assert("response" in json)

       return Empty.fromJson(json["response"]);
    }


    public schedule(options?: reboot_api.ScheduleOptions) {
      return new C.WeakReference._Schedule(
        this.#weakReference,
        {
          ...this.#options,
          schedule: options || { when: new Date() }
        },
      );
    }

    public spawn(options?: reboot_api.ScheduleOptions) {
      return new C.WeakReference._Spawn(
        this.#weakReference,
        {
          ...this.#options,
          schedule: options || { when: new Date() }
        },
      );
    }
  };

  public idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions = {} as reboot_api.IdempotencyOptions) {
    const idempotency = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String) ? { alias: aliasOrOptions } : aliasOrOptions;
    return new C.WeakReference._Idempotently(
      this,
      {
        ...this.#options,
        idempotency: idempotency,
      },
    );
  }

  public unidempotently() {
    return this.idempotently({ key: uuid.v4() });
  }

  static _Schedule = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions,
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async getCState(
      context: reboot.WriterContext | reboot.TransactionContext,
      partialRequest?: protobuf_es.PartialMessage<Empty>
    ): Promise<reboot_api.tasks_pb.TaskId> {
      const json = await this.#weakReference.__externalServiceCallGetCState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return taskId;
    }

    async updateCState(
      context: reboot.WriterContext | reboot.TransactionContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateCStateResponse>
    ): Promise<reboot_api.tasks_pb.TaskId> {
      const json = await this.#weakReference.__externalServiceCallUpdateCState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return taskId;
    }


  };

  public schedule(options?: reboot_api.ScheduleOptions) {
    return new C.WeakReference._Schedule(
      this,
      {
        ...this.#options,
        schedule: options || { when: new Date() }
      },
    );
  }

  static _Spawn = class {

    #weakReference: any;
    #options: reboot_api.CallOptions;

    constructor(
      weakReference: any,
      options: reboot_api.CallOptions,
    ) {
      this.#weakReference = weakReference;
      this.#options = options;
    }

    async getCState(
      context: reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<Empty>
    ): Promise<{ task: CGetCStateTask }> {
      const json = await this.#weakReference.__externalServiceCallGetCState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return {
        task: C.GetCStateTask
          .retrieve(context, { taskId })
      };
    }

    async updateCState(
      context: reboot.WorkflowContext | reboot.ExternalContext,
      partialRequest?: protobuf_es.PartialMessage<UpdateCStateResponse>
    ): Promise<{ task: CUpdateCStateTask }> {
      const json = await this.#weakReference.__externalServiceCallUpdateCState(
        context,
        partialRequest,
        this.#options,
      );

      // TODO: assert("taskId" in json)

      const taskId = reboot_api.tasks_pb.TaskId.fromJson(json["taskId"]);

      return {
        task: C.UpdateCStateTask
          .retrieve(context, { taskId })
      };
    }


  };

  public spawn(options?: reboot_api.ScheduleOptions) {
    return new C.WeakReference._Spawn(
      this,
      {
        ...this.#options,
        schedule: options || { when: new Date() }
      },
    );
  }
}

export class C {

  static Servicer = CServicer;
  static State = CState;
  static Authorizer = CAuthorizer;
  static WeakReference = CWeakReference;


  static GetCStateAborted = CGetCStateAborted;

  static GetCStateTask = CGetCStateTask;



  static UpdateCStateAborted = CUpdateCStateAborted;

  static UpdateCStateTask = CUpdateCStateTask;

  static UpdateCStateEffects = class {
    state: CProto;
    response: Empty;

    constructor(effects: {
      state: protobuf_es.PartialMessage<CProto>;
      response: protobuf_es.PartialMessage<Empty>;
    }) {
      this.state = effects.state instanceof CProto
        ? effects.state
        : new CProto(effects.state);

      this.response = effects.response instanceof Empty
        ? effects.response
        : new Empty(effects.response);
    }
  };


  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new C.WeakReference(id, options?.bearerToken);
  }


  public static idempotently(aliasOrOptions: string | reboot_api.IdempotencyOptions = {} as reboot_api.IdempotencyOptions) {
    const idempotency = (typeof aliasOrOptions === "string" || aliasOrOptions instanceof String) ? { alias: aliasOrOptions } : aliasOrOptions;
    return new C._ConstructIdempotently(idempotency);
  }

  static _ConstructIdempotently = class {
    #idempotency: reboot_api.IdempotencyOptions;

    constructor(idempotency: reboot_api.IdempotencyOptions) {
      this.#idempotency = idempotency;
    }

  };
}

export namespace C {
  export type GetCStateAborted = typeof C.GetCStateAborted.prototype;
}
export namespace C {
  export type UpdateCStateAborted = typeof C.UpdateCStateAborted.prototype;
}

export namespace C {
  export type UpdateCStateTask = typeof C.UpdateCStateTask.prototype;
  export type UpdateCStateEffects = typeof C.UpdateCStateEffects.prototype;
}


export namespace C {
  export type RequestTypes = CRequestTypes;
  export type WeakReference = typeof C.WeakReference.prototype;
  export type State = typeof C.State.prototype;
}


export function importPys() {

    reboot_native.importPy("reactive.v1.reactive_pb2", "H4sIAAAAAAAC/72YXXOiSBSG7/0VPc6FzswG+RJZq1I1imx2LhIdMXszblEgraEKaQbaVNxfv6cbUETCYGJNpUr5OO/znn5puq18RDefb9CKeH64GaIdXd/o7ErrI7rDIY4dij3k7hF9wiiKCSUrEiB3t17jGETbyA9wLCA0maKH6QKZk2+LDyBNyC5e4SGKsbOi/jPuPUu9/FjgGCiasW9AodmePpEQ/YPjxCfhEPUFWROkVrvdPrZw7u1hASpa65hs0YaQTZCRGdHfRiSmyMPJKvYjSmLkJMg+njZU2REBx1Mpv1arT/ZblwS251DHdRLM9aVrlXrBDymOQyfIQe7ODzyc9p4dQ2xfv6ZZ2H6Y4JhCYtASSLupKvnUajE723PR7ZmxMMFrZxfQLlSlTcQuFZ4lJ4ieHCk3JhHDJnbkyswcSmyPUDsv4yd5DSuqjQNvI7rPUWkNB+R1/CQt4qxWa2JaxvzbbDGdsxGUoj+OQBh5noVj3wn8/7D3F8zErttZhssXyXl93sFdefkiuoerzxITcJFLe/kQe9nwDiJW4abd9/LOe7zrrKQNf+AtAk6VUhdpwK8Mli+aZCcU5jFc01kNYh/dJZ3Dt8ZuW+zuEM7U5YsOUreflYonYPkMLNeD5YZg5Qys1IOVOvCQU9w7TOc4iSBGhpG/8GcjMTHZun6IPTs+3i67SGKh8IBpCxyiPEYwo/GINzHHP3c4oW/LfNnucaKaEscZ8dj15WmXkEY9slHOIHEU/qiYTGdT7B7DouklKU/tww0KeaeJZCaaUF5hTDZhs9msC4V3QCg+q3bqffJUZe4sMvKMH66Kj4BdRie86gfk1HRV7Zq+ruCrsAzUkwzk6gzGvyGD78UMjoYfKjI4m1LXDUGpDsH43SEYtSEYVwxBY98a1ygdttttAuI6QQKbRXYEu1u+YQpj9n2Pk8TZ4FHomeFuOznsKEn3uNf8gXJQWb0gUUECkAx3qu4UR50fsx2tUyT7axQSWtzVBPvRMm3DPrKsYQt+UR1OBTsgjgerZbYnwTgfSIihJsf+6Nijzr/N65LDrlmohb1Thphlrb8UFXEpimLnVDpuaDF+u4XR0MJ4u8Xo3lz8PZ1YQNimb47t7u3Q2eIfncMC2jTMpqxmrbJX67KGi6vsFXou45q2Lcpy1XypT2d8SdeNWe9JevzLaK7Wcxn3vqSN+nSMS7puzHpP0sYvo7laz2Xc+5IuL5/w2y2mt5Io1pfh0LuVFLV+ncxYilZfxlkDsX5BzFgDub6MsWSxZHhnLuamNZs+WGYlVRb1pgLO10r8x9lktDBH1gI+5+b3R9NaVPto+qVC5qdIapVsnMlqBqZI2sVK7qgpVTqjgaPWv1jJHFVJfnVVP3dRpX6jakbuD/RXV7Fzcl+XGlUz8kDtv/rWnpMHqt6ompH/hDRq/i+yJd4uwHayIhH+1Pof/GTS/PASAAA=");
    reboot_native.importPy("reactive.v1.reactive_pb2_grpc", "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");
    reboot_native.importPy("reactive.v1.reactive_rbt", "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");
}

importPys()
