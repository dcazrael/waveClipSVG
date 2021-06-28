import React, { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { COLORS, HEIGHT_ARR } from '../CONSTANTS.js';
import { clippingIcon, codeIcon, rotationIcon } from './SvgPaths';

const Customizer = ({
  waveConfig,
  onWaveConfig,
  handleWaveTransform,
  onCanvasSwitch,
  isClipPath,
  setIsClipPath,
  setWaveColor,
  setOpen,
  setWaveCode,
}) => {
  const [waves, setWaves] = useState(5);
  const [layers, setLayers] = useState(3);
  const [animateRotation, setAnimateRotation] = useState(false);
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
      fill: colorPicker.color,
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

  const [colorPicker, setColorPicker] = useState({
    display: false,
    color: COLORS[COLORS.length - 1],
  });

  const onChange = (color) => {
    setColorPicker({ ...colorPicker, color });
    setWaveColor(color);
  };

  const handleColorDisplay = () => {
    setColorPicker({ ...colorPicker, display: !colorPicker.display });
  };

  const handleCodeModalDisplay = () => {
    const code = getSVGCode();

    setWaveCode(code.outerHTML);
    setOpen(true);
  };

  const getSVGCode = () => {
    const code = document.getElementById('canvasWave').cloneNode(true);
    removeUnusedAttributes(code);

    return code;
  };

  const removeUnusedAttributes = (node) => {
    node.removeAttribute('class');
    if (node.getAttribute('transform') === '') {
      node.removeAttribute('transform');
    }

    if (node.children.length > 0) {
      node.childNodes.forEach((child) => removeUnusedAttributes(child));
    }

    return node;
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
          className='w-full h-3 bg-gray-300 rounded-lg appearance-none dark:bg-gray-500 slider-thumb'
          onChange={(e) => setWaves(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-center w-full mt-12'>
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
          className='w-full h-3 bg-gray-300 rounded-lg appearance-none dark:bg-gray-500 slider-thumb'
          onChange={(e) => setLayers(e.target.value)}
          disabled={isClipPath}
        />
      </div>
      <div className='flex flex-col justify-center w-full mt-12'>
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
          className='w-full h-3 bg-gray-300 rounded-lg appearance-none dark:bg-gray-500 slider-thumb'
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <div className='relative flex w-full space-x-4'>
        <div className='flex items-center justify-center p-2 mt-12 font-bold text-gray-700 transition duration-300 ease-in-out bg-purple-300 rounded shadow-sm focus:outline-none hover:bg-purple-600 group'>
          <button
            className='w-8 h-8 transition duration-300 ease-in-out border border-gray-600 rounded-sm cursor-pointer group-hover:border-gray-300 focus:outline-none '
            style={{
              background: colorPicker.color,
            }}
            onClick={handleColorDisplay}
          />
          {colorPicker.display && (
            <div className='absolute left-0 w-full mt-12 top-16'>
              <div className='relative w-full px-4 pt-12 pb-4 bg-gray-200 rounded shadow-md dark:bg-gray-700'>
                <div className='absolute top-2 right-2'>
                  <button className='' onClick={handleColorDisplay}>
                    <svg
                      className='w-4 h-4 text-gray-700 fill-current dark:text-gray-300'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                      fillRule='evenodd'
                      clipRule='evenodd'
                    >
                      <path d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z' />
                    </svg>
                  </button>
                </div>
                <div className='flex flex-grow space-x-4 '>
                  <div className='w-4/5 colorPicker'>
                    <HexColorPicker
                      color={colorPicker.color}
                      onChange={onChange}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-2 place-items-center'>
                    {COLORS.map((presetColor, index) => (
                      <button
                        key={index}
                        className='w-6 h-6 border border-gray-300 rounded hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-400'
                        style={{
                          background: presetColor,
                        }}
                        onClick={() => onChange(presetColor)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className='flex items-center justify-center p-2 mt-12 font-bold transition duration-300 ease-in-out bg-purple-300 rounded focus:outline-none hover:bg-purple-600 group'
          onClick={handleWaveRotation}
          onAnimationEnd={() => setAnimateRotation(false)}
          title='Rotate'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className={`w-8 h-8 fill-current text-gray-500 transition duration-300 ease-in-out  group-hover:text-gray-200 ${
              animateRotation && 'animate-spin-once'
            }`}
          >
            <path d={rotationIcon} />
          </svg>
        </button>
        <button
          className='flex items-center justify-center p-2 mt-12 font-bold transition duration-300 ease-in-out bg-purple-300 rounded focus:outline-none hover:bg-purple-600 group'
          onClick={() => setIsClipPath(!isClipPath)}
          title='Clip path'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 90 90'
            className={`w-8 h-8 fill-current text-gray-500 transition duration-300 ease-in-out  group-hover:text-gray-200`}
          >
            <path d={clippingIcon} />
            <polygon
              xmlns='http://www.w3.org/2000/svg'
              points='58.506,47.107 70.583,59.185 45,84.768 19.417,59.185 31.494,47.107 29.88,45.494 16.19,59.185 45,87.994    73.81,59.185 60.119,45.494  '
            />
          </svg>
        </button>
        <button
          className='flex items-center justify-center p-2 mt-12 font-bold transition duration-300 ease-in-out bg-purple-300 rounded focus:outline-none hover:bg-purple-600 group'
          onClick={handleCodeModalDisplay}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className={`w-8 h-8 fill-current text-gray-500 transition duration-300 ease-in-out  group-hover:text-gray-200`}
          >
            <path d={codeIcon} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Customizer;
