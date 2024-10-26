const textContainer = document.getElementById("text-container");

const eye = document.getElementById("eye001");
const iris = document.getElementById("iris001");

const eyeRect = eye.getBoundingClientRect();
const eyeRadiusX = eyeRect.width / 2;
const eyeRadiusY = eyeRect.height / 2;

const eyeOffsets = [0, 0];

const adjustBorders = (point, radiusX, radiusY) => {
  const left = point[0] - radiusX;
  const top = point[1] - radiusY;
  const right = point[0] + radiusX;
  const bottom = point[1] + radiusY;

  const newPoint = [...point];

  if (left <= 0) {
    newPoint[0] = radiusX;
  }
  if (top <= 0) {
    newPoint[1] = radiusY;
  }
  if (right >= window.innerWidth) {
    newPoint[0] = window.innerWidth - radiusX;
  }
  if (bottom >= window.innerHeight) {
    newPoint[1] = window.innerHeight - radiusY;
  }

  return newPoint;
};

const movePointToTargetOrigin = (point, targetOrigin) => {
  const deltaLeft = point[0] - targetOrigin[0];
  const deltaTop = point[1] - targetOrigin[1];

  return [deltaLeft, deltaTop];
};

const getPositionPoint = (targetPoint, sourcePoint, targetDistance) => {
  const deltaX = targetPoint[0] - sourcePoint[0];
  const deltaY = targetPoint[1] - sourcePoint[1];

  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance <= targetDistance) {
    return targetPoint;
  }

  const unitVectorX = deltaX / distance;
  const unitVectorY = deltaY / distance;

  const vectorX = unitVectorX * targetDistance;
  const vectorY = unitVectorY * targetDistance;

  const normalizedX = sourcePoint[0] + vectorX;
  const normalizedY = sourcePoint[1] + vectorY;

  return [normalizedX, normalizedY];
};

const getOriginAndCenter = (element) => {
  const { left, top, width, height } = element.getBoundingClientRect();

  const radiusX = width / 2;
  const radiusY = height / 2;

  return [
    [left, top],
    [left + radiusX, top + radiusY],
  ];
};

const setElementPositionByCenter = (element, centerPoint) => {
  element.style.left = `${centerPoint[0]}px`;
  element.style.top = `${centerPoint[1]}px`;
};

const startMouseMoveEventListener = () => {
  window.addEventListener("mousemove", ({ clientX, clientY }) => {
    const [eyeOriginPoint] = getOriginAndCenter(eye);

    const targetPoint = movePointToTargetOrigin([clientX, clientY], eyeOriginPoint);

    const newIrisCenterPoint = getPositionPoint(targetPoint, [eyeRadiusX, eyeRadiusY], eyeRadiusX);

    setElementPositionByCenter(iris, newIrisCenterPoint);
  });
};

const startMouseDownEventListener = () => {
  const mouseMoveListener = ({ clientX, clientY }) => {
    const newCenterPoint = [clientX - eyeOffsets[0], clientY - eyeOffsets[1]];

    const adjustedCenterPoint = adjustBorders(newCenterPoint, eyeRadiusX, eyeRadiusY);

    setElementPositionByCenter(eye, adjustedCenterPoint);
  };

  eye.addEventListener("mousedown", (ev) => {
    ev.preventDefault();

    eyeOffsets[0] = ev.clientX - eye.offsetLeft;
    eyeOffsets[1] = ev.clientY - eye.offsetTop;

    eye.style.cursor = "grabbing";
    textContainer.style.pointerEvents = "none";

    window.addEventListener("mousemove", mouseMoveListener);
  });

  window.addEventListener("mouseup", () => {
    eye.style.cursor = "grab";
    textContainer.style.pointerEvents = "auto";

    window.removeEventListener("mousemove", mouseMoveListener);
    window.removeEventListener("touchstart", mouseMoveListener);
  });
};

const startTouchStartEventListener = () => {
  const touchMoveListener = ({ touches }) => {
    const touch = touches[0];

    const rect = eye.getBoundingClientRect();

    const isInBounds =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;

    if (!isInBounds) {
      window.removeEventListener("touchmove", touchMoveListener);
    }

    const newCenterPoint = [touch.pageX - eyeOffsets[0], touch.pageY - eyeOffsets[1]];

    const adjustedCenterPoint = adjustBorders(newCenterPoint, eyeRadiusX, eyeRadiusY);

    setElementPositionByCenter(eye, adjustedCenterPoint);
  };

  eye.addEventListener("touchstart", (ev) => {
    ev.preventDefault();

    const touch = ev.touches[0];

    const rect = eye.getBoundingClientRect();

    const isInBounds =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;

    if (!isInBounds) {
      return;
    }

    eyeOffsets[0] = touch.pageX - eye.offsetLeft;
    eyeOffsets[1] = touch.pageY - eye.offsetTop;

    textContainer.style.pointerEvents = "none";

    window.addEventListener("touchmove", touchMoveListener);
  });

  window.addEventListener("touchend", () => {
    textContainer.style.pointerEvents = "auto";

    window.removeEventListener("touchmove", touchMoveListener);
  });
  window.addEventListener("touchcancel", () => {
    textContainer.style.pointerEvents = "auto";

    window.removeEventListener("touchmove", touchMoveListener);
  });
};

const startResizeEventListener = () => {
  window.addEventListener("resize", () => {
    const [_, eyeCenterPoint] = getOriginAndCenter(eye);

    const adjustedCenterPoint = adjustBorders(eyeCenterPoint, eyeRadiusX, eyeRadiusY);

    setElementPositionByCenter(eye, adjustedCenterPoint);
  });
};

startMouseMoveEventListener();
startMouseDownEventListener();
startTouchStartEventListener();
startResizeEventListener();
