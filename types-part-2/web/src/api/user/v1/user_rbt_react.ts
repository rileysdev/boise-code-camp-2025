/* eslint-disable */
// @ts-nocheck

"use client";

import type {
  Message as __bufbuildProtobufMessage,
  MessageType as __bufbuildProtobufMessageType,
  PartialMessage as __bufbuildProtobufPartialMessage,
} from "@bufbuild/protobuf";
import * as reboot_react from "@reboot-dev/reboot-react";
import * as reboot_api from "@reboot-dev/reboot-api";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
// NOTE NOTE NOTE
//
// If you are reading this comment because you are trying to debug
// the error:
//
// Module not found: Error: Can't resolve './user_pb.js'
//
// You can resolve this by passing --react-extensions to `rbt
// protoc` (or better put it in your `.rbtrc` file).
//
// This is a known issue if you're using `webpack` which uses
// `ts-loader` (https://github.com/TypeStrong/ts-loader/issues/465).
import {
  GetRequest,
  GetResponse,
  SetRequest,
  SetResponse,
  User as UserProto,
} from "./user_pb";

// Additionally re-export all messages_and_enums from the pb module.
export {
  GetRequest,
  GetResponse,
  SetRequest,
  SetResponse,
};

export type PendingSetRequestMutation = reboot_react.Mutation<SetRequest>;



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

export interface UserMutators {
  set: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<SetRequest>,
     options?: { metadata?: any }
    ): Promise<
      reboot_react.ResponseOrAborted<
        SetResponse,
        UserSetAborted
      >>;

    pending: PendingSetRequestMutation[];
  };
}

const USER_GET_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type UserGetAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof USER_GET_ERROR_TYPES
  >[number];

export class UserGetAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      USER_GET_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new UserGetAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new UserGetAborted(
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
    error: UserGetAbortedError,
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

  readonly error: UserGetAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}

const USER_SET_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type UserSetAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof USER_SET_ERROR_TYPES
  >[number];

export class UserSetAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      USER_SET_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new UserSetAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new UserSetAborted(
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
    error: UserSetAbortedError,
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

  readonly error: UserSetAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}


export interface UseUserApi {
  mutators: UserMutators;
  useGet: (
    partialRequest?: __bufbuildProtobufPartialMessage<GetRequest>
  ) => {
    response: GetResponse | undefined;
    isLoading: boolean;
    aborted: undefined | UserGetAborted;
  };
  get: (
    partialRequest?: __bufbuildProtobufPartialMessage<GetRequest>,
    options?: { signal?: AbortSignal }
  ) => Promise<
    reboot_react.ResponseOrAborted<
    GetResponse,
    UserGetAborted
    >
  >;
  set: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<SetRequest>,
     options?: { metadata?: any }
    ): Promise<
      reboot_react.ResponseOrAborted<
        SetResponse,
        UserSetAborted
      >>;

    pending: PendingSetRequestMutation[];
  };
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

class UserInstance {

  constructor(id: string, stateRef: string, url: string) {
    this.id = id;
    this.stateRef = stateRef;
    this.url = url;
    this.refs = 1;

    reboot_react.websockets.connect(this.url, this.stateRef);
    this.initializeWebSocket();
  }

  private ref() {
    this.refs += 1;
    return this.refs;
  }

