export const replaceImagePaths = (content: string, urlPrefix: string) => {
    return content.replace(/!\[\]\((images\/[^\)]+)\)/g, (match, path) => {
        return `![](${urlPrefix}/${path})`;
    });
}