import { render, screen, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import PressableIcon from "../PressableIcon";

test("Check PressableIcon renders correctly and onpress works", () => {
  const onPressMock = jest.fn();
  render(
    <PressableIcon
      onPress={() => {
        onPressMock();
      }}
      icon="users"
      size={20}
      color="black"
    />
  );
  fireEvent.press(screen.getByTestId("pressableIcon"));
  expect(onPressMock);
  const domTree = renderer
    .create(
      <PressableIcon
        onPress={() => {
          onPressMock();
        }}
        icon="users"
        size={20}
        color="black"
      />
    )
    .toJSON();
  expect(domTree).toMatchSnapshot();
});
