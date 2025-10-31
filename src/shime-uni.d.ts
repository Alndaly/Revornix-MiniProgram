export { }

declare module "vue" {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomOptions extends Hooks { }
}

declare namespace JSX {
  interface IntrinsicElements {
    towxml: any;
  }
}