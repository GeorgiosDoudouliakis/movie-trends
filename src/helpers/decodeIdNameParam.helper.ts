const decodeIdNameParamHelper = (uri: string): string => {
    return uri.split("-").slice(1).join(" ");
}

export default decodeIdNameParamHelper;
