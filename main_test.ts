import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { checkIfPasswordHashExistsInHIBP, getRandomString } from "./utils.ts";

Deno.test("checkIfPasswordHashExistsInHIBP should find an easy password", async () => {
  const passwordToCheck = "password";

  const hashedPasswordData = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(passwordToCheck),
  );

  const hashedPassword = Array.from(new Uint8Array(hashedPasswordData)).map(
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");

  const passwordExists = await checkIfPasswordHashExistsInHIBP(hashedPassword);

  assertEquals(passwordExists, true);
});

Deno.test("checkIfPasswordHashExistsInHIBP should not find a complex password", async () => {
  const passwordToCheck = getRandomString(50);

  const hashedPasswordData = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(passwordToCheck),
  );

  const hashedPassword = Array.from(new Uint8Array(hashedPasswordData)).map(
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");

  const passwordExists = await checkIfPasswordHashExistsInHIBP(hashedPassword);

  assertEquals(passwordExists, false);
});
