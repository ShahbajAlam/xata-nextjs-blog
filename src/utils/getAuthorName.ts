export function getAuthorName(name: string) {
    const firstName = name.split(" ")[0].toLowerCase();
    return (
        firstName.slice(0, 1).toUpperCase() +
        firstName.slice(1, firstName.length)
    );
}
