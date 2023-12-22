export const calculatePercentage = (total: number, correct: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateAccuracy = (
  totalChars: number,
  correctChars: number
): number => {
  return calculatePercentage(totalChars, correctChars);
};

export const calculateDurationInSeconds = (
  startTimestamp: number | null,
  endTimestamp: number | null
): number => {
  if (startTimestamp === null || endTimestamp === null) {
    return 0;
  }
  return ((endTimestamp - startTimestamp) / 1000 );
};
export const calculateDurationInMinutesAndSeconds = (startTimestamp: number | null, endTimestamp: number | null): string => {
  if (startTimestamp === null || endTimestamp === null) {
    return "0:00";
  }
  const durationInSeconds = (endTimestamp - startTimestamp) / 1000;
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const calculateWPM = (
  totalChars: number,
  durationInSeconds: number
): number => {
  if (durationInSeconds === 0) return 0;
  return Math.round(totalChars / 5 / (durationInSeconds / 60));
};

export const calculateAverage = (
  total: number,
  number: number
): number => {
  if (number === 0) return 0;
  return Math.round(total / number);
}