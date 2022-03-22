// The in operator narrowing
// js中的 in 操作符用来判断一个对象中是否有某个属性
// ts中 有点不一样
// value in x => 此时 x 是一个 union type

// Using type predicates
type Fish = {
    swim: () => void;
};
type Bird = {
    fly: () => void;
};
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
// pet is Fish is our type predicate in this example. A predicate takes the form parameterName is Type,
// where parameterName must be the name of a parameter from the current function signature.
