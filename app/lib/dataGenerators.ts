import { faker } from '@faker-js/faker';

export type FieldType = 'Name' | 'Email' | 'Integer' | 'Date' | 'Boolean' | 'Sentence';

export function generateValue(type: FieldType) {
    switch (type) {
        case 'Name': return faker.person.fullName();
        case 'Email': return faker.internet.email();
        case 'Integer': return faker.number.int({ min: 0, max: 1000 });
        case 'Date': return faker.date.past().toISOString().split('T')[0];
        case 'Boolean': return faker.datatype.boolean();
        case 'Sentence': return faker.lorem.sentence();
        default: return '';
    }
}
