function calculateAccuracy(estimatedTime, actualTime) {

  if (estimatedTime === 0) return 0;

  const accuracy =
    (estimatedTime /
      Math.max(estimatedTime, actualTime || estimatedTime)) *
    100;

  return Math.round(accuracy);
}

export default calculateAccuracy;
