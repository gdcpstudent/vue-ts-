import { formateUtcString } from '@/utils/data-formate'
import { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
export default function registerProperties(app: App) {
  ;(app.config.globalProperties.$filters = {
    //app.config.globalProperties.+你想添加的属性 $filters 加美元符号主要是为了区分和组件内部的属性
    //全局属性，在里面加东西任何地方都能用
    formatTime(value: string) {
      //格式化时间
      return formateUtcString(value)
    }
  }),
    // 国际化，把element-plus组件出现的英文转化为中文
    app.use(ElementPlus, {
      locale: zhCn
    })
}
