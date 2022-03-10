Simple example of making jump-to-source work in VSCode for a monorepo. In `./packages/second/src/index.ts`, you can `cmd+click` on the `first` function, and instead of going to the type definition in `./packages/first/dist/index.d.ts`, it will go directly to the source code.

The key is the `paths` entry in `./tsconfig.json`. The wildcard pattern says "for any `@acme` dependency, skip the type definition and go to the corresponding package's `src` dir. Note that all of the paths listed are relative to `baseUrl`, which is why they don't include `packages/`. The wildcard is merely a convenience if all `@acme` projects are in the same monorepo. If that's not the case, these can be listed individually instead.

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./packages",
    "paths": {
      "@acme/first": ["first/src"],
      "@acme/second": ["second/src"]
    }
  }
}
```

VSCode looks at that file by default, so this file is essentially just "donated" to the IDE. All of the actual build configs inherit from `./tsconfig.base.json` (as does `./tsconfig.json`), so it can be used for any other editor-specific settings, like including test dirs that should be excluded from the real build.