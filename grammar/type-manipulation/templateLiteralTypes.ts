type World = 'World';
type HelloWorld = `Hello ${World}`;
// When a union is used in the interpolated position,
// the type is the set of every possible string literal that could be represented by each union member:
type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // 类似于unionType extends OtherType的分发性
// For each interpolated position in the template literal, the unions are cross multiplied:
// 如果存在多个联合类型，那么最终的结果是每个联合类型一对一的结合
