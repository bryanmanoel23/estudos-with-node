export function buildRoutePath(path){
    const regex = /:([a-zA-Z]+)/g

    const regexWithPath = path.replaceAll(regex, '(?<$1>[a-z0-9\-_]+)')

    const verdadeira = new RegExp(`^${regexWithPath}(?<query>\\?(.*))?$`)

  
    return verdadeira;
}