import React from "react";
import sidebar from "./sidebar";
import { shallow } from 'enzyme';

describe('sidebar', () => {
    test('Rendering sidebar component', () => {
        const wrapper = shallow(<sidebar />);
        expect(wrapper).toMatchSnapshot();
    });
});  