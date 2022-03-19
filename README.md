# Have I Been Pwned CLI - Deno

[![](https://github.com/BrunoBernardino/haveibeenpwned-cli-deno/workflows/Run%20Tests/badge.svg)](https://github.com/BrunoBernardino/haveibeenpwned-cli-deno/actions?workflow=Run+Tests)
[![](https://shield.deno.dev/x/haveibeenpwned)](https://deno.land/x/haveibeenpwned)

This is a small and simple CLI script to check against
["Have I Been Pwned" (HIBP)](https://haveibeenpwned.com) if a given password has
been involved in a breach.

The password never leaves your device, only the first 5 chars of the SHA-1
hashed password are sent to the HIBP API/server, and the comparison is then made
locally, with the hundreds of potential matches sent back.

You can learn more about it at
https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange

## Requirements

This was tested with `deno@1.20.1`, though it's possible older versions might
work.

There are no other dependencies. **Deno**!

## Usage (no install)

```sh
# interactive (password asked via prompt, so it's not logged in the shell history):
$ deno run --allow-net --unstable https://deno.land/x/haveibeenpwned@1.0.1/main.ts

# non-interactive:
$ deno run --allow-net --unstable https://deno.land/x/haveibeenpwned@1.0.1/main.ts --password=1234
```

## Usage (install)

```sh
$ deno install --allow-net --unstable https://deno.land/x/haveibeenpwned@1.0.1/main.ts --name haveibeenpwned

# interactive
$ haveibeenpwned

# non-interactive:
$ haveibeenpwned --password=1234
```

## Development

```sh
# interactive
$ make start

# non-interactive
$ deno run --allow-net --unstable main.ts --password=1234

# format
$ make format

# test
$ make test
```

## Deployment

```sh
$ git tag -s 1.0.x
$ git push origin --tags
```
