function sum(a: number, b: number) {
  return a + b;
}

test('if I call sum function with 4 and 6 it should return 9', () => {
  const result = sum(4, 5);

  expect(result).toBe(9);
});
