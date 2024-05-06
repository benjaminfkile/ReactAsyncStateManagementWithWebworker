// Function to immutably update the state based on an array of key-value pairs.
// It toggles boolean values if no value is provided, or sets the specified value otherwise.
const mutate = (state: any, keys: Array<{ key: string, value?: any }>) => {
    let newState = {...state}
    for (let i = 0; i < keys.length; i++) {
        if (Object.entries(keys[i]).length > 1) {
            newState[keys[i].key] = keys[i].value // Set the specified value
        } else {
            newState[keys[i].key] = !newState[keys[i].key] //Toggle boolean value (will do strange things if not a boolean)
        }
    }
    return newState
}

export default mutate