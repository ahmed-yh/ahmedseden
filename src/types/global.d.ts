// SVG import declarations for @svgr/webpack
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

// FlexSearch types augmentation
declare module 'flexsearch' {
  export interface Document<T> {
    add(id: number | string, document: T): void;
    search(query: string, options?: object): Promise<Array<{ result: Array<string | number> }>>;
    export(): Promise<unknown>;
    import(key: string, data: unknown): void;
  }
  
  export function Document<T>(options: {
    document: {
      id: string;
      index: string[];
      store?: string[] | boolean;
    };
    tokenize?: string;
    cache?: boolean;
  }): Document<T>;
}
