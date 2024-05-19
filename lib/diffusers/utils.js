const fs = require('fs');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');

async function export_to_gif(frames, outputFileName, delay = 100) {
    const canvas = createCanvas(frames[0].width, frames[0].height);
    const ctx = canvas.getContext('2d');

    const encoder = new GIFEncoder(frames[0].width, frames[0].height);
    encoder.createReadStream().pipe(fs.createWriteStream(outputFileName));

    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(delay); // in ms

    for (const frame of frames) {
        ctx.drawImage(frame, 0, 0);
        encoder.addFrame(ctx);
    }

    encoder.finish();
}

module.exports = { export_to_gif };