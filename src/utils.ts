// 用于文件base64解码后的格式化
export function getDecode(str: string) {
    return decodeURIComponent(
        atob(str)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );
}