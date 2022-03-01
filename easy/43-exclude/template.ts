// 泛型中的extends遇到union类型时，会启用分配律进行挨个extends计算

type MyExclude<T, U> = T extends U ? never : T;

type t = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;

type tt = MyExclude<'a' | 'b' | 'c', 'a' | 'b'>;

type ttt = 'a' | 'c' extends 'a' | 'b' ? string : number;
