type Length<T extends ReadonlyArray<any>> = T['length'];

const tesla = ['model 3', 'model y', 'model x'] as const;

type t2 = typeof tesla;

type t1 = Length<typeof tesla>;
