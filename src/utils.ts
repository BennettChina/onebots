// 合并对象/数组
export function deepMerge<T extends any>(base:T,...from:T[]):T{
    if(from.length===0){
        return base
    }
    if(typeof base!=='object'){
        return base
    }
    if(Array.isArray(base)){
        return base.concat(...from) as T
    }
    for (const item of from){
        for(const key in item){
            if(base.hasOwnProperty(key)){
                if(typeof base[key]==='object'){
                    base[key]=deepMerge(base[key],item[key])
                }else{
                    base[key]=item[key]
                }
            }else{
                base[key]=item[key]
            }
        }
    }
    return base
}
// 深拷贝
export function deepClone<T extends any>(obj:T):T {
    if(typeof obj!=='object') return obj
    if(!obj) return obj
    //判断拷贝的obj是对象还是数组
    if(Array.isArray(obj)) return obj.map((item)=>deepClone(item)) as T
    const objClone={} as T
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === "object") {
                objClone[key] = deepClone(obj[key]);
            } else {
                objClone[key] = obj[key];
            }
        }
    }
    return objClone;
}

export function pick<T, K extends keyof T>(source: T, keys?: Iterable<K>, forced?: boolean) {
    if (!keys) return { ...source }
    const result = {} as Pick<T, K>
    for (const key of keys) {
        if (forced || key in source) result[key] = source[key]
    }
    return result
}

export function omit<T, K extends keyof T>(source: T, keys?: Iterable<K>) {
    if (!keys) return { ...source }
    const result = { ...source } as Omit<T, K>
    for (const key of keys) {
        Reflect.deleteProperty(result, key)
    }
    return result
}
