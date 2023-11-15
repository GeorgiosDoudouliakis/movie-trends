const encodeUri = (uri: string): string => {
    return uri.replaceAll(" ", "-");
}

export default encodeUri;
