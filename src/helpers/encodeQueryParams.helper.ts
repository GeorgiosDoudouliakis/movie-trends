const encodeQueryParamsHelper = (params: string): string => {
    return params.replaceAll(" ", "-");
}

export default encodeQueryParamsHelper;
