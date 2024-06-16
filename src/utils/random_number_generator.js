export const generateFixedRandomID = (length) => {
    let randomNumber = "";

    // Generates a number between 1 and 9
    let firstDigit = Math.floor(Math.random() * 9) + 1;

    // Add the firstDigit to the randomNumber.
    randomNumber += firstDigit;

    // Generate the remaining numbers.
    for (let i = 0; i < length - 1; i++) {
        randomNumber += Math.floor(Math.random() * 10);
    }

    return randomNumber;
};