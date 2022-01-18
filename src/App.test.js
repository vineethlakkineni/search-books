import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("MyComponent", () => {
	it('should render correctly in "debug" mode', () => {
		const component = shallow(<App />);
		expect(component).toMatchSnapshot();
	});
});
