import React from 'react';
import { OPACITY } from '../CONSTANTS.js';

const Canvas = ({ svgData, flip, isClipPath, waveColor }) => {
  const { height, xmlns, paths, width } = svgData;
  const cWidth = width / 2;
  const cHeight = height / 2;

  const transformData = `rotate(-180 ${cWidth} ${cHeight})`;

  const svg = (
    <svg
      xmlns={xmlns}
      height='100%'
      width='100%'
      className='transition-all duration-300 ease-in-out delay-150'
      viewBox={`0 0 ${width} ${height}`}
      id='canvasWave'
    >
      {isClipPath ? (
        <defs>
          <clipPath id='svg__wave' clipPathUnits='objectBoundingBox'>
            {paths.map((p, index) => {
              return (
                <path
                  d={p.d}
                  key={index}
                  stroke={p.strokeColor}
                  fill='hsl(251 83% 72% 1)'
                  className='transition-all duration-300 ease-in-out delay-150'
                  transform={flip ? transformData : p.transform}
                />
              );
            })}
          </clipPath>
        </defs>
      ) : (
        paths.map((p, index) => {
          return (
            <path
              d={p.d}
              key={index}
              stroke={p.strokeColor}
              fill={`${waveColor}${OPACITY[paths.length - index - 1]}`}
              className='transition-all duration-300 ease-in-out delay-150'
              transform={flip ? transformData : p.transform}
            />
          );
        })
      )}
    </svg>
  );
  return (
    <div className='relative z-10 w-4/5 overflow-hidden bg-gray-100 dark:bg-gray-600 sm:shadow-lg sm:rounded-md sm:m-5 sm:w-7/10 md:w-3/5 h-1/5 sm:h-4/5 dark:text-white'>
      {isClipPath ? (
        <>
          <img
            src='https://images.unsplash.com/photo-1619726910901-6c8a215dab6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMDM2OTYy&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600'
            width='100%'
            height='100%'
            style={{ clipPath: 'url(#svg__wave)' }}
            className='object-cover w-full h-full'
          />
          {svg}
        </>
      ) : (
        <div
          className={`absolute ${
            flip ? 'top-0' : 'bottom-0'
          } w-full transition-all duration-300 ease-in-out delay-150`}
        >
          {svg}
        </div>
      )}
    </div>
  );
};

export default Canvas;
