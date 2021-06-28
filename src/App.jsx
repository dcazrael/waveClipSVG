import React, { useEffect, useState } from 'react';
import { wavesInit } from '../libs/Waves';
import Background from './components/Background';
import Canvas from './components/Canvas';
import Customizer from './components/Customizer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { COLORS, HEIGHT_ARR, OPACITY } from './CONSTANTS.js';

function App() {
  const width = 1440;

  const [flip, setFlip] = useState(false);
  const [open, setOpen] = useState(false);
  const [isClipPath, setIsClipPath] = useState(false);
  const [waveColor, setWaveColor] = useState(COLORS[COLORS.length - 1]);
  const [waveCode, setWaveCode] = useState(null);

  const options = isClipPath
    ? { waves: 5, isClipPath }
    : {
        waves: 5,
        layers: 3,
        width,
        height: HEIGHT_ARR[1],
        fill: waveColor,
      };

  const [wave, setWave] = useState(options);

  const [wavesSVG, setWavesSVG] = useState(wavesInit(wave));

  useEffect(() => {
    setWavesSVG(() => wavesInit(wave));
  }, [wave]);

  const { height, xmlns, paths } = wavesSVG;

  const bgSvg = (
    <svg
      xmlns={wavesSVG.xmlns}
      height='100%'
      width='100%'
      className='transition duration-300 ease-in-out delay-150'
      viewBox={`0 0 ${wavesSVG.width} ${height}`}
    >
      {paths.map((p, index) => {
        return (
          <path
            d={p.d}
            key={index}
            stroke={p.strokeColor}
            fill={
              isClipPath
                ? waveColor
                : `${waveColor}${OPACITY[paths.length - index - 1]}`
            }
            className='transition-all duration-300 ease-in-out delay-150'
          />
        );
      })}
    </svg>
  );

  const handleWaveConfig = (waveData) => {
    setWave(() => {
      return { ...wave, ...waveData };
    });
  };
  const handleWaveTransform = () => {
    setFlip(!flip);
    setWavesSVG(wavesInit(wave));
  };

  const handleSwitchCanvas = () => {
    setWavesSVG(wavesInit(wave));
  };

  return (
    <div className='relative w-screen h-screen App'>
      <Navbar />
      <div className='relative h-screen bg-gray-200 dark:bg-gray-700'>
        <div className='flex flex-col items-center justify-center h-screen p-0'>
          <Background bgSvg={bgSvg} />
          <div className='flex flex-col items-center justify-center w-full h-full pt-5 pb-0 md:flex-row '>
            <Canvas
              svgData={wavesSVG}
              flip={flip}
              isClipPath={isClipPath}
              waveColor={waveColor}
            />
            <div className='z-10 flex flex-col items-center w-4/5 px-5 py-1 mt-4 bg-gray-100 sm:p-5 sm:shadow-lg sm:rounded-md sm:m-5 sm:w-3/10 md:w-1/5 h-3/5 sm:h-4/5 xs:justify-evenly dark:bg-gray-600 dark:text-gray-100'>
              <Customizer
                handleWaveTransform={handleWaveTransform}
                waveConfig={wave}
                onWaveConfig={handleWaveConfig}
                onCanvasSwitch={handleSwitchCanvas}
                setIsClipPath={setIsClipPath}
                isClipPath={isClipPath}
                setWaveColor={setWaveColor}
                setOpen={setOpen}
                setWaveCode={setWaveCode}
              />
            </div>
          </div>
          <Modal isOpen={open} code={waveCode} onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default App;
