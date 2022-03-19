// When the type on the left of the extends is assignable
// to the one on the right, then you’ll get the type in the first branch (the “true” branch);
// otherwise you’ll get the type in the latter branch (the “false” branch).

// SomeType extends OtherType ? TrueType : FalseType;
// 如果SomeType能够赋值给OtherType，则执行前一个分支

// 在泛型中的extends表示前者必须是T是后者联合类型的子集，这里是起一个约束作用
// 在后面的赋值语句中extends表示前者能否赋值给后者，这里是起一个判断作用
// 'anyString' extends string => true
// 任意number数字 extends number => true
type Example<T extends number | string> = T extends number
    ? { a: string }
    : { b: number };
type testExample = Example<number>; // type testExample = {a:string}

// 用法1
// We can then use that conditional type
// to simplify our overloads down to a single function with no overloads.
type NameOrId<T> = T extends number ? 'type_one' : 'type_two';
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw 'unimplemented';
}
// 这里函数的泛型会自动通过参数来赋值上去 todo 应该会在函数泛型中有介绍
let a = createLabel(1); // typeof a === 'type_one'
let b = createLabel('1'); //typeof b === 'type_two

// 用法2
// Often, the checks in a conditional type will provide us with some new information.
// Just like with narrowing with type guards can give us a more specific type,
// the true branch of a conditional type will further constrain generics by the type we check against.
type MessageOf<T extends { message: unknown }> = T['message'];
type testMessageOf = MessageOf<{ message: number }>; // type testMessageOf = number
// However, what if we wanted MessageOf to take any type,
// and default to something like never if a message property isn’t available?
// We can do this by moving the constraint out and introducing a conditional type:
// 此时的T可以是任意type，如果该type中没有message这个property，则返回的类型是never
type messageOfAdvanced<T> = T extends { message: unknown }
    ? T['message']
    : never;

// 用法3
// Inferring Within Conditional Types
// 可以通过infer关键字来声明一个新的泛型，这样做的好处是避免了我们去深挖一个泛型中所包含的类型
// example1 获取函数的返回值
type getReturnType<T> = T extends (...args: any[]) => infer Return
    ? Return
    : never;
function testReturnTypeFunc() {}
type returnTypeOne = getReturnType<typeof testReturnTypeFunc>; // type returnTypeOne = void
// 注意：如果对一个重载函数使用的话，那么得到的type将是最后一个签名的函数的type

// 用法4
// Distributive Conditional Types
// 如果传入的泛型是一个联合类型，那么将会对该联合类型中的每一项进行分支判断操作
type ToArray<T> = T extends any ? T[] : never;
type StrAndNum = ToArray<string | number>; // type StrAndNum = string[] | number[]
//  当然，可以通过给泛型添加中括号的方式来阻止Distributive
type ToArrayNoDis<T> = [T] extends [any] ? T[] : never;
type StrAndNumNoDist = ToArrayNoDis<string | number>; // type Str... = (string|number)[]
