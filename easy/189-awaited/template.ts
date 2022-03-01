type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer T>
    ? T extends Promise<unknown>
        ? MyAwaited<T>
        : T
    : never;

// infer
// 从这个例子理解感觉infer应该是新建了一个泛型变量，而这个泛型变量是来源于传入的参数T
// 这样做的好处之一是避免了在<>中再新增一个泛型变量
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type testFlatten1 = 'a';
const testFlatten2 = ['a', 'b'];
type result1 = Flatten<testFlatten1>;
type result2 = Flatten<typeof testFlatten2>;
// 获取一个函数的返回值类型
type getFuncReturn<T extends Function> = T extends () => infer R ? R : never;
function returnString(): string {
    return 'string';
}
function returnNumber(): number {
    return 1;
}
type testGetFuncReturnType1 = getFuncReturn<typeof returnString>;
