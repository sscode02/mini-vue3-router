import RouterLink from './router/RouterLink'
import RouterView from './router/RouterView'
import { routerLocationKey, routerKey } from './injectSymbols'
import { reactive, ref, shallowRef } from 'vue'

export interface RouterOptions {
    history: any,
    routers: any[]
}

export type routeRecordRaw = {
    path: string,
    component: any
}

export type PathParseOptions = {
    end?: boolean | undefined,
    sensitive?: boolean | undefined,
    strict?: boolean | undefined
}

export function createRouter(options: RouterOptions) {
    const matcher = createRouterMatcher(options.routers, options as PathParseOptions)
    // const routerHistory = options.history

    const currentRoute = shallowRef({ matched: [] })

    const push = (to: string, options: any) => {
        // get temp 
        // const targetLocation: RouteLocation = (pendingLocation = resolve(to)) // 找到目标component
        // const from = currentRoute.value //从哪里来
        // const data: HistoryState | undefined = (to as RouteLocationOptions).state // 携带的sate
        if (options.replace) {
            window.history.replaceState({}, '', to)
        }

        const matched = resolve(to)
        currentRoute.value = { matched: matched }
    }

    const replace = (to: string) => {
        push(to, { replace: true })
    }

    // 去matcher 中找到匹配的component
    const resolve = (to: string) => {
        const matched = matcher.resolve(to)
        return matched
    }


    const router = {
        replace,
        push,
        install(app: any) {
            const router = this
            app.component('RouterLink', RouterLink)
            app.component('RouterView', RouterView)

            app.provide(routerLocationKey, currentRoute)
            app.provide(routerKey, router)
        }
    }

    return router
}

export function createRouterMatcher(routers: Readonly<routeRecordRaw[]>, globalOptions: PathParseOptions) {
    const matchers: any[] = []

    globalOptions = mergeOptions(
        { end: true, strict: false, sensitive: false } as PathParseOptions,
        globalOptions
    )

    function addRoute(record: any) {
        const mainNormalizedRecord = normalizeRouteRecord(record)
        const options = mergeOptions(globalOptions, record)
        const normalizRecords = [mainNormalizedRecord]
        let originalMatcher
        let matcher

        for (const normalizedRecord of normalizRecords) {
            matcher = createRouteRecordMatcher(normalizedRecord, options)
            originalMatcher = originalMatcher || matcher
            insertMatcher(matcher)
        }

        return originalMatcher
    }

    function resolve(location: string) {
        let matched: any

        matched = matchers.filter(i => {
            return i.record.path === location
        })

        return matched
        // return matched 
    }

    function getRouters() {
        return matchers
    }

    function insertMatcher(matcher: any) {
        matchers.push(matcher)
    }
    routers.forEach(route => addRoute(route))
    return { addRoute, resolve, getRouters }
}


function createRouteRecordMatcher(record: any, options: any) {
    const parser = {
        re: undefined,
        score: undefined,
        keys: undefined,
        parse: () => { },
        stringity: () => { }
    }

    const matcher = Object.assign(parser, { record, children: [], alias: [] })
    return matcher
}

function normalizeRouteRecord(record: any) {
    return {
        path: record.path,
        components: 'componets' in record ? record.components || null : record.component && { default: record.component }
    }
}

function mergeOptions<T extends object>(defaults: T, partialOptions: Partial<T>): T {
    const options = {} as T
    for (const key in defaults) {
        options[key] = key in partialOptions ? partialOptions[key]! : defaults[key]
    }
    return options
}

function runGuardQueue(guards: any[]) {
    return guards.reduce(
        (promise, guard) => promise.then(() => { guard }),
        Promise.resolve()
    )
}


