export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}

export async function updateUserPlaces(selectedPlaces) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "put",
    body: JSON.stringify({ places: selectedPlaces }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.message;
}

export async function fetchUserSelectedPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}
