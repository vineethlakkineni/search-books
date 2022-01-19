import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("MyComponent", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App />);
	});
	afterEach(() => {
		jest.useRealTimers();
	});
	it("should render correctly", () => {
		expect(wrapper).toMatchSnapshot();
	});
	it("should have an input field", () => {
		expect(wrapper.find("input").length).toEqual(1);
	});
	it("should render input and match value", () => {
		wrapper.find("input").simulate("change", {
			target: {
				value: "abc",
			},
		});
		expect(wrapper.find("input").prop("value")).toEqual("abc");
	});
	it("should simulate keypress - enter key with empty", () => {
		wrapper.find("input").simulate("change", {
			target: {
				value: "",
			},
		});
		wrapper.find("input").simulate("keypress", { key: "Enter" });
		expect(wrapper.find(".book").length).toEqual(0);
	});
});
