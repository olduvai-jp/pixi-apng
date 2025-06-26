# PixiJS Animated PNG (APNG)

[![Node.js CI](https://github.com/pixijs-userland/gif/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/pixijs-userland/gif/actions/workflows/nodejs.yml)

Plugin to support playback of animated PNG (APNG) images in PixiJS. Unlike normal APNG playback in the browser, this plugin allows you to stop, loop, change speed, or go to a specific frame.

* [Demo](https://userland.pixijs.io/gif/examples/)
* [API Documentation](https://userland.pixijs.io/gif/docs/)

## Usage

Load an animated PNG (APNG) image with Assets:

```ts
import '@olduvai-jp/pixi-apng';
import { Assets } from 'pixi.js';

const app = new Application();
const apng = await Assets.load('image.apng');
app.stage.addChild(apng);
```

To use an APNG without Assets:

```ts
import { Application } from 'pixi.js';
import { AnimatedAPNG } from '@olduvai-jp/pixi-apng';

const app = new Application();
fetch('image.apng')
    .then(res => res.arrayBuffer())
    .then(AnimatedAPNG.fromBuffer)
    .then(apng => app.stage.addChild(apng));
```

### Version Compatiblity

| PixiJS | PixiJS APNG |
|--------|-------------|
| v8.x   | v0.x        |
