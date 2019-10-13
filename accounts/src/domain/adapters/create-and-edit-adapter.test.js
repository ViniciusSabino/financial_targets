import { createAndEditAdapter } from '.';
import mock from '../../__mocks__/adapters';

jest.mock('../common', () => ({
    setTheStatus: jest.fn(() => 'MOCK'),
}));

describe('Domain/Adapters', () => {
    describe('Create and Edit Adapter', () => {
        it('should the account contain the required properties', () => {
            const account = createAndEditAdapter(mock.createAndEdit);

            Object.keys({ ...mock.createAndEdit, status: 'MOCK' }).forEach((key) => {
                expect(account).toHaveProperty(key);
            });
        });
    });
});
