const encodeUri = (id: number, name: string): string => {
    return `${id}-${name.replaceAll(" ", "-")}`;
}

export default encodeUri;
