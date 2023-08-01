import { defineComponent, h, inject, watch } from "vue";
import { routerLocationKey } from "../injectSymbols";

export default defineComponent({
    name: 'RouterView',
    setup() {
        // 通过props.to 获取从matched 中匹配真实 component 
        const currentComponent: any = inject(routerLocationKey)

        return () => {
            const route = currentComponent.value.matched[0]
            const ViewComponent = route?.record.components.default

            if (ViewComponent) {
                return h(ViewComponent, {})
            }
            return h('div', {}, ' i am ')
        }
    },
})