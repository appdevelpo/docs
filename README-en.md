[简体中文](README.md) | [English](README-en.md)

# Miru Documentation

## Contribution

This site is built with [starlight](https://starlight.astro.build/). The content of the site is written in MDX and the files are located in the root directory. If you only have minor changes, you can directly make modifications on the GitHub web interface and create a new pull request.

For local development, [Deno](https://deno.com/) is chosen as the project's package manager and runtime. You need to use Deno to install dependencies:

```bash
deno install
deno task dev
deno task build
deno task preview
```

You can also run Astro directly as an npm package via `deno run -A npm:astro dev`.

**Please note! After making modifications, make sure to use `build` and `start` to check if the build output is correct!**

## Modifying Text

- For information about supported Markdown extensions and the ability to use React syntax within Markdown, please refer to the starlight and astro documentation.
- For rules and recommendations on writing and maintaining documentation content, please refer to the writing guide.

## Writing Guide

**<u>Things to consider when writing content</u>**:

1. Leave a space between Chinese and English, such as `测试 test 测试`.
