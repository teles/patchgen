# 1.0.0 (2026-03-28)

## v1.1.0

Released on 2026-05-15.

### Features

- add tag comparison patch mode ([3b5caec](https://github.com/teles/patchgen/commit/3b5caec4cde566f58134efdc93fd39fe74180b3f))

### Other Changes

- ci(release): use zero-release ([7606a01](https://github.com/teles/patchgen/commit/7606a0178011a650b32c4c1189ffc73240642a9b))
- docs: document tag comparison workflow ([e9ea031](https://github.com/teles/patchgen/commit/e9ea031c227aeb18f016c2792366af93e61d1968))
- ci: add github pages deploy workflow for docs ([bd2bcc0](https://github.com/teles/patchgen/commit/bd2bcc0ee1a2215ca078ba9b413c93b3528007f3))
- docs: add reference pages for CLI flow, git commands, and limitations ([bac3baa](https://github.com/teles/patchgen/commit/bac3baaea8082255ace367ce2744955a9c9d08e3))
- docs: add use case pages for staged, branch-compare, file-selection, and AI ([26382dc](https://github.com/teles/patchgen/commit/26382dcba9c9654cbfcc490beabd98e87ee59c36))
- docs: add getting-started and why-patchgen guides ([ef56d34](https://github.com/teles/patchgen/commit/ef56d346206bef89533a4272d29c69adcd072d46))
- docs: add landing page ([a66ffc3](https://github.com/teles/patchgen/commit/a66ffc35f53a1b75bdfd211c6fda6a1adab18c83))
- docs: add vitepress config and logo ([f323f03](https://github.com/teles/patchgen/commit/f323f035ecf10ced1a93f004eaf1257de9bf28be))
- chore: add vitepress and docs scripts ([eb7216c](https://github.com/teles/patchgen/commit/eb7216c71ad0f3c84b490cf6326a8aa81d1ab08b))
- chore: add vitepress build artifacts to gitignore ([3b76be0](https://github.com/teles/patchgen/commit/3b76be0ed2438c18a85dc9e5339095c459ba1b33))

[Compare changes](https://github.com/teles/patchgen/compare/v1.0.0...v1.1.0)


### Features

* add public API exports ([d312daa](https://github.com/teles/patchgen/commit/d312daa82de796ec4088f967e56d5e24049afaf7))
* **app:** add patch generation logic ([24e431c](https://github.com/teles/patchgen/commit/24e431c32ce7d221da39e4c639a3018ca96fb955))
* **app:** integrate file selection in patch generation ([01d5e7e](https://github.com/teles/patchgen/commit/01d5e7ea32dee5aed555fe7d4dfc91d7cdc26989))
* **cli:** add main CLI entry point ([93f421c](https://github.com/teles/patchgen/commit/93f421c0e41979aa6e6e65970b288342c5da145b))
* **config:** add patch rules configuration ([3658fa5](https://github.com/teles/patchgen/commit/3658fa53c54d89601687bc7c567b0a4192240bd0))
* **config:** integrate file selection into patch rules ([ebc5551](https://github.com/teles/patchgen/commit/ebc5551e0da6b771157002bec582111ec6e0fb24))
* **core:** add branch compare builders ([e09b247](https://github.com/teles/patchgen/commit/e09b247cdefe8d15341544c85823d8e0264ee976))
* **core:** add file filtering to branch compare git command ([a862c99](https://github.com/teles/patchgen/commit/a862c99e4fc79ea05927ab81e9c82a237db16830))
* **core:** add file filtering to staged git command ([8443bf6](https://github.com/teles/patchgen/commit/8443bf6e185031e2fd2aa2cef627ebca6f30bf7b))
* **core:** add file selection info to summary builders ([88506c6](https://github.com/teles/patchgen/commit/88506c6eb4f4aa45f8b7ec21dd7467875e6970a9))
* **core:** add FileSelection type ([ed53944](https://github.com/teles/patchgen/commit/ed5394414281ea654c7b80c66acc10902e244264))
* **core:** add patch types and utility functions ([4169f62](https://github.com/teles/patchgen/commit/4169f629690e9e5992331c7293004b931d354e71))
* **core:** add staged patch builders ([b86c2aa](https://github.com/teles/patchgen/commit/b86c2aaf06bfd93323df27e9327d1c0a49469c9b))
* **core:** add summary builders ([de4dae4](https://github.com/teles/patchgen/commit/de4dae4e876c6892d647ec6e51bbf4ec9bec5e42))
* **infra:** add CLI prompts and utilities ([f8f5929](https://github.com/teles/patchgen/commit/f8f592988803acb7f24c1134b9fc797070bacd80))
* **infra:** add file selection prompts ([2b8201d](https://github.com/teles/patchgen/commit/2b8201d4edb09ac858e14e5b1fb8c5bf5687bd97))
* **infra:** add git and filesystem utilities ([90751fd](https://github.com/teles/patchgen/commit/90751fd6f238ca9c106367787b072a27930d83f7))
* **infra:** add git file listing functions ([e774353](https://github.com/teles/patchgen/commit/e7743535d9a4cedc349c35f2aa3df0f3f471e843))
