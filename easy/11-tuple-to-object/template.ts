type TupleToObject<T extends readonly (string | number | symbol)[]> = {
    [P in T[number]]: P; // -> 一个对象的索引只能是这三种类型
};

const arr = [1, 2] as const;
// const testType: TupleToObject<typeof arr> = {};

// function TupleToObject(arr: any[]) {
//     return arr.reduce(
//         (result: {}, cur: string) => ({
//             ...result,
//             [cur]: cur,
//         }),
//         {}
//     );
// }

// const testResult = TupleToObject(['tesla', 'modal 3']);
// console.log(testResult);

// 字面量类型
let normalA = 'abc';
type nA = typeof normalA; // type nA = string
const constA = 'qwe';
type cA = typeof constA; // type cA = 'qwe -> 不可被修改 -> 字面量类型
// typeof 将js的东西转换为ts可以认识的内容

// as const -> 转换为readonly

// P in Array[number] -> 遍历数组的语法
