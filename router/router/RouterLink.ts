import { defineComponent, h, inject, provide } from "vue";
import { routerKey } from "../injectSymbols";

export default defineComponent({
    name: 'RouterLink',
    props: {
        to: {
            type: [String]
        }
    },


    setup(props) {
        const router = inject(routerKey) as any
        return () => {
            return h('a', {
                href: props.to,
                style: "display:block",
                onClick: function (e: Event) {
                    router.replace(props.to)

                    e.preventDefault()
                }
            },
                'hello')
        }
    }
})

