export const saveLocalStorageTravel = (item) => {
    window.localStorage.setItem("token", item)
    return true
}

export const deleteLocalStorageTravel = () => {
    window.localStorage.removeItem("token");
    return true;
}
