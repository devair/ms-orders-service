
export function genId( arg:  any []): number{
    return arg.length > 0 ? Math.max(...arg.map(item => item.id)) + 1 : 1
}