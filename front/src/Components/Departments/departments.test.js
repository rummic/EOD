import React from 'react';
import { shallow } from 'enzyme';
import changemenager from './changemenager';
import departments from './departments';
import adddepartment from './adddepartment';

describe('departments', () => {
    test('Rendering departments component', () => {
        const wrapper = shallow(<departments />);
        expect(wrapper).toMatchSnapshot();
    });
    test('Rendering adddepartment component', () => {
        const wrapper = shallow(<adddepartment />);
        expect(wrapper).toMatchSnapshot();
    });
    test('Rendering changemenager component', () => {
        const wrapper = shallow(<changemenager />);
        expect(wrapper).toMatchSnapshot();
    });
});  