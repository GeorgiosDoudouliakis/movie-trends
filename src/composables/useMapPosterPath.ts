export function useMapPosterPath() {
    function mapPosterPath(width: number, posterPath: string): string {
        return `https://image.tmdb.org/t/p/w${width}/${posterPath}`
    }

    return { mapPosterPath };
}