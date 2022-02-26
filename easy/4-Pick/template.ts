/**
 * keyof 返回的是一个联合类型
 * [P in K] in后面跟联合类型 -> 循环K -> mapped
 * T[P] -> 取到T中P属性的类型 -> indexed
 * keyof -> 相当于看看这个T里面有些什么东西 -> lookup
 * extends -> Generic Constrains
 */

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};
