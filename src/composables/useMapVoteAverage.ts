export function useMapVoteAverage() {
    function mapVoteAverage(avg: number): string {
        return Number.parseFloat(avg.toString()).toFixed(1);
    }

    return { mapVoteAverage };
}
