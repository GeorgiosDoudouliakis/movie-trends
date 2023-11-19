const encodeQueryParams = (params: string): string => {
    return params.replaceAll(" ", "-");
}

export default encodeQueryParams;
