export default function sortByArrivalTime(array) {
  const newArray = [...array];
  newArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
  return newArray;
}
