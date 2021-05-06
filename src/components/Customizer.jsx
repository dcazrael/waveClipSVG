import React, { useEffect, useRef, useState } from 'react';
import { HslColorPicker } from 'react-colorful';
import { COLOR, HEIGHT_ARR } from '../CONSTANTS.js';
import { clippingIcon, rotationIcon } from './SvgPaths';

const Customizer = ({
  waveConfig,
  onWaveConfig,
  handleWaveTransform,
  onCanvasSwitch,
  isClipPath,
  setIsClipPath,
}) => {
  const [waves, setWaves] = useState(5);
  const [layers, setLayers] = useState(3);
  const [animateRotation, setAnimateRotation] = useState(false);
  const [animateClipping, setAnimateClipping] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [height, setHeight] = useState(2);
  const [HSL, setHSL] = useState(`${COLOR.h} ${COLOR.s}% ${COLOR.l}%`);

  const isInitialMount = useRef(true);

  const presetColors = [
    { h: 0, s: 100, l: 84 },
    { h: 33, s: 100, l: 82 },
    { h: 62, s: 100, l: 86 },
    { h: 110, s: 100, l: 87 },
    { h: 185, s: 100, l: 80 },
    { h: 217, s: 100, l: 81 },
    { h: 249, s: 100, l: 85 },
    { h: 300, s: 100, l: 89 },
    { h: 60, s: 100, l: 99 },
    { h: 251, s: 83, l: 72 },
  ];

  useEffect(() => {
    if (animateRotation || animateClipping) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    onWaveConfig({
      waves,
      layers,
      height: HEIGHT_ARR[height],
      fill: HSL,
      isClipPath,
    });
  }, [waves, layers, height, animateRotation, isClipPath]);

  const handleWaveRotation = () => {
    setRotate(!rotate);
    setAnimateRotation(true);

    handleWaveTransform();
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onCanvasSwitch();
  }, [waveConfig]);

  const [color, setColor] = useState({
    h: COLOR.h,
    s: COLOR.s,
    l: COLOR.l,
  });

  const onChange = (color) => {
    setColor(color);
    const newColor = `${color.h} ${color.s}% ${color.l}%`;

    onWaveConfig({
      fill: newColor,
    });
    setHSL(newColor);
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-col justify-center w-full mt-6 text-gray-700 dark:text-gray-100'>
        <label htmlFor='waves' className='my-2 text-xl font-bold text-center'>
          Waves
        </label>
        <input
          type='range'
          name='waves'
          id='waves'
          min={3}
          max={12}
          value={waves}
          className='w-full h-3 bg-gray-500 rounded-lg appearance-none slider-thumb'
          onChange={(e) => setWaves(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-center w-full mt-6'>
        <label htmlFor='layers' className='my-2 text-xl font-bold text-center'>
          Layers
        </label>
        <input
          type='range'
          name='layers'
          id='layers'
          min={1}
          max={5}
          value={layers}
          className='w-full h-3 bg-gray-500 rounded-lg appearance-none slider-thumb'
          onChange={(e) => setLayers(e.target.value)}
          disabled={isClipPath}
        />
      </div>
      <div className='flex flex-col justify-center w-full mt-6'>
        <label htmlFor='height' className='my-4 text-xl font-bold text-center'>
          Height
        </label>
        <input
          type='range'
          name='height'
          id='height'
          min={0}
          max={4}
          value={height}
          className='w-full h-3 bg-gray-500 rounded-lg appearance-none slider-thumb'
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <div className='relative flex space-x-4'>
        <div className='flex items-center justify-center p-2 mt-6 font-bold text-gray-700 transition duration-300 ease-in-out bg-purple-700 rounded shadow-sm cursor-pointer focus:outline-none hover:bg-purple-600'>
          <div
            className='w-8 h-8 border border-white rounded-sm'
            style={{
              background: `hsl(${color.h} ${color.s}% ${color.l}% / 1)`,
            }}
          />
        </div>
        <button
          className='flex items-center justify-center p-2 mt-6 font-bold text-white transition duration-300 ease-in-out bg-purple-700 rounded focus:outline-none hover:bg-purple-600'
          onClick={handleWaveRotation}
          onAnimationEnd={() => setAnimateRotation(false)}
          title='Rotate'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className={`w-8 h-8 fill-current text-white ${
              animateRotation && 'animate-spin-once'
            }`}
          >
            <path d={rotationIcon} />
          </svg>
        </button>
        <button
          className='flex items-center justify-center p-2 mt-6 font-bold text-white transition duration-300 ease-in-out bg-purple-700 rounded focus:outline-none hover:bg-purple-600'
          onClick={() => setIsClipPath(!isClipPath)}
          onAnimationEnd={() => setAnimateClipping(false)}
          title='Clip path'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 90 90'
            className={`w-8 h-8 fill-current text-white ${
              animateClipping && 'animate-spin-once'
            }`}
          >
            <path d={clippingIcon} />
            <polygon
              xmlns='http://www.w3.org/2000/svg'
              points='58.506,47.107 70.583,59.185 45,84.768 19.417,59.185 31.494,47.107 29.88,45.494 16.19,59.185 45,87.994    73.81,59.185 60.119,45.494  '
            />
          </svg>
        </button>
      </div>
      <div className='flex flex-grow mt-6 space-x-4'>
        <div className='w-4/5 colorPicker'>
          <HslColorPicker color={color} onChange={onChange} />
        </div>
        <div className='grid grid-cols-2 gap-2 place-items-center'>
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className='w-6 h-6 rounded-sm'
              style={{
                background: `hsl(${presetColor.h} ${presetColor.s}% ${presetColor.l}%)`,
              }}
              onClick={() => onChange(presetColor)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customizer;
