import React, { useEffect, useRef, useState } from 'react';
import { clippingIcon, rotationIcon } from './SvgPaths';

const HEIGHT_ARR = [300, 400, 500, 600, 700];

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
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (animateRotation) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    onWaveConfig({
      waves,
      layers,
      height: HEIGHT_ARR[height],
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
    setAnimateClipping(true);
    onCanvasSwitch();
  }, [waveConfig]);

  return (
    <div className='w-full'>
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
          max={6}
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
      <button
        className='flex items-center justify-center p-2 mt-6 font-bold text-white transition duration-300 ease-in-out bg-purple-700 rounded focus:outline-none hover:bg-purple-600'
        onClick={handleWaveRotation}
        onAnimationEnd={() => setAnimateRotation(false)}
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
  );
};

export default Customizer;
