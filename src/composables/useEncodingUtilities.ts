export function useEncodingUtilities() {
    function encodeIdNameParam(id: number, name: string): string {
        return `${id}-${name.replaceAll(" ", "-")}`;
    }

    function encodeQueryParams(params: string): string {
        return params.replaceAll(" ", "-");
    }

    return { encodeIdNameParam, encodeQueryParams };
}