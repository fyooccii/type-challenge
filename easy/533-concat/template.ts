/**
 * type支持结构操作
 */

type Concat<T extends any[], U extends any[]> = [...T, ...U];
