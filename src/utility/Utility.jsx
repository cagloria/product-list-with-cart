/**
 * Formats a number to USD
 * @param {number} number   Number to format
 * @returns Price in USD
 */
export function convertToUSD(number) {
    return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}
