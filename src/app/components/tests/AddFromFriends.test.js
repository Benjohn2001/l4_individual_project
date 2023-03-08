import { render, screen, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AddFromFriends from "../AddFromFriends";

test("Check AddFromFriends renders correctly and onpress works", () => {
  const data1 = {
    bio: "Add a bio!",
    email: "ts@gmail.com",
    firstName: "Tara",
    lastName: "Smith",
    userName: "tdawg123",
  };
  const snap1 = { val: () => data1 };
  const onPressMock = jest.fn();
  render(
    <AddFromFriends
      title="press"
      onPress={() => {
        onPressMock();
      }}
      data={snap1}
      icon="users"
    />
  );
  fireEvent.press(screen.getByText("press"));
  expect(onPressMock);
  const domTree = renderer
    .create(
      <AddFromFriends
        title="press"
        onPress={() => {
          onPressMock();
        }}
        data={snap1}
        icon="users"
      />
    )
    .toJSON();
  expect(domTree).toMatchSnapshot();
});
