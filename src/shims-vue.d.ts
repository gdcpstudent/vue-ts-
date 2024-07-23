/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  interface ComponentCustomProperties {
    // $globalInfo: {
    //   bodyWidth: number;
    //   // 其他属性...
    // },
    $filters: {
      foo: () => void
      formatTime: (value: string) => string
    }
  }
}
declare module '*.json'
