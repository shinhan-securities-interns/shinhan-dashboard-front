import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isURLSearchParams } from '../../store/atoms';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { MemoContainer, CloseButton, Textarea } from './styled';

const StickyNote = ({ value, initialPosition, initialSize, onDelete }) => {
  const setParamData = useSetRecoilState(isURLSearchParams);
  const [memoInfo, setMemoInfo] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
    width: initialSize.width,
    height: initialSize.height,
    text: value,
  });

  const handleDrag = (e, ui) => {
    setMemoInfo((prevMemoText) => ({
      ...prevMemoText,
      x: ui.x,
      y: ui.y,
    }));
  };

  const handleResize = (e, direction, ref, delta) => {
    setMemoInfo((prevMemoText) => ({
      ...prevMemoText,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    }));
  };

  const handleClose = () => {
    onDelete();
  };

  useEffect(() => {
    setParamData((prevData) => ({
      ...prevData,
      memo: memoInfo,
    }));
  }, [memoInfo]);

  return (
    <Draggable
      defaultPosition={{ x: initialPosition.x, y: initialPosition.y }}
      onStop={(e, data) => handleDrag(e, data)}
    >
      <Resizable
        size={{ width: memoInfo.width, height: memoInfo.height }}
        onResizeStop={(e, direction, ref, delta) =>
          handleResize(e, direction, ref, delta)
        }
        enable={{ top: true, right: true, bottom: true, left: true }}
      >
        <MemoContainer>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <Textarea
            value={memoInfo.text}
            onChange={(e) =>
              setMemoInfo((prevMemoText) => ({
                ...prevMemoText,
                text: e.target.value,
              }))
            }
          />
        </MemoContainer>
      </Resizable>
    </Draggable>
  );
};

export default StickyNote;
