import React from 'react';
import { shallow } from 'enzyme';
import home from './home.js';

describe('home', () => {
    test('Rendering home component', () => {
        const wrapper = shallow(<home />);
        expect(wrapper).toMatchSnapshot();
    });
});  