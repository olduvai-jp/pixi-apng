import { DOMAdapter, extensions, ExtensionType, path } from 'pixi.js';
import { AnimatedAPNG, AnimatedAPNGOptions } from './AnimatedAPNG';

import type { AssetExtension } from 'pixi.js';

/**
 * Handle the loading of APNG images. Registering this loader plugin will
 * load all `.apng` images as an ArrayBuffer and transform into an
 * AnimatedAPNG object.
 * @ignore
 */
const APNGAsset = {
    extension: ExtensionType.Asset,
    detection: {
        test: async () => true,
        add: async (formats) => [...formats, 'apng'],
        remove: async (formats) => formats.filter((format) => format !== 'apng'),
    },
    loader: {
        name: 'apngLoader',
        test: (url) => path.extname(url) === '.apng',
        load: async (url, asset) =>
        {
            const response = await DOMAdapter.get().fetch(url);
            const buffer = await response.arrayBuffer();

            return AnimatedAPNG.fromBuffer(buffer, asset?.data);
        },
        unload: async (asset) =>
        {
            asset.destroy();
        },
    }
} as AssetExtension<AnimatedAPNG, AnimatedAPNGOptions>;

extensions.add(APNGAsset);

export { APNGAsset };