const specialKeyCodes = {
  ctrlC: "\u0003",
  ctrlD: "\u0004",
  backspace: "\u0008",
  escape: "\u001B",
};

export async function checkIfPasswordHashExistsInHIBP(passwordHash: string) {
  const hashPrefix = passwordHash.slice(0, 5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${hashPrefix}`,
  );

  const result = await response.text();

  const matchingHashSuffixes = result.split("\r\n");

  for (const matchingHashSuffix of matchingHashSuffixes) {
    const fullLowercaseHash = `${hashPrefix}${
      matchingHashSuffix.toLowerCase().split(":")[0]
    }`;

    if (fullLowercaseHash === passwordHash) {
      return true;
    }
  }

  return false;
}

export async function promptSecret(message: string): Promise<string | null> {
  Deno.stdout.write(new TextEncoder().encode(message));
  Deno.setRaw(0, true);

  let input = "";
  while (true) {
    const data = new Uint8Array(1);
    const nread = await Deno.stdin.read(data);
    if (!nread) {
      break;
    }

    const string = new TextDecoder().decode(data.slice(0, nread));

    for (const char of string) {
      switch (char) {
        case specialKeyCodes.ctrlC:
        case specialKeyCodes.ctrlD:
        case specialKeyCodes.escape:
          Deno.setRaw(Deno.stdin.rid, false);
          return null;

        case "\r":
        case "\n":
          Deno.setRaw(Deno.stdin.rid, false);
          return input;

        case specialKeyCodes.backspace:
          input = input.slice(0, input.length - 1);
          break;

        default:
          input += char;
          break;
      }
    }
  }

  return null;
}

export function getRandomString(size: number) {
  if (size % 2 == 1) {
    throw new Deno.errors.InvalidData("Only even sizes are supported");
  }

  const buffer = new Uint8Array(size / 2);

  crypto.getRandomValues(buffer);

  const stringParts: string[] = [];

  for (let i = 0; i < buffer.length; ++i) {
    stringParts.push(`0${buffer[i].toString(16)}`.slice(-2));
  }

  return stringParts.join("");
}
