import { parse } from "https://deno.land/std@0.130.0/flags/mod.ts";
import { checkIfPasswordHashExistsInHIBP, promptSecret } from "./utils.ts";

async function main(args: string[]) {
  let { password: passwordToCheck } = parse(args);

  if (!passwordToCheck) {
    passwordToCheck = await promptSecret(
      "Please enter the password you want to check (output will be hidden): ",
    );
    console.log("");
  }

  if (!passwordToCheck) {
    console.log("No password to check. Exiting.");
    Deno.exit(1);
  }

  const hashedPasswordData = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(passwordToCheck),
  );

  const hashedPassword = Array.from(new Uint8Array(hashedPasswordData)).map(
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");

  const passwordExists = await checkIfPasswordHashExistsInHIBP(hashedPassword);

  if (passwordExists) {
    console.log("Password exists! You have been pwned!");
  } else {
    console.log("Password does NOT exist! You have NOT been pwned!");
  }

  Deno.exit(0);
}

await main(Deno.args);
