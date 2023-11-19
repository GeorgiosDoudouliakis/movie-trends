const encodeIdNameParam = (id: number, name: string): string => {
    return `${id}-${name.replaceAll(" ", "-")}`;
}

export default encodeIdNameParam;
