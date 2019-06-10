import React from "react";
import { create } from "react-test-renderer";
import UserList from "./userslist";
import { shallow } from 'enzyme';

describe('userslist', () => {
    test('Rendering userslist component', () => {
        const wrapper = shallow(<UserList />);
        expect(wrapper).toMatchSnapshot();
    });
});  


/*
    describe("userslist component", () => {
    it("shows a list of userslist", async () => {
    const component = create(<userslist />);
    const instance = component.getInstance();
    await instance.fetch("https://localhost:44388/api/Users");
    console.log(instance.state);
    });
*/
/*
  fetch("https://localhost:44388/api/Users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`
    }
  }).then(response =>
    response.json().then(responseJSON => {
      console.log(responseJSON);
      this.setState({
        users: responseJSON.value || []
      });
    })
  );
*/

