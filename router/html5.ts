export function createWebHistory(base?: string) {
    base = normalizeBase(base) // 处理base 

    const historyNavigation = useHistoryStateNavigation(base) // 整理当前的location 
    const historyListeners = useHistoryListeners( // 对popsate事件做一个监听
        base,
        historyNavigation.state,
        historyNavigation.location,
        () => { }
    )

    const routerHistory = Object.assign({
        location: '',
        base,
    },
        historyListeners,
        historyNavigation
    )

    Object.defineProperty(routerHistory, 'location', {
        enumerable: true,
        get: () => historyNavigation.location.value
    })
    Object.defineProperty(routerHistory, 'state', {
        enumerable: true,
        get: () => historyNavigation.state.value
    })

    return routerHistory
}


function normalizeBase(base?: string): string {
    return ''
}

function useHistoryStateNavigation(base: string) {
    const { history, location } = window

    const currentLoaction = {
        value: createCurrentLocation(base, location) // pathname + search + hash
    }
    const historyState = {
        value: history.state
    }

    return {
        state: historyState,
        location: currentLoaction
    }
}

function createCurrentLocation(base: string, location: Location) {
    const { pathname, search, hash } = location

    return pathname + search + hash
}

function useHistoryListeners(base: string,
    historyState: Record<any, any>,
    currentLoaction: Record<any, any>,
    replace: () => void
) {
    let listeners: Function[] = []

    const popStateHandler = () => {
        const state = {}

        const to = location.pathname + location.search + location.hash
        const from = currentLoaction.value
        const fromState = historyState.value

        if (state) {
            currentLoaction.value = to
            historyState.state = state
        }

        listeners.forEach(listener => {
            listener(currentLoaction.value, from, {})
        })
    }


    const listene = (callback: Function) => {
        listeners.push(callback)
    }

    window.addEventListener('popState', popStateHandler)

    return {
        listene
    }
}