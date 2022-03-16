type Includes<T extends readonly any[], U> = T extends [infer A, ...infer B]
    ? U extends A
        ? true
        : Includes<B, U>
    : false;

type ttt1 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>;

type ta = [{ a: '1' }];
type tb = ta[number];
type tc = boolean;
type td = false;
type te = td extends tc ? string : number;
