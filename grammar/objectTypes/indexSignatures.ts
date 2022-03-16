interface StringArray {
    // 当我不知道这个type的key的名字，但是知道这个key所对应value的类型时
    [anyName: number]: string;
}

let myArray: StringArray = {
    1: '1',
};
const secondItem = myArray[1]; // v:string

// An index signature property type must be either ‘string’ or ‘number’.
// 可以同时支持这两种type的索引
// 但是有一个点需要注意：type为number的索引，它所有对应的value的type必须是string所对应value的type的字类型
// 原因是js在通过number进行索引时，会将number转换为string
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

interface OK {
    [stringIndex: string]: Animal;
    [numberIndex: number]: Dog | Animal;

    // error
    // [stringIndex: string]: Dog;
    // [numberIndex: number]: Animal;
}

interface NumberDictionary {
    [anyName: string]: number;

    length: number; // ok
    // error 当在访问string类型的key时，value的类型永远都是number，可以通过下面的例子来解决这个问题
    // name: string;
}

interface NumberOrStringDictionary {
    [anyName: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}

// readonly
interface ReadonlyStringArray {
    readonly [anyName: number]: string;
}

const myArray1: ReadonlyStringArray = {
    1: '1',
};
// error
// myArray1[1] = '2'
