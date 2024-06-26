function getCurrentDateTime() {
    // Create a new Date object to get the current date and time
    const currentDate = new Date();

    // Extract date components
    const day = currentDate.getDate().toString().padStart(2, '0'); // Day of the month (01-31)
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
    const year = currentDate.getFullYear(); // Full year (e.g., 2024)

    // Extract time components
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am'; // Determine if it's AM or PM
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert midnight (0 hours) to 12

    // Construct the formatted date and time string
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;

    // Return the formatted date and time string
    return formattedDateTime;
}

export default getCurrentDateTime;
