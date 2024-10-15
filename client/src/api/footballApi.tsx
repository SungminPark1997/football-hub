export const fetchUpcomingClMatches = async () => {
  const response = await fetch("http://localhost:5000/api/match/cl");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export const fetchUpcomingPlMatches = async () => {
  const response = await fetch("http://localhost:5000/api/match/pl");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
