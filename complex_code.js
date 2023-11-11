/* filename: complex_code.js */

// This code demonstrates an advanced image manipulation algorithm using JavaScript

// Define the Image class
class Image {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = new Array(width * height);
  }

  getPixel(x, y) {
    return this.pixels[y * this.width + x];
  }

  setPixel(x, y, color) {
    this.pixels[y * this.width + x] = color;
  }
}

// Define the Color class
class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  static fromHex(hex) {
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);
    return new Color(red, green, blue);
  }

  toHex() {
    return `#${this.red.toString(16).padStart(2, '0')}${this.green.toString(16).padStart(2, '0')}${this.blue.toString(16).padStart(2, '0')}`;
  }

  blendWith(color, factor) {
    const red = Math.round(this.red * (1 - factor) + color.red * factor);
    const green = Math.round(this.green * (1 - factor) + color.green * factor);
    const blue = Math.round(this.blue * (1 - factor) + color.blue * factor);
    return new Color(red, green, blue);
  }
}

// Create a new image
const image = new Image(640, 480);

// Set pixels with random colors
for (let y = 0; y < image.height; y++) {
  for (let x = 0; x < image.width; x++) {
    const color = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    image.setPixel(x, y, color);
  }
}

// Define a function to apply a blur effect to the image
function applyBlurEffect(image, radius) {
  const result = new Image(image.width, image.height);
  
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      let redAccumulator = 0;
      let greenAccumulator = 0;
      let blueAccumulator = 0;
      let pixelCount = 0;
      
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const currentX = Math.max(0, Math.min(image.width - 1, x + dx));
          const currentY = Math.max(0, Math.min(image.height - 1, y + dy));
          const currentPixel = image.getPixel(currentX, currentY);
          
          redAccumulator += currentPixel.red;
          greenAccumulator += currentPixel.green;
          blueAccumulator += currentPixel.blue;
          pixelCount++;
        }
      }
      
      const averagedColor = new Color(
        Math.round(redAccumulator / pixelCount),
        Math.round(greenAccumulator / pixelCount),
        Math.round(blueAccumulator / pixelCount),
      );
      
      result.setPixel(x, y, averagedColor);
    }
  }
  
  return result;
}

// Apply the blur effect to the image
const blurredImage = applyBlurEffect(image, 3);

// Output the blurred image
for (let y = 0; y < blurredImage.height; y++) {
  for (let x = 0; x < blurredImage.width; x++) {
    const pixel = blurredImage.getPixel(x, y);
    const hexColor = pixel.toHex();
    console.log(`Pixel at (${x}, ${y}): ${hexColor}`);
  }
}