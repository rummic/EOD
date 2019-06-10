import React from 'react';
import { shallow } from 'enzyme';
import login from './login.js';

describe('login', () => {
    test('Rendering login component', () => {
        const wrapper = shallow(<login />);
        expect(wrapper).toMatchSnapshot();
    });
});  

/*describe('Test case for testing login',() =>{
let wrapper;
test('login check with right data',()=>{
wrapper = shallow(<login/>);
wrapper.find('input[type="text"]').simulate('change', {target: {name: 'login', value: 'superadmin'}});
wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin'}});
wrapper.find('button').simulate('click');
expect(wrapper.state('isLogined')).toBe(true);
})
})*/