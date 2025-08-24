export function formatAmount(num: number): string {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B"
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M"
    }
    return num.toString()
}