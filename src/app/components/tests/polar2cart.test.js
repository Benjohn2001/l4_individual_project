import polar2cart from "../polar2cart";

test("correct conversion", () => {
  expect(polar2cart(0, 0, 5, 90)).toStrictEqual({ x: 5, y: 0 });
});
