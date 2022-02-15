import './style.css';
import p5 from 'p5';

const _app = new p5((p5Instance) => {
  const p = p5Instance;

  const densityString =
    '@QB#NgWM8RDHdOKq9$6khEPXwmeZaoS2yjufF]}{tx1zv7lciL/\\|?*>r^;:_"~,\'`  ';
  let video;
  let outputDiv;

  p.setup = () => {
    p.noCanvas();
    let x = 65;
    video = p.createCapture(p.VIDEO);
    video.size(x, x);
    outputDiv = p.createDiv();
  };

  p.draw = () => {
    video.loadPixels();
    let outputImage = '';
    let tune = 1;
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (i + j * video.width) * 4;
        const r = video.pixels[pixelIndex + 0] + tune;
        const g = video.pixels[pixelIndex + 1] + tune;
        const b = video.pixels[pixelIndex + 2] + tune;
        const a = video.pixels[pixelIndex + 3];
        const brightness = p.brightness(r, g, b, a);
        const charIndex = p.floor(
          p.map(brightness, 0, 255, densityString.length, 0)
        );
        outputImage +=
          densityString.charAt(charIndex) === ' '
            ? '&nbsp;'
            : `<span style="color:${p
                .color(r, g, b, 0.9)
                .toString('#rrggbb')}" >${densityString.charAt(
                charIndex
              )}</span>`;
      }
      outputImage += '<br>';
    }
    outputDiv.html(outputImage);
  };
}, document.getElementById('app'));
