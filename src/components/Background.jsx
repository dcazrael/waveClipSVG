import React from 'react';

const Background = ({ bgSvg }) => {
  return (
    <div
      className={`absolute opacity-50 inset-x-0 bottom-0 z-0 transition-transform`}
    >
      {bgSvg}
    </div>
  );
};

export default Background;
