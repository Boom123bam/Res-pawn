export async function storeUserData(userData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userData));
  }
}

export async function getUserData() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user"));
  }
  return null;
}

export async function getUserID() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user")).uid;
  }
  return null;
}
