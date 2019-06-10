import React from 'react';
import { shallow } from 'enzyme';
import filedetails from './filedetails.js';

describe('filedetails', () => {
    test('Rendering filedetails component', () => {
        const wrapper = shallow(<filedetails />);
        expect(wrapper).toMatchSnapshot();
    });
});  