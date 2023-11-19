const decodeQueryParams = (params: string): string => {
    return params.split("-").join(" ");
}

export default decodeQueryParams;
