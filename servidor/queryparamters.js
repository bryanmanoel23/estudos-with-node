//?search=teste page=2

export function queryparamtrsextrated(query){
    return query.substr(1).split('&').reduce((queryparamtes, param) =>{
        const [key, value] = param.split('=')

        queryparamtes[key] = value
        return queryparamtes

    }, {})
}