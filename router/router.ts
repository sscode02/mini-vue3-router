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
    const matcher = createRouterMatcher(options.routers, options)

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
}

function mergeOptions<T extends object>(defaults: T, partialOptions: Partial<T>): T {
    const options = {} as T
    for (const key in defaults) {
        options[key] = key in partialOptions ? partialOptions[key]! : defaults[key]
    }
    return options
}

