export class TextConfig {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  constructor(x: number, y: number, text: string, fontSize: number) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
  }
}

export class StageConfig {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}
