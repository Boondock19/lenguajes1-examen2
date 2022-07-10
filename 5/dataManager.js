
// Enter any texts ( User input)




console.log("Bienvenido al programa de data Manager");
console.log('Luego de cada accion, se pedira una siguiente')

// Creando un array para cada uno de los programas a definir
let arrayOfAtomics = []
let arrayOfStructs = []
let arrayOfUnions = []




process.stdin.on('data', data => {

    const dataString = (data).toString()
    const dataArray =dataString.split(" ")
    

    /* 
        Creacion de tipos atomicos
    */
    if(dataArray[0] == "ATOMICO") {
        console.log("ENTRO EN ATOMICO")
        if (dataArray.length < 3) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1]
            let representation = dataArray[2]
            let alineacion = dataArray[3].trim()

            const filteredName = arrayOfAtomics.filter (atomic => atomic.name == name) 
            if (filteredName.length > 0) { 
                console.log("ERROR: El nombre ya existe")
            } else {
                let newAtomic = {
                    name,
                    representation,
                    alineacion
                }

                arrayOfAtomics.push(newAtomic)
            }
        }
        
        console.log(dataArray)
        console.log(arrayOfAtomics)
    }
        
    

        
    

    /* 
        Creacion de structs
    */
    if(dataArray[0] == "STRUCT") {
        console.log("ENTRA EN STRUCT")

        if (dataArray.length < 3) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1]
            let arrayOfTypes = dataArray.slice(2)
            arrayOfTypes[arrayOfTypes.length-1] = arrayOfTypes[arrayOfTypes.length-1].trim()
            console.log(arrayOfTypes)
            const filteredName = arrayOfStructs.filter (struct => struct.name == name) 
            // Buscamos el nombre en los tipos, si existe no lo permitimos
            let flagTypeName = findOne([name],arrayOfAtomics)
            let flag = findOne(arrayOfTypes,arrayOfAtomics)
            console.log(flag)
            if (filteredName.length > 0) { 
                console.log("ERROR: El nombre ya existe")

            }
            else if (flagTypeName != false) {
                console.log("ERROR: El nombre ya existe y es de un tipo atomico")
            }
            else  if (flag == false) {
                console.log("ERROR: un tipo no existe")
            } else {
                let newStruct = {
                    name,
                    arrayOfTypes
                }

                arrayOfStructs.push(newStruct)
            }
            
        }

        console.log(dataArray)
        console.log(arrayOfStructs)

    }


    /* 
        Creacion de unions
    */
    if(dataArray[0] == "UNION") {
        console.log("ENTRA EN UNION")

        if (dataArray.length < 3) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1]
            let arrayOfTypes = dataArray.slice(2)
            arrayOfTypes[arrayOfTypes.length-1] = arrayOfTypes[arrayOfTypes.length-1].trim()
            console.log(arrayOfTypes)
            
            const filteredName = arrayOfUnions.filter (union => union.name == name) 
            // Buscamos el nombre en los tipos, si existe no lo permitimos
            let flagTypeName = findOne([name],arrayOfAtomics)
            let flag = findOne(arrayOfTypes,arrayOfAtomics)
            console.log(flag)
            if (filteredName.length > 0) { 
                console.log("ERROR: El nombre ya existe")

            }
            else if (flagTypeName != false) {
                console.log("ERROR: El nombre ya existe y es de un tipo atomico")
            }
            else  if (flag == false) {
                console.log("ERROR: un tipo no existe")
            } else {
                let newUnion = {
                    name,
                    arrayOfTypes
                }

                getUnionInfo(newUnion)

                arrayOfUnions.push(newUnion)
            }
            
        }

        console.log(dataArray)
        console.log(arrayOfUnions)
    }

    /* 
        Registros son structs
        y registros variante son los Unions
    */
    
    if (dataArray[0] == "DESCRIBIR") {
        console.log("ENTRA EN DESCRIBIR")
        if (dataArray.length < 2) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1].trim()
            let filteredName = arrayOfAtomics.filter (atomic => atomic.name == name)
            let filteredNameStruct = arrayOfStructs.filter (struct => struct.name == name)
            let filteredNameUnion = arrayOfUnions.filter (union => union.name == name) 
            
            // console.log(filteredName)
            // console.log(filteredNameStruct)
            // console.log(filteredNameUnion)
            
            // Si no esta en ninguna de las listas anteriores, entonces no existe
            if (filteredName.length == 0 && filteredNameStruct.length == 0 && filteredNameUnion.length == 0) { 
                
                console.log("ERROR: El nombre no existe")
            } else {
                let currentType;
                let isStruct = false
                // Si existe en una de las listas, entonces lo mostramos
                if (filteredName.length > 0) { 
                   currentType = filteredName
                } else if (filteredNameStruct.length > 0) { 
                    currentType = filteredNameStruct
                    isStruct = true
                } else if (filteredNameUnion.length > 0) { 
                    currentType =filteredNameUnion
                }

                console.log(currentType)
                if (isStruct == false) {
                    console.log(describirInfoPacked(currentType))
                } else {
                    // f
                }

            }
        }
    }
    console.log("Siguiente accion: ")

    // Salimos del programa
    if (dataArray[0].trim() === 'SALIR') {
        console.log('Terminando el programa ...')
        process.exit()
    }
    
});


/**
 * 
 * @param {array con nombres a buscar} names 
 * @param {array donde buscar los nombres} array 
 * @returns bool que representa si lo encontro o no
 */
let findOne = (names,array) => {
    
    for (let i = 0; i < names.length; i++) { 
        let flag = array.find(element => element.name == names[i])
        if (flag == undefined) {
            return false
        }
    }
   

    return true
}

let getTypeInfo = (type) => {
    let typeInstance = arrayOfAtomics.find(element => element.name == type)
    return typeInstance
}

let getUnionInfo = (union) => {
    let max = 0
    let maxRepresentation = 0 
    union.arrayOfTypes.forEach(type => {
        let typeInfo = getTypeInfo(type)
        if (typeInfo.alineacion > max) {
            max = typeInfo.alineacion
            maxRepresentation = typeInfo.representation
        }
    })
    union.alineacion = max
    union.representation = maxRepresentation
}

let describirInfoPacked = (types) => {
    let type = types[0]
    let alineacion = type.alineacion
    let representation = type.representation
    let desperdicio = 0

    return `El tipo ${type.name} tiene ${alineacion} , ocupa ${representation} con desperdicio ${desperdicio}`
}
