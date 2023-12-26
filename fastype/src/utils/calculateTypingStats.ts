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

//Sort data by date

interface DataTypes{
  date: string;
  wpm: number;
  accuracy: number;
}

export const calculateLast7DaysAverage = (data:DataTypes[]) => {
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const last7DaysData = sortedData.slice(0, 7);

  const totalWpm = last7DaysData.reduce((acc, curr) => acc + curr.wpm, 0);
  const totalAccuracy = last7DaysData.reduce((acc, curr) => acc + curr.accuracy, 0);

  const averageWpm = calculateAverage(totalWpm, last7DaysData.length);
  const averageAccuracy = calculateAverage(totalAccuracy, last7DaysData.length);

  return { averageWpm, averageAccuracy };
};

export const calculateOverallPreviousAverage = (data:DataTypes[]) => {

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const previousData = data.filter(d => new Date(d.date) < sevenDaysAgo);

  if (previousData.length === 0) {
    return { averageWpm: 0, averageAccuracy: 0 };
  }

  const totalWpm = previousData.reduce((acc, curr) => acc + curr.wpm, 0);
  const totalAccuracy = previousData.reduce((acc, curr) => acc + curr.accuracy, 0);

  const averageWpm = calculateAverage(totalWpm, previousData.length);
  const averageAccuracy = calculateAverage(totalAccuracy, previousData.length);

  return { averageWpm, averageAccuracy };
};

