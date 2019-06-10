import React from 'react';
import { shallow } from 'enzyme';
import addfile from './addfile.js';

describe('addfile', () => {
    test('Rendering addfile component', () => {
        const wrapper = shallow(<addfile />);
        expect(wrapper).toMatchSnapshot();
    });
});  