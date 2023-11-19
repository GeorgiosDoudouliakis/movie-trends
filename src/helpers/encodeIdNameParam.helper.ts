const encodeIdNameParamHelper = (id: number, name: string): string => {
    return `${id}-${name.replaceAll(" ", "-")}`;
}

export default encodeIdNameParamHelper;
