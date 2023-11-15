const decodeUri = (uri: string): string => {
    return uri.replaceAll("-", " ");
}

export default decodeUri;
