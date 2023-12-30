import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database{

    #Database = {}

    constructor(){
        fs.readFile(databasePath,'utf8')
        .then(data =>{
            this.#Database = JSON.parse(data)
        })
        .catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#Database))
    }

    select(table, search){
        let data = this.#Database[table] ?? []

        if(search){ 
        data = data.filter( row =>{
            return Object.entries(search).some(([key, value])=>{
                return row[key].toLowerCase().includes(value.toLowerCase())
            })
        })
    }
        return data;
    }

    insert(table, data){
        if(Array.isArray(this.#Database[table])){
            this.#Database[table].push(data)
        }else{
            this.#Database[table] = [data]  
        }
        this.#persist()
        return data
    }

    delete(table, id){
        const rowIndex = this.#Database[table].findIndex(row => row.id == id)

        if(rowIndex > -1){
            this.#Database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table,id,data){
        const rowIndex = this.#Database[table].findIndex(row => row.id == id)

        if(rowIndex > -1){
            this.#Database[table][rowIndex] = {id, ...data} 
            this.#persist()
        }
    }
}