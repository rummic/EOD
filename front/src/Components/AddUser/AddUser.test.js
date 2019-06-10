import React from 'react';
import { shallow } from 'enzyme';
import AddUser from './AddUser.js';

describe('AddUser', () => {
    test('Rendering AddUser component', () => {
        const wrapper = shallow(<AddUser />);
        expect(wrapper).toMatchSnapshot();
    });
});  