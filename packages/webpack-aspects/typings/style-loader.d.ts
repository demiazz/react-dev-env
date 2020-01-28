/// <reference lib="dom" />

declare module "style-loader" {
  interface Attributes {
    [name: string]: string;
  }

  type InsertFn = (element: Element) => void;

  type InjectType =
    | "styleTag"
    | "singletonStyleTag"
    | "lazyStyleTag"
    | "lazySingletonStyleTag"
    | "linkTag";

  export interface Options {
    attributes?: Attributes;
    base?: number;
    esModule?: boolean;
    injectType?: InjectType;
    insert?: string | InsertFn;
  }
}
