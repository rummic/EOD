import React from "react";
import sharedfiles from "./sharedfiles";
import { shallow } from 'enzyme';

describe('sharedfiles', () => {
    test('Rendering shaderfiles component', () => {
        const wrapper = shallow(<sharedfiles />);
        expect(wrapper).toMatchSnapshot();
    });
});  