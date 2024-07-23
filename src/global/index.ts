import { App } from 'vue'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  app.use(registerProperties) //在这里使用等同于在main.ts里面注册
}
