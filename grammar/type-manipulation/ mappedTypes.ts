type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};
type OptionFlags<T> = {
    // P in unionType 遍历union中的每一项
    [P in keyof T]: boolean;
};
type FeatureOptions = OptionFlags<FeatureFlags>; // type FeatureOptions = {darkMode: boolean, newUserProfile: boolean}
// Mapping Modifiers
// There are two additional modifiers which can be applied during mapping:
// readonly and ? which affect mutability and optionality respectively.
// You can remove or add these modifiers by prefixing with - or +.
// If you don’t add a prefix, then + is assumed.

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>; // 消除了LockedAccount中所有属性的只读性

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};
type User = Concrete<MaybeUser>; // 去除MayBeUser中的所有属性的可选性
type PartialUser = Partial<User>; // Partial将type中所有属性设置为可选

// Key Remapping via as
// todo 这里的用法和具体实现方式不是很清楚，以后再深究
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};
interface Person1 {
    name: string;
    age: number;
    location: string;
}
type PGetters = Getters<Person1>;

// You can filter out keys by producing never via a conditional type:
type RemoveKindField<T> = {
    [P in keyof T as Exclude<P, 'kind'>]: T[P];
};
interface Circle {
    kind: string;
    radius: number;
}
type KindLessCircle = RemoveKindField<Circle>; // type Kind... = {radius: number}

// You can map over arbitrary（任意的）unions,
// not just unions of string | number | symbol, but unions of any type:
type EventConfig<Event extends { kind: string }> = {
    [E in Event as E['kind']]: (event: E) => void;
    // [E in keyof Event]: string;
};
type SquareEvent = { kind: 'squareEvent'; x: number; y: number };
type CircleEvent = { kind: 'circleEvent'; radius: number };
type unionProperty = SquareEvent | CircleEvent;
type Config = EventConfig<unionProperty>;

// type a = { a: string };
// type b = { b: number } & a;
// type c = { c: number } | a;
// const mmmm: b = { a: '1', b: 1 };
// const mmmmm: c = { c: 1 };
