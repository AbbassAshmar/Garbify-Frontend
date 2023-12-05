import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

const LoadingContainer = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background:white;
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const SpinnerDiv = styled.div`
  left: 94px;
  top: 48px;
  position: absolute;
  animation: ${spinAnimation} linear 1s infinite;
  background: #93dbe9;
  width: 12px;
  height: 24px;
  border-radius: 6px / 12px;
  transform-origin: 6px 52px;
`;

const Loading = () => {
  return (
    <div style={{height:"83vh", width:"100%", display:"flex",alignItems:'center', justifyContent:"center"}}>
    <LoadingContainer>
      <Spinner>
        {[...Array(12)].map((_, index) => (
          <SpinnerDiv key={index} style={{ transform: `rotate(${30 * index}deg)`, animationDelay: `-${0.08333333333333333 * index}s` }} />
        ))}
      </Spinner>
    </LoadingContainer>
    </div>
  );
};

export default Loading;