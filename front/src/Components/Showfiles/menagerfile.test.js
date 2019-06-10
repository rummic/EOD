import React from "react";
import showfiles from "./menagerfile";
import { shallow } from 'enzyme';

describe('showfiles', () => {
    test('Rendering menagerfile component', () => {
        const wrapper = shallow(<showfiles />);
        expect(wrapper).toMatchSnapshot();
    });
});  