import { deepClone, deepEqual, deterministicStringify, omit, pick, shake } from "./object";

describe("object utilities", () => {
  describe("pick", () => {
    test("picks specified keys from an object", () => {
      const source = { a: 1, b: 2, c: 3 };
      expect(pick(source, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    test("handles non-existent keys gracefully", () => {
      const source = { a: 1, b: 2 };
      expect(pick(source, ["c" as unknown as "a"])).toEqual({});
    });

    test("returns empty object when input is falsy", () => {
      expect(pick(null as unknown as object, [])).toEqual({});
    });
  });

  describe("omit", () => {
    test("omits specified keys from an object", () => {
      const source = { a: 1, b: "hello", c: true, d: null };
      expect(omit(source, ["b", "d"])).toEqual({ a: 1, c: true });
    });

    test("returns all keys when omitting empty list", () => {
      const source = { x: 10, y: 20 };
      expect(omit(source, [])).toEqual({ x: 10, y: 20 });
    });

    test("returns empty object when input is falsy", () => {
      expect(omit(null as unknown as object, [])).toEqual({});
    });
  });

  describe("deepClone", () => {
    test("creates an independent deep copy of nested objects and arrays", () => {
      const original = {
        name: "test",
        tags: ["alpha", "beta"],
        metadata: { env: "prod", count: 42 }
      };

      const clone = deepClone(original);
      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
      expect(clone.tags).not.toBe(original.tags);
      expect(clone.metadata).not.toBe(original.metadata);

      clone.tags.push("gamma");
      expect(original.tags).toEqual(["alpha", "beta"]);
    });

    test("correctly clones Date instances", () => {
      const date = new Date("2026-01-01T00:00:00.000Z");
      const clone = deepClone(date);
      expect(clone).toEqual(date);
      expect(clone).not.toBe(date);
      expect(clone.getTime()).toBe(date.getTime());
    });

    test("preserves primitive values and null", () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone("str")).toBe("str");
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });
  });

  describe("shake", () => {
    test("removes undefined and null values by default", () => {
      const source = { a: 1, b: undefined, c: null, d: "valid" };
      expect(shake(source)).toEqual({ a: 1, d: "valid" });
    });

    test("supports custom filter function", () => {
      const source = { a: 1, b: 0, c: "", d: "hello" };
      expect(shake(source, (val) => val === 0 || val === "")).toEqual({ a: 1, d: "hello" });
    });
  });

  describe("deepEqual", () => {
    test("returns true for deeply equivalent structures", () => {
      const a = { x: [1, 2], y: { z: "foo" } };
      const b = { x: [1, 2], y: { z: "foo" } };
      expect(deepEqual(a, b)).toBe(true);
    });

    test("returns false when nested properties differ", () => {
      const a = { x: [1, 2], y: { z: "foo" } };
      const b = { x: [1, 3], y: { z: "foo" } };
      expect(deepEqual(a, b)).toBe(false);
    });
  });

  describe("deterministicStringify", () => {
    test("produces identical JSON string regardless of key insertion order", () => {
      const obj1 = { b: 2, a: 1, c: { y: 20, x: 10 } };
      const obj2 = { a: 1, c: { x: 10, y: 20 }, b: 2 };
      expect(deterministicStringify(obj1)).toBe(deterministicStringify(obj2));
    });
  });
});
