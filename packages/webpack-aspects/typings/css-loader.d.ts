declare module "css-loader" {
  type GetLocalIdentFn = (
    context: string,
    localIdentName: string,
    localName: string,
    options: {
      context?: string;
      hashPrefix?: string;
      regExp?: string | RegExp;
    }
  ) => string;

  type ImportFn = (
    parsedImport: { url: string; media: string },
    resourcePath: string
  ) => boolean;

  type LocalsConvention =
    | "asIs"
    | "camelCase"
    | "camelCaseOnly"
    | "dashes"
    | "dashesOnly";

  type ModulesMode = "global" | "local" | "pure";

  type ModulesOptions = {
    context?: string;
    getLocalIdent?: boolean | GetLocalIdentFn;
    hashPrefix?: string;
    localIdentName?: string;
    localIdentRegExp?: string | RegExp;
    mode?: ModulesMode;
  };

  type UrlFn = (url: string, resourcePath: string) => boolean;

  export interface Options {
    esModule?: boolean;
    import?: boolean | ImportFn;
    importLoaders?: boolean | number;
    localsConvention?: LocalsConvention;
    modules?: boolean | ModulesMode | ModulesOptions;
    onlyLocals?: boolean;
    sourceMap?: boolean;
    url?: boolean | UrlFn;
  }
}
