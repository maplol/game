export interface PubSubEvent<EventName = string, Data = any> {
  name: EventName;
  data: Data;
}

export type PubSubHandler<T = any> = (data: T) => void | Promise<any>;

const createPubSub = () => {
  const events: { [name: string]: PubSubHandler[] } = {};

  const publish = async <T extends PubSubEvent>(
    name: T["name"],
    data?: T["data"]
  ) => {
    const handlers = events[name];
    if (handlers == null) return false;

    // make snapshot of handlers, to prevent inbetween unsubscribe calls
    // from mutating this array.
    await Promise.all(handlers.slice().map((handler) => handler(data)));
    return true;
  };

  const unsubscribe = <T extends PubSubEvent>(
    name: T["name"],
    handler: PubSubHandler<T["data"]>
  ) => {
    const handlers = events[name];
    if (handlers == null) return;

    const index = handlers.indexOf(handler);
    handlers.splice(index, 1);
  };

  const subscribe = <T extends PubSubEvent>(
    name: T["name"],
    handler: PubSubHandler<T["data"]>
  ) => {
    if (events[name] == null) {
      events[name] = [];
    }
    events[name].push(handler);

    return () => unsubscribe(name, handler);
  };

  const hasSubscriptions = <T extends PubSubEvent>(name: T["name"]) => {
    if (events[name] == null) {
      return 0;
    }
    return events[name].length;
  };

  return {
    publish,
    subscribe,
    // unsubscribe,
    hasSubscriptions,
  };
};

export default createPubSub;

export type PubSub = ReturnType<typeof createPubSub>;
