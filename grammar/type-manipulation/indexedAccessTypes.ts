type Person = { age: number; name: string; alive: boolean };
type Age = Person['age']; // type Age = number
