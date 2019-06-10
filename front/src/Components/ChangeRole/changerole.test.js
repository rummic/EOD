import React from 'react';
import { shallow } from 'enzyme';
import changerole from './changerole.js';

describe('changerole', () => {
    test('Rendering changerole component', () => {
        const wrapper = shallow(<changerole />);
        expect(wrapper).toMatchSnapshot();
    });
});  