declare type EventType = string | symbol;
declare type EventRecord = Record<EventType, unknown>;
declare type EventHandler<T = unknown> = (value: T) => void;
declare type EventHandlerList<T = unknown> = Array<EventHandler<T>>;
declare type WildCardEventHandler<T = EventRecord> = (type: keyof T, value: T[keyof T]) => void;
declare type WildCardEventHandlerList<T = EventRecord> = Array<WildCardEventHandler<T>>;
declare type GenericHandler<Events extends EventRecord> = EventHandler<Events[keyof Events]> | WildCardEventHandler<Events>;
declare type GenericHandlerList<Events extends EventRecord> = Array<GenericHandler<Events>>;
declare type HandlerMap<Events extends EventRecord> = Map<keyof Events | "*", GenericHandlerList<Events>>;
declare class EventBus<Events extends EventRecord> {
    events: HandlerMap<Events>;
    constructor(events?: HandlerMap<Events>);
    on<Key extends keyof Events>(type: Key, handler: EventHandler<Events[Key]>): void;
    on(type: "*", handler: WildCardEventHandler<Events>): void;
    off<Key extends keyof Events>(type: Key, handler?: GenericHandler<Events>): void;
    emit<Key extends keyof Events>(type: Key, value: Events[Key]): void;
    emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}
