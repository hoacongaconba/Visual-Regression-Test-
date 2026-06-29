const { test, expect } = require('@playwright/test');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch').default;

test('compare png images', async () => {

    const files = fs.readdirSync('./images/expected');

    for (const fileName of files) {

        const expectedPath = `./images/expected/${fileName}`;
        const actualPath = `./images/actual/${fileName}`;
        const diffPath = `./images/diff/${fileName}`;

        const img1 = PNG.sync.read(
            fs.readFileSync(expectedPath)
        );

        const img2 = PNG.sync.read(
            fs.readFileSync(actualPath)
        );

        const { width, height } = img1;

        const diff = new PNG({
            width,
            height
        });

        const diffPixels = pixelmatch(
            img1.data,
            img2.data,
            diff.data,
            width,
            height,
            {
                threshold: 0.1
            }
        );

        fs.writeFileSync(
            diffPath,
            PNG.sync.write(diff)
        );

        console.log(`${fileName}: ${diffPixels} pixels khác nhau`);

        expect(diffPixels).toBe(0);
    }
});