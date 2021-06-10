import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserProfile from "./UserProfile";
import ReactDOM from "react-dom";

it("renders correctly", () => {
	const { queryByTestId, queryByNameParams } = render(<UserProfile />);
	expect(queryByTestId("edit-button")).toBeTruthy();
	expect(queryByTestId("cake-day")).toBeTruthy();
	expect(queryByTestId("color")).toBeTruthy();
	expect(queryByTestId("image")).toBeTruthy();
	expect(queryByTestId("user-name")).toBeTruthy();
});

test("Click", () => {
	const { queryByTestId } = render(<UserProfile />);
	const button = queryByTestId("edit-button");
	fireEvent.click(button);
});

describe("Input value", () => {
	it("updates on change", () => {
		const { queryByPlaceholderText, queryByTestId } = render(
			<UserProfile />
		);
		const button = queryByTestId("edit-button");
		fireEvent.click(button);

		const searchInput = queryByPlaceholderText("color");

		fireEvent.change(searchInput, { target: { value: "test" } });

		expect(searchInput.value).toBe("test");
	});
});

{
	/* The test above will fail, but what it is essentially trying to accomplish is testing input changes after simulating a button click. 
This is because these fields are only available after a button click. 
On sucess, I wil be able to test the following fields:

- Date picker
- Color field
- Name field
- Presence of 'clear changes'

To test the birthday functionality, I would pass todays date as the input for cake day, and then assert the presence of confetti by testing against a test-id.
 I would wire this test ID to the confetti component by perhaps enclosing it in a div tag and testing for the presence of that div tag
 If we are seeking true comprehensiveness, we should probably test the lack of presence of a placeholder when the component is rendered,
 as it should not be editable by default
 We should also make sure the switch from Edit to Save happens by asserting the presence of the name "Save" afer firing a button click. 

 Lastly it would also be great to test the clear changes button. This can be done by asserting the presence of "Edit profile" or lack of Placeholder text
 after firing the button click event on "clear changes"

Unfortunately all these events happen after the click of a button, and until I figure out how to chain these events, I will be unable to test them.*/
}
