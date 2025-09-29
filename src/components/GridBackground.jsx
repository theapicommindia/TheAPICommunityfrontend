import React from 'react';

const GridBackground = () => {
  return (
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
      style={{
        left: '10rem',
        right: '10rem',
        backgroundPosition: 'top right',
        maskImage: 'radial-gradient(circle at top right, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 70%)',
        WebkitMaskImage: 'radial-gradient(circle at top right, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 70%)'
      }}
      aria-hidden="true"
    ></div>
  );
};

export default GridBackground; 