  private unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
      reboot_react.websockets.disconnect(this.url, this.stateRef);
    }

    return this.refs;
  }

  readonly id: string;
  readonly stateRef: string;
  private url: string;
  private refs: number;
  private observers: reboot_react.Observers = {};
  private loadingReaders = 0;
  private runningMutates: reboot_react.Mutate[] = [];
  private queuedMutates: reboot_react.Mutate[] = [];
  private flushMutates?: reboot_react.Event = undefined;
  private websocket?: WebSocket = undefined;
  private backoff: reboot_react.Backoff = new reboot_react.Backoff();

  private hasRunningMutations() {
    return this.runningMutates.length > 0;
  }

  private async flushMutations() {
    if (this.flushMutates === undefined) {
      this.flushMutates = new reboot_react.Event();
    }
    await this.flushMutates.wait();
  }

  private readersLoadedOrFailed() {
    this.flushMutates = undefined;

    if (this.queuedMutates.length > 0) {
      this.runningMutates = this.queuedMutates;
      this.queuedMutates = [];

      if (this.websocket?.readyState === WebSocket.OPEN) {
        for (const { request, update } of this.runningMutates) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      }
    }
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0) {
      const url = new URL(`${this.url}/__/reboot/rpc/${this.stateRef}`);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

      this.websocket = reboot_react.websockets.create(url);

      this.websocket.binaryType = "arraybuffer";

      this.websocket.onopen = () => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          for (const { request, update } of this.runningMutates) {
            update({ isLoading: true });
            try {
              this.websocket.send(request.toBinary());
            } catch {
              // We'll retry since we've stored in `*Mutates`.
            }
          }
        }
      };

      this.websocket.onerror = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            if (this.runningMutates.length > 0) {
              console.warn(
                `WebSocket disconnected, ${this.runningMutates.length} outstanding mutations will be retried when we reconnect`
              );
            }

            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onclose = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onmessage = async (event) => {
        const { resolve } = this.runningMutates[0];
        this.runningMutates.shift();

        const response = reboot_api.react_pb.MutateResponse.fromBinary(
          new Uint8Array(event.data)
        );

        resolve(response);

        if (
          this.flushMutates !== undefined &&
          this.runningMutates.length === 0
        ) {
          this.flushMutates.set();
        }
      };
    }
  }

  private async mutate(
    partialRequest: __bufbuildProtobufPartialMessage<reboot_api.react_pb.MutateRequest>,
    update: (props: { isLoading: boolean; error?: any }) => void
  ): Promise<reboot_api.react_pb.MutateResponse> {
    const request = partialRequest instanceof reboot_api.react_pb.MutateRequest
      ? partialRequest
      : new reboot_api.react_pb.MutateRequest(partialRequest);

    return new Promise((resolve, _) => {
      if (this.loadingReaders === 0) {
        this.runningMutates = this.runningMutates.concat({ request, resolve, update });
        if (this.websocket?.readyState === WebSocket.OPEN) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      } else {
        this.queuedMutates = this.queuedMutates.concat({ request, resolve, update });
      }
    });
  }

  private async read<
    RequestType extends __bufbuildProtobufMessage<RequestType>,
    ResponseType extends __bufbuildProtobufMessage<ResponseType>,
    >(
    method: string,
    request: RequestType,
    bearerToken: string | undefined,
    responseType: __bufbuildProtobufMessageType<ResponseType>,
    reader: reboot_react.Reader<ResponseType>
  ) {
    const queryRequest = new reboot_api.react_pb.QueryRequest({
      method,
      request: request.toBinary(),
      ...(bearerToken !== undefined && { bearerToken } || {}),
    });

    // Expected idempotency key we should observe due to a mutation.
    interface Expected {
      // Idempotency key of mutation.
      idempotencyKey: string;

      // Callback when we've observed this idempotency key.
      observed: (callback: () => void) => Promise<void>;

      // Callback when we no longer care about observing.
      aborted: () => void;
    }

    let expecteds: Expected[] = [];

    // When we disconnect we may not be able to observe
    // responses due to mutations yet there may still be
    // some outstanding responses that are expected which
    // we treat as "orphans" in the sense that we won't
    // observe their idempotency keys but once we reconnect
    // we will still have observed their effects and can
    // call `observed()` on them.
    let orphans: Expected[] = [];

    const id = `${uuidv4()}`;

    this.observers[id] = {
      observe: (
        idempotencyKey: string,
        observed: (callback: () => void) => Promise<void>,
        aborted: () => void
      ) => {
        expecteds = expecteds.concat({ idempotencyKey, observed, aborted })
      },
      unobserve: (idempotencyKey: string) => {
        expecteds = expecteds.filter(
          expected => expected.idempotencyKey !== idempotencyKey
        );
      }
    };

    try {
      await reboot_react.retryForever(async () => {
        let loaded = false;
        this.loadingReaders += 1;

        // Any mutations started after we've incremented
        // `this.loadingReaders` will be queued until after
        // all the readers have loaded and thus (1) we know all
        // current `expected` are actually `orphans` that
        // we will haved "observed" once we are (re)connected
        // because we flush mutations before starting to read
        // and (2) all queued mutations can stay in `expected`
        // because we will in fact be able to observe them
        // since they won't get sent over the websocket
        // until after we are (re)connected.
        //
        // NOTE: we need to concatenate with `orphans`
        // because we may try to (re)connect multiple times
        // and between each try more mutations may have been
        // made (or queued ones will be moved to running).
        orphans = [...orphans, ...expecteds];
        expecteds = [];

        try {
          // Wait for potentially completed mutations to flush
          // before starting to read so that we read the latest
          // state including those mutations.
          if (this.hasRunningMutations()) {
            await this.flushMutations();
          }

          unstable_batchedUpdates(() => {
            for (const setIsLoading of Object.values(reader.setIsLoadings)) {
              setIsLoading(true);
            }
          });

          const queryResponses = reboot_react.reactiveReader({
            endpoint: `${this.url}/__/reboot/rpc/${this.stateRef}`,
            request: queryRequest,
            signal: reader.abortController.signal,
          });

          for await (const queryResponse of queryResponses) {
            if (!loaded) {
              if ((this.loadingReaders -= 1) === 0) {
                this.readersLoadedOrFailed();
              }
              loaded = true;
            }

            unstable_batchedUpdates(() => {
              for (const setIsLoading of Object.values(reader.setIsLoadings)) {
                setIsLoading(false);
              }
            });

            const response = queryResponse.responseOrStatus.case === "response"
              ? responseType.fromBinary(queryResponse.responseOrStatus.value)
              : undefined;

            // If we were disconnected it must be that we've
            // observed all `orphans` because we waited
            // for any mutations to flush before we re-started to
            // read.
            if (orphans.length > 0) {
              // We mark all mutations as observed except the
              // last one which we also invoke all `setResponse`s.
              // In this way we effectively create a barrier
              // for all readers that will synchronize on the last
              // mutation, but note that this still may lead
              // to some partial state/response updates because
              // one reader may have actually received a response
              // while another reader got disconnected. While this
              // is likely very rare, it is possible. Mitigating
              // this issue is non-trivial and for now we have
              // no plans to address it.
              for (let i = 0; i < orphans.length - 1; i++) {
                orphans[i].observed(() => {});
              }
              await orphans[orphans.length - 1].observed(() => {
                if (response !== undefined) {
                  reader.response = response;
                  for (const setResponse of Object.values(reader.setResponses)) {
                    setResponse(response);
                  }
                }
              });

              orphans = [];
            } else if (
              expecteds.length > 0 &&
              queryResponse.idempotencyKeys.includes(
                expecteds[0].idempotencyKey
              )
            ) {
              await expecteds[0].observed(() => {
                if (response !== undefined) {
                  reader.response = response;
                  for (const setResponse of Object.values(reader.setResponses)) {
                    setResponse(response);
                  }
                }
                expecteds.shift();
              });
            } else if (response !== undefined) {
              unstable_batchedUpdates(() => {
                reader.response = response;
                for (const setResponse of Object.values(reader.setResponses)) {
                  setResponse(response);
                }
              });
            }
          }

          throw new Error('Not expecting stream to ever be done');
        } catch (e: unknown) {
          if (!loaded) {
            if ((this.loadingReaders -= 1) === 0) {
              this.readersLoadedOrFailed();
            }
          }

          loaded = false;

          if (reader.abortController.signal.aborted) {
            for (const { aborted } of [...orphans, ...expecteds]) {
              aborted();
            }
            return;
          }

          unstable_batchedUpdates(() => {
            for (const setIsLoading of Object.values(reader.setIsLoadings)) {
              setIsLoading(false);
            }
            for (const setStatus of Object.values(reader.setStatuses)) {
              if (e instanceof reboot_api.Status) {
                setStatus(e);
              } else {
                setStatus(
                  new reboot_api.Status({
                    code: reboot_api.StatusCode.UNKNOWN,
                    message: e instanceof Error
                      ? e.message
                      : JSON.stringify(e),
                  })
                );
              }
            }
          });

          throw e; // This just retries!
        }
      });
    } finally {
      delete this.observers[id];
    }
  }


  private useGetReaders: {
    [id: string]: reboot_react.Reader<GetResponse>
  } = {};

  useGet(
    id: string,
    request: GetRequest,
    bearerToken: string | undefined,
    setResponse: (response: GetResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: reboot_api.Status) => void
  ) {
    let read = false;

    // NOTE: need to concatenate `request.toJsonString()` with `bearerToken`
    // because it uniquely identifies the request, i.e., a second call
    // that has the same `request` but a different bearerToken should be a
    // different call.
    const key = request.toJsonString() + bearerToken;

    if (!(key in this.useGetReaders)) {
      this.useGetReaders[key] = {
        abortController: new AbortController(),
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},
      };

      read = true;
    }

    let reader = this.useGetReaders[key];

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    if (reader.response !== undefined) {
      setResponse(reader.response);
    }

    if (read) {
      this.read(
        "Get",
        request,
        bearerToken,
        GetResponse,
        reader
      );
    }
  }

  unuseGet(
    id: string,
    request: GetRequest,
    bearerToken: string | undefined
  ) {
    // See comment above in `useGet` for why
    // we concatenate `request.toJsonString()` with `bearerToken`.
    const key = request.toJsonString() + bearerToken;

    const reader = this.useGetReaders[key];

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    if (Object.values(reader.setResponses).length === 0) {
      delete this.useGetReaders[key];
      reader.abortController.abort();
    }
  }


  private useSetMutations: (
    PendingSetRequestMutation)[] = [];

  private useSetSetPendings: {
    [id: string]: (mutations: PendingSetRequestMutation[]) => void
  } = {};

  async set(
    mutation: PendingSetRequestMutation
  ): Promise<
    reboot_react.ResponseOrAborted<
      SetResponse,
      UserSetAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_react.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        unstable_batchedUpdates(() => {
          for (const callback of callbacks) {
            callback();
          }
        });
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useSetMutations = this.useSetMutations.concat(mutation);

    unstable_batchedUpdates(() => {
      for (const setPending of Object.values(this.useSetSetPendings)) {
        setPending(this.useSetMutations);
      }
    });

    return new Promise<
      reboot_react.ResponseOrAborted<
        SetResponse,
        UserSetAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Set",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useSetMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useSetSetPendings)) {
                  setPending(this.useSetMutations);
                }
              });
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useSetMutations =
            this.useSetMutations.filter(m => m !== mutation);

          unstable_batchedUpdates(() => {
            for (const setPending of Object.values(this.useSetSetPendings)) {
              setPending(this.useSetMutations);
            }
          });
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response: SetResponse.fromBinary(
                  responseOrStatus.value
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = UserSetAborted.fromStatus(status);

            console.warn(
              `'User.Set' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useSet(
    id: string,
    setPending: (mutations: PendingSetRequestMutation[]) => void
  ) {
    this.useSetSetPendings[id] = setPending;
  }

  unuseSet(id: string) {
    delete this.useSetSetPendings[id];
  }


  private static instances: { [id: string]: UserInstance } = {};

  static use(id: string, stateRef: string, url: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new UserInstance(id, stateRef, url);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    if (this.unref() === 0) {
      delete UserInstance.instances[this.id];
    }
  }
}

export const useUser = (
  { id }: { id: string }
): UseUserApi => {
  const stateId = id;
  const stateRef = reboot_react.stateIdToRef(
    "user.v1.User",
    id,
  );

  const rebootClient = reboot_react.useRebootClient();

  const url = rebootClient.url;
  const bearerToken = rebootClient.bearerToken;

  const [instance, setInstance] = useState(() => {
    return UserInstance.use(
      stateId, stateRef, url
    );
  });

  if (instance.id !== stateId) {
    setInstance(
      UserInstance.use(
        stateId, stateRef, url
      )
    );
  }

  useEffect(() => {
    return () => {
      instance.unuse();
    };
  }, [instance]);

  const headers = useMemo(() => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  }, [bearerToken]);



  function useGet(
    partialRequest: __bufbuildProtobufPartialMessage<GetRequest> = {}
  ) {
    const newRequest = partialRequest instanceof GetRequest
      ? partialRequest.clone()
      : new GetRequest(partialRequest);

    const [request, setRequest] = useState(newRequest);

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
    }

    const [response, setResponse] = useState<GetResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [aborted, setAborted] = useState<
      undefined
      | UserGetAborted
      >();

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    useEffect(() => {
      const id = uuidv4();
      instance.useGet(
        id,
        request,
        bearerToken,
        (response: GetResponse) => {
          unstable_batchedUpdates(() => {
            setAborted(undefined);
            setResponse(response);
          });
        },
        setIsLoading,
        (status: reboot_api.Status) => {
          const aborted = UserGetAborted.fromStatus(status);

          console.warn(
            `'User.Get' aborted with ${aborted.message}`
          );

          setAborted(aborted);
        },
      );
      return () => {
        instance.unuseGet(id, request, bearerToken);
      };
    }, [request, bearerToken]);

    return { response, isLoading, aborted };
  }

  async function get(
    partialRequest: __bufbuildProtobufPartialMessage<GetRequest> = {},
    options?: { signal?: AbortSignal }
  ) {
    const request = partialRequest instanceof GetRequest
      ? partialRequest.clone()
      : new GetRequest(partialRequest);

    // Fetch with retry, using a backoff, i.e., if we get disconnected.
    const { response, aborted } = await (async () => {
      const backoff = new reboot_react.Backoff();

      while (true) {
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'reboot/helpers.py'.
          return {
            response: await reboot_react.guardedFetch(
              new Request(
                `${rebootClient.url}/__/reboot/rpc/${stateRef}/user.v1.UserMethods/Get`, {
                  method: "POST",
                  headers,
                  body: request.toJsonString()
                }
              ),
              options
            )
          };
        } catch (e: unknown) {
          if (options?.signal?.aborted) {
            const aborted = new UserGetAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            );

            return { aborted };
          } else if (e instanceof Error) {
            console.error(e);
          } else {
            console.error(`Unknown error: ${JSON.stringify(e)}`);
          }
        }

        console.warn(`Retrying call to user.v1.UserMethods.Get after backoff ...`);

        await backoff.wait();
      }
    })();

    if (aborted) {
      return { aborted };
    } else if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = reboot_api.Status.fromJson(await response.json());

        const aborted = UserGetAborted.fromStatus(status);

        console.warn(
          `'User.Get' aborted with ${aborted.message}`
        );

        return { aborted };
      } else {
        const aborted = new UserGetAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
      }
    } else {
      return { response: await response.json() };
    }
  }


  function useSet() {
    const [
      pending,
      setPending
    ] = useState<PendingSetRequestMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useSet(id, setPending);
      return () => {
        instance.unuseSet(id);
      };
    }, []);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const set = useMemo(() => {
      const method = async (
        partialRequest: __bufbuildProtobufPartialMessage<SetRequest> = {},
        options?: { metadata?: any }
      ) => {
        const request = partialRequest instanceof SetRequest
          ? partialRequest.clone()
          : new SetRequest(partialRequest);

        const idempotencyKey = uuidv4();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.set(mutation);
      };

      method.pending =
        new Array<PendingSetRequestMutation>();

      return method;
    }, [bearerToken]);

    set.pending = pending;

    return set;
  }

  const set = useSet();


  return {
    mutators: {
      set,
    },
    get,
    useGet,
    set,
  };
};



export class User {
  static State = UserProto;
}
export namespace User {
  export type State = UserProto;
}

