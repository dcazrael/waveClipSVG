import { SVGPath } from 'svg-paths';
import { computeControlPoints } from './bezier-spline';

const svgNS = 'http://www.w3.org/2000/svg';

const defaults = {
  width: 1000,
  height: 1000,
  waves: 2,
  layers: 2,
  variance: 0.75,
  isClipPath: false,
  transform: '',
};

class Waves {
  constructor(props) {
    this.props = { ...defaults, ...props };

    this.heightAdjustment = this.props.height;

    if (this.props.isClipPath) {
      this.props.width = 1000;
      this.props.height = 1000;
    }

    this.points = this._generatePoints(
      this.props.width,
      this.props.height,
      this.props.waves,
      this.props.layers,
      this.props.variance
    );
  }

  _generatePoints(width, height, waves, layers, variance) {
    const cellWidth = width / waves;
    const cellHeight = this.props.isClipPath ? height : height / layers;
    const phase = cellWidth * variance * 0.5;
    const maxPeak =
      (cellHeight - (this.props.isClipPath ? this.heightAdjustment : 0)) *
      variance;

    const points = [];

    for (let y = cellHeight; y <= height; y += cellHeight) {
      let pointsOnLayer = [];
      pointsOnLayer.push({ x: 0, y: Math.floor(y) });

      for (let x = cellWidth; x < width; x += cellWidth) {
        const peakToPeakAmplitude =
          y -
          maxPeak / 2 +
          Math.random() * maxPeak -
          (this.props.isClipPath ? this.heightAdjustment : 0);
        const waveLength = x - phase / 2 + Math.random() * phase;

        pointsOnLayer.push({
          x: Math.floor(waveLength),
          y: Math.floor(peakToPeakAmplitude),
        });
      }
      pointsOnLayer.push({ x: width, y: Math.floor(y) });
      points.push(pointsOnLayer);
    }

    return points;
  }

  _generateSVGPath(points) {
    const height = this.props.isClipPath ? 1 : this.props.height;
    const xPoints = points.map((p) => p.x);
    const yPoints = points.map((p) => p.y);
    const leftCorner = {
      x: 0,
      y: this.props.isClipPath ? 0 : height,
    };
    const rightCorner = {
      x: this.props.width,
      y: this.props.isClipPath ? 0 : height,
    };
    const xControlPoints = computeControlPoints(xPoints);
    const yControlPoints = computeControlPoints(yPoints);

    let path = new SVGPath();

    // creating scope to reuse parameter names
    {
      let [cX1, cY1, cX2, cY2, eX, eY] = [
        leftCorner.x,
        leftCorner.y,
        xPoints[0],
        this.props.isClipPath ? yPoints[0] - this.heightAdjustment : yPoints[0],
        xPoints[0],
        this.props.isClipPath ? yPoints[0] - this.heightAdjustment : yPoints[0],
      ].map((p) => this._convertToRelative(p));

      path.moveTo(cX1, cY1).curveTo(cX1, cY1, cX2, cY2, eX, eY);
    }

    for (let i = 0; i < xPoints.length - 1; i++) {
      let [cX1, cY1, cX2, cY2, eX, eY] = [
        xControlPoints.p1[i],
        yControlPoints.p1[i],
        xControlPoints.p2[i],
        yControlPoints.p2[i],
        xPoints[i + 1],
        i === xPoints.length - 2 && this.props.isClipPath
          ? yPoints[i + 1] - this.heightAdjustment
          : yPoints[i + 1],
      ].map((p) => this._convertToRelative(p));

      if (cY1 > height) cY1 = this._adjustAbovePeak(cY1, height);
      if (cY2 > height) cY2 = this._adjustAbovePeak(cY2, height);
      if (eY > height) eY = this._adjustAbovePeak(eY, height);

      if (this.props.isClipPath) {
        cX1 = cX1 > height ? this._adjustAbovePeak(cX1, height) : cX1;
        cX2 = cX2 > height ? this._adjustAbovePeak(cX2, height) : cX2;
        cY1 = cY1 > height ? this._adjustAbovePeak(cY1, height) : cY1;
        cY2 = cY2 > height ? this._adjustAbovePeak(cY2, height) : cY2;
      }

      path.curveTo(cX1, cY1, cX2, cY2, eX, eY);
    }

    // creating scope to reuse parameter names
    {
      let [cX1, cY1, cX2, cY2, eX, eY] = [
        xPoints[xPoints.length - 1],
        this.props.isClipPath
          ? yPoints[xPoints.length - 1] - this.heightAdjustment
          : yPoints[xPoints.length - 1],
        rightCorner.x,
        rightCorner.y,
        rightCorner.x,
        rightCorner.y,
      ].map((p) => this._convertToRelative(p));

      path.curveTo(cX1, cY1, cX2, cY2, eX, eY).close();
    }

    const svgPath = document.createElementNS(svgNS, 'path');
    svgPath.setAttributeNS(null, 'fill', this.props.fill);
    svgPath.setAttributeNS(null, 'stroke', this.props.strokeColor);
    svgPath.setAttributeNS(null, 'stroke-width', this.props.strokeWidth);
    svgPath.setAttributeNS(null, 'd', path.end());

    return {
      fill: this.props.fill,
      strokeColor: this.props.strokeColor,
      strokeWidth: this.props.strokeWidth,
      d: path.end(),
      transform: this.props.transform,
    };
  }

  _convertToRelative(point) {
    if (this.props.isClipPath) return point / this.props.width;

    return point;
  }

  _adjustAbovePeak(val, height) {
    return height - (val - height);
  }

  generateSVG() {
    const SVG = document.createElementNS(svgNS, 'svg');
    SVG.setAttribute('width', this.props.width);
    SVG.setAttribute('height', this.props.height);
    SVG.setAttribute('xmlns', svgNS);

    const paths = [];

    for (let i = 0; i < this.points.length; i++) {
      paths.push(this._generateSVGPath(this.points[i]));
    }

    return {
      width: this.props.isClipPath ? 1 : this.props.width,
      height: this.props.isClipPath ? 1 : this.props.height,
      xmlns: svgNS,
      paths,
      rotateAdjustment: this.heightAdjustment / 1000,
    };
  }
}

export const wavesInit = (data) => {
  const waves = new Waves(data);
  return waves.generateSVG();
};
