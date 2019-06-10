import React from "react";
import showfiles from "./showfiles";
import { shallow } from 'enzyme';

describe('showfiles', () => {
    test('Rendering showfiles component', () => {
        const wrapper = shallow(<showfiles />);
        expect(wrapper).toMatchSnapshot();
    });
});  