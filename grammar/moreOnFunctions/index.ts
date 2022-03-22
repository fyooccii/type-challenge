// Call Signatures
// Note that the syntax is slightly different compared to a function type expression - use :
// between the parameter list and the return type rather than =>.
// 在type或者interface中，函数的返回值紧跟在 : 后， 而在参数列表中，返回值紧跟在 => 后。
// 可以用来给一个函数添加额外的属性
type DescribableFunction = {
    description: string;
    (...args: any[]): any[];
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description);
    return fn(1, 2, 3);
}
function implFunc(...args: any[]): any[] {
    console.log('return');
    return args;
}
implFunc.description = 'this is a function';
// console.log(doSomething(implFunc));

// Construct Signatures
type SomeConstructor = {
    new (s: string): { aName: string; feature: string };
};
function fn(ctor: SomeConstructor) {
    return new ctor('aName');
}
class Ctor {
    aName: string;
    feature: string;
    constructor(s: string) {
        this.aName = 'fy';
        this.feature = s;
    }
}
fn(Ctor);
// 一些构造函数，不需要 new 也能执行，如js中的Date，可以通过这种方式来合并。
interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
}

// Guidelines for Writing Good Generic Functions
// 1. Push Type Parameters Down
// 尽量使用类型本身，而不要对类型进行constraint

function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}

// aa: number (good)
const aa = firstElement1([1, 2, 3]);
// ba: any (bad)
const bb = firstElement2([1, 2, 3]);

// 咋一看是一样的，但是第二个函数的返回值是any类型，因为ts会通过constraint的类型来推断arr[0]

// 2. Use Fewer Type Parameters

// 3. Type Parameters Should Appear Twice

// 4. Optional Parameters in Callbacks
// 尽量在回调函数中不要使用可选参数

// other types
// unknown
// 它比any更加安全，因为unknown不能进行操作
let valK: unknown;
let valA: any;
// valK.a -> error
// valA.a -> success

// Function
// The global type Function describes properties like bind, call, apply,
// and others present on all function values in JavaScript.
// It also has the special property that values of type Function can always be called;
// these calls return any:
