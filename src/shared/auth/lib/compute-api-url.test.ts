import { describe, it, expect } from "vitest";
import { computeApiUrl } from "./compute-api-url";

describe("computeApiUrl", () => {
  it("берёт первые 4 цифры idInstance и лепит из них apiUrl", () => {
    expect(computeApiUrl("310022743284")).toBe(
      "https://3100.api.green-api.com",
    );
  });

  it("то же самое, но на другом инстансе — не подгонка под один пример", () => {
    expect(computeApiUrl("710012345678")).toBe(
      "https://7100.api.green-api.com",
    );
  });
});
