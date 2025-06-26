import { Assets } from 'pixi.js';
import { AnimatedAPNG, APNGAsset } from '../src';
import { createServer } from './resources';

describe('APNGLoader', () =>
{
    let server: any;
    let baseUrl: string;

    beforeAll(() =>
    {
        server = createServer(54311);
        baseUrl = 'http://localhost:54311';
    });

    afterAll(() =>
    {
        server.close();
        server = null;
    });

    afterEach(() =>
    {
        Assets.reset();
    });

    it('should have a loader', () =>
    {
        expect(typeof APNGAsset).toBe('object');
    });

    it('should load an apng file', async () =>
    {
        const url = `${baseUrl}/example.apng`;

        Assets.add({ alias: 'test', src: url });
        const test = await Assets.load('test');

        expect(test);
        expect(test).toBeInstanceOf(AnimatedAPNG);
        expect(test.loop).toBe(true);
        expect(test.currentFrame).toBe(0);
        expect(test.autoUpdate).toBe(true);
        expect(test.playing).toBe(true);
        expect(test.totalFrames).toBeGreaterThan(0);
        expect(test.progress).toBe(0);
        expect(test.width).toBeGreaterThan(0);
        expect(test.height).toBeGreaterThan(0);
        expect(test.onComplete).toBe(null);
        expect(test.onFrameChange).toBe(null);
        expect(test.onLoop).toBe(null);
        expect(test._frames);
        await Assets.unload('test');
        expect(test._frames).toBe(null);
    });

    it('should load an apng file with options', async () =>
    {
        const url = `${baseUrl}/example.apng`;

        const data = { loop: false, autoUpdate: false, animationSpeed: 2 };

        Assets.add({ alias: 'test1', src: url, data });
        const test = await Assets.load('test1');

        expect(test);
        expect(test).toBeInstanceOf(AnimatedAPNG);
        expect(test.loop).toBe(false);
        expect(test.animationSpeed).toBe(2);
        expect(test.autoUpdate).toBe(false);
        await Assets.unload('test1');
    });
});