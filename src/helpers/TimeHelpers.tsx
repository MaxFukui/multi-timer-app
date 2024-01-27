export const calculateTimeFromSeconds = (totalTime: number) => {
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime - hours * 3600) / 60);
  const seconds = totalTime - hours * 3600 - minutes * 60;
  return { hours, minutes, seconds };
};
