import { render } from "@testing-library/react-native";
import ClockHand from "../ClockHand";

test("Check ClockHand working correctly", () => {
  const data1 = {
    bio: "Add a bio!",
    email: "ts@gmail.com",
    firstName: "Tara",
    lastName: "Smith",
    userName: "tdawg123",
  };
  const snap1 = { val: () => data1 };
  const snaps = [
    [snap1, "red", 0],
    [snap1, "red", 1],
    [snap1, "red", 2],
    [snap1, "red", 3],
    [snap1, "red", 4],
    [snap1, "red", 5],
    [snap1, "red", 5],
    [snap1, "red", 7],
    [snap1],
  ];
  const clockhand = render(
    <ClockHand radius={5} center={0} members={snaps} />
  ).toJSON();
  expect(clockhand.children.length).toBe(8);
});
