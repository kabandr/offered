import dateFormatter from "./dateFormatter";

it("should format an ISO string", () => {
  const ISOString = "2022-11-11T12:11:08.212Z";

  expect(dateFormatter(ISOString)).toBe("November 11, 2022");
});
