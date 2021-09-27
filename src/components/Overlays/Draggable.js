import { useState, useEffect } from 'react';

import { useEventListener } from '../../utils/hooks';

export default function Draggable ({ children }) {
  const [dragging, setDragging] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('steelblue');
  const [ratio, setRatio] = useState(window.devicePixelRatio);

  const makeShiny = () => setBackgroundColor('skyblue');
  const makeDull = () => setBackgroundColor('steelblue');
  const startDragging = () => setDragging(true);
  const stopDragging = () => setDragging(false);

  const [add, remove] = useEventListener(window);

  useEffect(() => {
    const mouseMove = ({ movementX, movementY }) => {
      setLeft(p => p + (movementX / ratio));
      setTop(p => p + (movementY / ratio));
    };
    if (dragging) {
      add.mousemove(mouseMove);
      add.mouseup(stopDragging);
    }
    return () => {
      remove.mousemove(mouseMove);
      remove.mouseup(stopDragging);
    };
  }, [add, remove, ratio, dragging]);

  useEffect(() => {
    const ratioSetter = setRatio(window.devicePixelRatio);
    add.resize(ratioSetter);
    return () => remove.resize(ratioSetter);
  }, [add, remove]);

  return (
    <div
      className='draggable'
      style={{ top, left }}
    >
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border top'
        style={{ backgroundColor }}
      />
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border bottom'
        style={{ backgroundColor }}
      />
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border left'
        style={{ backgroundColor }}
      />
      <div
        onMouseEnter={makeShiny}
        onMouseLeave={makeDull}
        onMouseDown={startDragging}
        className='draggable-border right'
        style={{ backgroundColor }}
      />
      <div className='draggable-content'>
        {children}
      </div>
    </div>
  );
}
