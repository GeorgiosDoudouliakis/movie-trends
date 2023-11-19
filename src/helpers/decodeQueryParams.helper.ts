const decodeQueryParamsHelper = (params: string): string => {
    return params.split("-").join(" ");
}

export default decodeQueryParamsHelper;
