export function useDecodingUtilities() {
    function decodeIdNameParam(uri: string): string {
        return uri.split("-").slice(1).join(" ");
    }

    function decodeQueryParams(params: string): string {
        return params.split("-").join(" ");
    }

    return { decodeIdNameParam, decodeQueryParams };
}