import { useState, useEffect } from 'react';

import { useEventListener } from '../../utils/hooks';

export default function Draggable ({ children }) {
  const [promptDraggable, setPromptDraggable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const makeShiny = () => setPromptDraggable(true);
  const makeDull = () => setPromptDraggable(false);
  const startDragging = () => setDragging(true);
  const stopDragging = () => setDragging(false);

  const [add, remove] = useEventListener(window);

  useEffect(() => {
    const mouseMove = ({ movementX, movementY }) => {
      setLeft(p => p + movementX);
      setTop(p => p + movementY);
    };
    if (dragging) {
      add.mousemove(mouseMove);
      add.mouseup(stopDragging);
    }
    return () => {
      remove.mousemove(mouseMove);
      remove.mouseup(stopDragging);
    };
  }, [add, remove, dragging]);

  return (
    <div
      className='draggable'
      style={{
        top,
        left
      }}
    >
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border top'
        style={{
          backgroundColor: promptDraggable
            ? 'skyblue'
            : 'steelblue'
        }}
      />
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border bottom'
        style={{
          backgroundColor: promptDraggable
            ? 'skyblue'
            : 'steelblue'
        }}
      />
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border left'
        style={{
          backgroundColor: promptDraggable
            ? 'skyblue'
            : 'steelblue'
        }}
      />
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border right'
        style={{
          backgroundColor: promptDraggable
            ? 'skyblue'
            : 'steelblue'
        }}
      />
      <div className='draggable-content'>
        {children}
      </div>
    </div>
  );
}
