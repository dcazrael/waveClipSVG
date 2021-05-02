import React, { useEffect, useState } from 'react';
import { wavesInit } from '../../libs/Waves';

function Home() {
  const width = 1600;

  const [isRotated, setIsRotated] = useState(false);
  const [animate, setAnimate] = useState(false);

  const opacity = '40%';

  const [colors, setColors] = useState([
    `hsla(251,83%,72%, ${opacity})`,
    `hsla(313,83%,70%, ${opacity})`,
    `hsla(340,100%,75%, ${opacity})`,
    `hsla(16,100%,75%, ${opacity})`,
    `hsla(40,100%,69%, ${opacity})`,
    `hsla(60,92%,71%, ${opacity})`,
  ]);

  const [wave, setWave] = useState({
    waves: 5,
    layers: 3,
    width,
    height: 400,
    fill: colors[1],
  });

  const [clipPath, setClipPath] = useState({
    waves: 5,
    isClipPath: true,
    layers: 2,
    transform: 'rotate(180, 0.5, 0.5)',
  });

  const [wavesSVG, setWavesSVG] = useState(wavesInit(wave));
  const [clipPathSVG, setClipPathSVG] = useState(wavesInit(clipPath));

  useEffect(() => {
    setWavesSVG(() => wavesInit(wave));
  }, [wave]);

  useEffect(() => {
    setClipPathSVG(() => wavesInit(clipPath));
  }, [clipPath]);

  const { height, xmlns, paths } = wavesSVG;
  const amountOfWaves = paths.length;
  const centerWidth = wavesSVG.width / 2;
  const centerHeight = wavesSVG.height / 2;

  const transformData = `rotate(-180 ${centerWidth} ${centerHeight})`;

  const svg = (
    <svg
      xmlns={wavesSVG.xmlns}
      height='100%'
      width='100%'
      className='transition duration-300 ease-in-out delay-150'
      viewBox={`0 0 ${wavesSVG.width} ${wavesSVG.height}`}
    >
      {paths.map((p, index) => {
        return (
          <path
            d={p.d}
            key={index}
            stroke={p.strokeColor}
            fill={p.fill}
            className='transition-all duration-300 ease-in-out delay-150'
            transform={isRotated ? transformData : p.transform}
          />
        );
      })}
    </svg>
  );

  const bgSvg = (
    <svg
      xmlns={wavesSVG.xmlns}
      height='100%'
      width='100%'
      className='transition duration-300 ease-in-out delay-150'
      viewBox={`0 0 ${wavesSVG.width} ${wavesSVG.height}`}
    >
      {paths.map((p, index) => {
        return (
          <path
            d={p.d}
            key={index}
            stroke={p.strokeColor}
            fill={p.fill}
            className='transition-all duration-300 ease-in-out delay-150'
            transform={isRotated ? transformData : p.transform}
          />
        );
      })}
    </svg>
  );

  function handleFlip() {
    setIsRotated(() => !isRotated);
    setAnimate(() => true);
  }

  return (
    <>
      <div
        className={`absolute opacity-25 h-full w-full inset-x-0 ${
          isRotated ? 'top-0' : 'bottom-0'
        } z-0 transition-transform`}
      >
        {bgSvg}
      </div>

      <div className='flex w-full h-full gap-8'>
        <div className='relative w-8/12'>
          <div
            className={`absolute ${
              isRotated ? 'top-0' : 'bottom-0'
            } w-full transition-transform`}
          >
            {svg}
          </div>
        </div>
        <div className='w-80'>
          <div className='flex flex-col'>
            <div className='flex flex-col justify-center mt-6'>
              <label
                htmlFor='waves'
                class='font-bold text-xl text-gray-700 my-2 text-center'
              >
                Waves
              </label>
              <input
                type='range'
                name='waves'
                id='waves'
                min={3}
                max={12}
                value={wave.waves}
                className='w-full h-3 bg-gray-500 rounded-lg appearance-none slider-thumb'
                onChange={(e) => setWave({ ...wave, waves: e.target.value })}
              />
            </div>
            <div className='flex flex-col justify-center mt-6'>
              <label
                htmlFor='layers'
                class='font-bold text-xl text-gray-700 my-2 text-center'
              >
                Layers
              </label>
              <input
                type='range'
                name='layers'
                id='layers'
                min={2}
                max={6}
                value={wave.layers}
                className='w-full h-3 bg-gray-500 rounded-lg appearance-none slider-thumb'
                onChange={(e) => setWave({ ...wave, layers: e.target.value })}
              />
            </div>
            <div className='flex flex-col justify-center mt-6'>
              <label
                htmlFor='height'
                class='font-bold text-xl text-gray-700 my-2 text-center'
              >
                Height
              </label>
              <input
                type='range'
                name='height'
                id='height'
                min={300}
                max={600}
                step={100}
                value={wave.height}
                className='w-full h-3 bg-gray-500 rounded-lg appearance-none slider-thumb'
                onChange={(e) => setWave({ ...wave, height: e.target.value })}
              />
            </div>
            <button
              className='flex items-center justify-center p-2 mt-6 font-bold text-white transition duration-300 ease-in-out bg-purple-500 rounded focus:outline-none hover:bg-purple-600'
              onClick={handleFlip}
              onAnimationEnd={() => setAnimate(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                className={`w-8 h-8 fill-current text-white ${
                  animate && 'animate-spin-once'
                }`}
              >
                <path d='M437.02 75.112C388.667 26.76 324.38.133 256 .133c-41.218 0-82.189 10.033-118.485 29.016C116.586 40.094 97.191 54.029 80 70.302V.133H40v140h140v-40h-73.338c39.887-38.075 93.411-60 149.338-60 119.102 0 216 96.896 216 215.999-.001 6.632-.304 13.317-.901 19.87l39.836 3.628c.706-7.753 1.064-15.658 1.065-23.495l-20-.002h20c0-68.381-26.629-132.667-74.98-181.021zM512 256.132v.001zM87.724 391.566l-31.145 25.101c9.048 11.226 19.114 21.762 29.92 31.315l26.494-29.967c-9.126-8.069-17.628-16.966-25.269-26.449zM52.219 327.943l-37.727 13.296c4.794 13.601 10.796 26.896 17.842 39.517l34.926-19.497c-5.941-10.642-11.001-21.852-15.041-33.316zM40 256.133H0c0 14.47 1.22 28.986 3.624 43.145l39.436-6.698C41.029 280.627 40 268.365 40 256.133zM142.33 439.841l-21.082 33.993c12.271 7.611 25.265 14.215 38.618 19.629l15.029-37.069c-11.258-4.563-22.215-10.134-32.565-16.553zM464.717 311.981c-3.137 11.748-7.307 23.311-12.395 34.365l36.335 16.727c6.037-13.115 10.985-26.835 14.706-40.777l-38.646-10.315zM383.554 430.468c-9.833 7.208-20.335 13.616-31.213 19.047l17.867 35.788c12.896-6.438 25.342-14.033 36.994-22.574l-23.648-32.261zM434.282 378.123c-6.883 10.035-14.672 19.56-23.152 28.311l28.725 27.837c10.041-10.361 19.265-21.642 27.415-33.527l-32.988-22.621zM318.37 462.995c-11.632 3.503-23.662 6.03-35.756 7.515l4.873 39.702c14.343-1.761 28.612-4.76 42.412-8.914l-11.529-38.303zM209.794 467.185l-8.514 39.083c14.054 3.062 28.505 4.946 42.953 5.6l1.809-39.959c-12.198-.552-24.394-2.143-36.248-4.724z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
