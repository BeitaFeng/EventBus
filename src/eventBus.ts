type EventType = string | symbol;

type EventRecord = Record<EventType, unknown>;

//普通事件类型
type EventHandler<T = unknown> = (value: T) => void;
type EventHandlerList<T = unknown> = Array<EventHandler<T>>;

//通配事件类型
type WildCardEventHandler<T = EventRecord> = (
  type: keyof T,
  value: T[keyof T]
) => void;
type WildCardEventHandlerList<T = EventRecord> = Array<WildCardEventHandler<T>>;

//可选事件类型
type GenericHandler<Events extends EventRecord> =
  | EventHandler<Events[keyof Events]>
  | WildCardEventHandler<Events>;
type GenericHandlerList<Events extends EventRecord> = Array<
  GenericHandler<Events>
>;

//已注册事件类型
type HandlerMap<Events extends EventRecord> = Map<
  keyof Events | "*",
  GenericHandlerList<Events>
>;

class EventBus<Events extends EventRecord> {
  events: HandlerMap<Events>;
  constructor(events?: HandlerMap<Events>) {
    this.events = events || new Map();
  }

  on<Key extends keyof Events>(
    type: Key,
    handler: EventHandler<Events[Key]>
  ): void;
  on(type: "*", handler: WildCardEventHandler<Events>): void;
  on<Key extends keyof Events>(type: Key, handler: GenericHandler<Events>) {
    const handlers = this.events.get(type);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.events.set(type, [handler] as GenericHandlerList<Events>);
    }
  }
  off<Key extends keyof Events>(type: Key, handler?: GenericHandler<Events>) {
    const handlers = this.events.get(type);
    if (handlers) {
      if (handler) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      } else {
        this.events.set(type, []);
      }
    }
  }
  emit<Key extends keyof Events>(type: Key, value: Events[Key]): void;
  emit<Key extends keyof Events>(
    type: undefined extends Events[Key] ? Key : never
  ): void;
  emit<Key extends keyof Events>(type: Key, value?: Events[Key]) {
    let handlers = this.events.get(type);
    if (handlers) {
      for (let handler of (handlers as EventHandlerList).slice()) {
        handler(value!);
      }
    }
    handlers = this.events.get("*");
    if (handlers) {
      for (let handler of (
        handlers as WildCardEventHandlerList<Events>
      ).slice()) {
        handler(type, value!);
      }
    }
  }
}
