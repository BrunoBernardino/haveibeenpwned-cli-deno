.PHONY: start
start:
	deno run --allow-net --unstable main.ts

.PHONY: format
format:
	deno fmt

.PHONY: test
test:
	deno fmt --check
	deno lint
	deno test --allow-net --unstable
