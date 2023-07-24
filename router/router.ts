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

    const install = () => {

    }

    return {
        install
    }
}


export function createRouterMatcher(routers: Readonly<routeRecordRaw[]>, globalOptions: PathParseOptions) {
    const matchers = []

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
            originalMatcher = originalMatcher
            inserMatcher(matcher)
        }
    }

    function inserMatcher(matcher: any) {
        matchers.push(matcher)
    }

    routers.forEach(route => addRoute(route))
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

