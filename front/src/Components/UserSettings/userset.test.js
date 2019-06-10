import React from "react";
import userset from "./userset";
import { shallow } from 'enzyme';

describe('userset', () => {
    test('Rendering userettings component', () => {
        const wrapper = shallow(<userset />);
        expect(wrapper).toMatchSnapshot();
    });
});  