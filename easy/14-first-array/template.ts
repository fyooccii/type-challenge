/**
 * 1. extends 类型条件判断
 *
 * 2. 获取 tuple 的 length 的属性
 *     对type使用'[parameter]'，将获取该type中该属性的type，同样也适用于interface，class。
 * 3. extends union 判断规则
 *     如果extends右侧是一个union时，会对union中的每一项与extends左侧的type挨个比较
 *     (如果左侧也是也是union类型的话，会将其看成一个整体和右侧的union进行比较)
 *     ，如果其中一个满足，则表达式为真。
 *     ...可以直接理解成 A extends B -> A 中的所有元素都来源于 B （仅在union时适用）
 * 4. infer 的使用
 *     目前的用法就是配合extends来做一个数组结构。
 */

type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
// 这里是直接限制了T等于[]的情况
type First2<T extends any[]> = T extends [] ? never : T[0];
type First3<T extends any[]> = T[0] extends T[number] ? T[0] : never;
// 相当于js中的解构，具体用法不是很熟悉。
// 对于这道题的逻辑是，尝试从T中进行结构，如果结构成功则返回第一个值的类型，否则返回never
type First4<T extends any[]> = T extends [infer f, ...infer rest] ? f : never;

type test = First<[]>;
type test2 = First2<[]>;
type test3 = First3<[]>;
type test4 = First4<[1, 'abc']>;

// js
function First(arr: any[]) {
    return typeof arr[0];
}

type testDemo = true extends string | number ? 'abc' : never;

type union_one = 'abc' | 1 | 2;
type union_two = 1 | 2 | 'abc';
type Type_1 = union_one extends union_two ? string : number;
type single_one = 'abc';

type Type_3 = union_one extends single_one ? string : number;

interface A {
    name: string;
}

interface B extends A {
    age: number;
}

type Type_2 = B extends A ? string : number;

type union_three = 'a' | 'm' | 'b';
type union_four = [
    {
        a: string;
        b: number;
    }
];
const m: union_four = [{ a: 'a', b: 1 }];
type test_three = union_four[number];
