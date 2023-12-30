import http from 'node:http'
import { json } from './percorre.js'
import { Routes } from './routes.js'
import { queryparamtrsextrated } from './queryparamters.js'


const server = http.createServer(async(req,res)=>{
 const { method, url} = req
    await json(req,res)

    const route = Routes.find( route =>{
        return route.method == method && route.path.test(url)
    })

    if(route){
        const routeParametrs = req.url.match(route.path)
        //console.log(queryparamtrsextrated(routeParametrs.groups.query))

        const { query, ...params } = routeParametrs.groups
        req.query  =  query ? queryparamtrsextrated(query) : {}

        req.params =   params

        route.handler(req,res)
    }
 

})

server.listen(3333)