export function convertToUSD(number) {
    return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}
