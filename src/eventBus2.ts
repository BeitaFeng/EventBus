// type EventType = string | symbol;

// type EventHandler<T = unknown> = (value: T) => void;
// type WildCardEventHandler<T = Record<string, unknown>> = (
//   type: keyof T,
//   value: T[keyof T]
// ) => void;

// type EventHandlerList<T = unknown> = Array<EventHandler<T>>;
// type WilCardEventHandlerList<T = Record<string, unknown>> = Array<
//   WildCardEventHandler<T>
// >;

// type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
//   keyof Events | "*",
//   EventHandlerList<Events[keyof Events]> | WilCardEventHandlerList<Events>
// >;

// class EventBus<Events extends Record<EventType, unknown>> {
//   events: EventHandlerMap<Events>;
//   constructor(events?: EventHandlerMap<Events>) {
//     this.events = events || new Map();
//   }
//   on<Key extends keyof Events>(
//     type: Key,
//     handler: EventHandler<Events[Key]>
//   ): void;
//   on(type: "*", handler: WildCardEventHandler<Events>): void;
//   on<Key extends keyof Events>(
//     type: Key,
//     handler: EventHandler<Events[Key]> | WildCardEventHandler<Events>
//   ) {
//     const handlers:
//       | Array<EventHandler<Events[Key]> | WildCardEventHandler<Events>>
//       | undefined = this.events.get(type);
//     if (handlers) {
//       handlers.push(handler);
//     } else {
//       this.events.set(type, [handler] as
//         | EventHandlerList<Events[keyof Events]>
//         | WilCardEventHandlerList<Events>);
//     }
//   }
//   off<Key extends keyof Events>(
//     type: Key,
//     handler?: EventHandler<Events[Key]> | WildCardEventHandler<Events>
//   ) {
//     const handlers:
//       | Array<EventHandler<Events[Key]> | WildCardEventHandler<Events>>
//       | undefined = this.events.get(type);
//     if (handlers) {
//       if (handler) {
//         const index = handlers.indexOf(handler);
//         if (index > -1) {
//           handlers.splice(index, 1);
//         }
//       } else {
//         this.events.set(type, []);
//       }
//     }
//   }

//   emit<Key extends keyof Events>(type: Key, value: Events[Key]): void;
//   emit<Key extends keyof Events>(
//     type: undefined extends Events[Key] ? Key : never
//   ): void;

//   emit<Key extends keyof Events>(type: Key, value?: Events[Key]) {
//     let handlers = this.events.get(type);
//     if (handlers) {
//       for (let handler of (handlers as EventHandlerList<Events[Key]>).slice()) {
//         handler(value!);
//       }
//     }
//     handlers = this.events.get("*");
//     if (handlers) {
//       for (let handler of (
//         handlers as WilCardEventHandlerList<Events>
//       ).slice()) {
//         handler(type, value!);
//       }
//     }
//   }
// }

// const eventBus = new EventBus<{ down: number }>();

// eventBus.on("down", ( value: number) => {});

// function test(fn: never) {}
