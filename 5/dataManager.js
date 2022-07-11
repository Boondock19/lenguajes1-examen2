
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
        if (dataArray.length < 4) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1]
            let representation = parseInt(dataArray[2])
            let alineacion = parseInt(dataArray[3].trim())

            const filteredName = arrayOfAtomics.filter (atomic => atomic.name == name) 
            if (filteredName.length > 0) { 
                console.log("ERROR: El nombre ya existe")
            } else {
                let newAtomic = {
                    name,
                    representation,
                    alineacion,
                    spaceUsed: 0,
                    remainder:representation
                }

                arrayOfAtomics.push(newAtomic)
            }
        }
        
    }
        
    

        
    

    /* 
        Creacion de structs
    */
    if(dataArray[0] == "STRUCT") {

        if (dataArray.length < 3) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1]
            let arrayOfTypes = dataArray.slice(2)
            arrayOfTypes[arrayOfTypes.length-1] = arrayOfTypes[arrayOfTypes.length-1].trim()
            let filteredName = arrayOfStructs.filter (struct => struct.name == name) 
            if (filteredName.length == 0) {
                filteredName = arrayOfUnions.filter (union => union.name == name)
            } 
            // Buscamos el nombre en los tipos, si existe no lo permitimos
            let flagTypeName = findOne([name],arrayOfAtomics)
            let flag = findOne(arrayOfTypes,arrayOfAtomics)
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

    }


    /* 
        Creacion de unions
    */
    if(dataArray[0] == "UNION") {

        if (dataArray.length < 3) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1]
            let arrayOfTypes = dataArray.slice(2)
            arrayOfTypes[arrayOfTypes.length-1] = arrayOfTypes[arrayOfTypes.length-1].trim()
            
            
            let filteredName = arrayOfUnions.filter (union => union.name == name)
            if (filteredName.length == 0) {
                filteredName = arrayOfStructs.filter (struct => struct.name == name)
            } 
            // Buscamos el nombre en los tipos, si existe no lo permitimos
            let flagTypeName = findOne([name],arrayOfAtomics)
            let flag = findOne(arrayOfTypes,arrayOfAtomics)
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
    }

   
    
    if (dataArray[0] == "DESCRIBIR") {
        if (dataArray.length < 2) { 
            console.log("ERROR: Faltan datos")
        } else {
            let name = dataArray[1].trim()
            let filteredName = arrayOfAtomics.filter (atomic => atomic.name == name)
            let filteredNameStruct = arrayOfStructs.filter (struct => struct.name == name)
            let filteredNameUnion = arrayOfUnions.filter (union => union.name == name) 
                       
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

                
                if (isStruct == false) {
                    console.log(describirInfo(currentType))
                } else {
                    
                    // Primero info empaquetacada
                    
                    console.log(describirInfoStructPacked(currentType))
                    console.log(describirInfoStructNotPacked(currentType))
                    
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

/**
 * 
 * @param {nombre de tipo en atomicos} type 
 * @returns instacia de tipo atomico
 */

let getTypeInfo = (type) => {
    let typeInstance = arrayOfAtomics.find(element => element.name == type)
    return typeInstance
}

/**
 * 
 * @param {instancia de un union} union 
 * 
 * Funcion utulizada para obtener la informacion de un union
 * es decir, saber cual es su mayor tamaño y alineacion.
 */

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

/**
 * Obtiene la informacion de un tipo de tipo distinto
 * a struct para poder desplegarla en la pantalla.
 * La informacion en caso de tipos atomicos y union
 * es igual para empaquetados o no empaquetados.
 * 
 * @param {tipo atomico o union} types 
 * @returns String con la informacion.
 */

let describirInfo = (types) => {
    let type = types[0]
    let alineacion = type.alineacion
    let representation = type.representation
    let desperdicio = 0

    return `El tipo ${type.name} tiene alineacion ${alineacion} , ocupa ${representation} con desperdicio ${desperdicio}`
}


/**
 * 
 * @param {instancia de un struct} types 
 * @returns String con informacion del struct
 * en el caso de que sea empaquetado.
 */

let describirInfoStructPacked = (types) => {
    let type = types[0]
    let arrayOfTypes = type.arrayOfTypes
    let memory = []

    arrayOfTypes.forEach(type => {
        let typeInfo = getTypeInfo(type)
        let memoryLine = {
            numero:0,
            bytesLibres :4,
            bytesOcupados :0,
            ocupacion: 4
        }

        /* 
            Con el numero de la memorio, podemos saber si se pueden
            ingresar los datos por la alineacion con la operacion
            linea mod alineacion, si es 0, entonces se puede ingresar
            en caso contrario debemos agregar una linea en blanco
        */
        memoryLine.numero += memory.length * 4
        let ingresoPermitido = memoryLine.numero % typeInfo.alineacion
        while (ingresoPermitido != 0) {
            memory.push(memoryLine)
            memoryLine = {
                numero:0,
                bytesLibres :4,
                bytesOcupados :0,
                ocupacion:4,
            }
            memoryLine.numero += memory.length * 4
            ingresoPermitido = memoryLine.numero % typeInfo.alineacion
        }
        /* 
            Si el mod da 0, entonces todos los espacios fueron ocupados
            caso contrario, fueron ocupados menos de 4 bytes y por def
            de mod sabremos cuantos bytes fueron ocupados
        */
       
        let bytesOcupadosCalculo = (typeInfo.representation % 4 == 0) ? 4 : typeInfo.representation % 4  
        memoryLine.bytesOcupados += bytesOcupadosCalculo
        memoryLine.bytesLibres -= typeInfo.representation
        
        /* 
            Bytes libres no puede ser menor que 0, en caso de 
            que lo sea entonces el valor absoluto de esa cantidad
            es lo que falta por colocar en otra linea de ese tipo
            por lo tanto en remainder del tipo se guarda esa cantidad
            de manera posisitiva y en spacedUsed se guarda el remainder -
            los bytes que faltan por colocar en otra linea de ese tipo
        */
        if (memoryLine.bytesLibres < 0) {
            typeInfo.spaceUsed = typeInfo.remainder - memoryLine.bytesLibres * -1
            typeInfo.remainder = memoryLine.bytesLibres * -1
            memoryLine.bytesLibres = 0
            
            memory.push(memoryLine)
            
            let adicionalMemoryLine = {
                numero:0,
                bytesLibres :4,
                bytesOcupados :0,
                ocupacion:4,
            }
            
            adicionalMemoryLine.numero += memory.length * 4
            let bytesOcupadosCalculo = (typeInfo.representation % 4 == 0) ? 4 : typeInfo.representation % 4  
            adicionalMemoryLine.bytesOcupados += bytesOcupadosCalculo
           // adicionalMemoryLine.bytesOcupados += typeInfo.remainder
            adicionalMemoryLine.bytesLibres -= typeInfo.remainder

            if (adicionalMemoryLine.bytesLibres >= 0) {
                memory.push(adicionalMemoryLine)
            }
             

            while (adicionalMemoryLine.bytesLibres < 0) {
                typeInfo.spaceUsed = typeInfo.remainder - adicionalMemoryLine.bytesLibres * -1
                typeInfo.remainder = adicionalMemoryLine.bytesLibres * -1
                adicionalMemoryLine.bytesLibres = 0
                
                
                memory.push(adicionalMemoryLine)
                
                adicionalMemoryLine = {
                    numero:0,
                    bytesLibres :4,
                    bytesOcupados :0,
                    ocupacion:4,
                }
                
                adicionalMemoryLine.numero += memory.length * 4
                let bytesOcupadosCalculo = (typeInfo.representation % 4 == 0) ? 4 : typeInfo.representation % 4  
                adicionalMemoryLine.bytesOcupados += bytesOcupadosCalculo
                // adicionalMemoryLine.bytesOcupados += typeInfo.remainder
                adicionalMemoryLine.bytesLibres -= typeInfo.remainder
    
    
                memory.push(adicionalMemoryLine)
            }

        } else {
            memory.push(memoryLine)
        }
        
    })

    /* 
        Colocamos los bytes libres de la ultima linea a 0 para que no sean considerados
        en el calculo de la ocupacion total. Y colocamos la ocupacion de la ultima linea
        igual a los bytes ocupados.
    */
    memory[memory.length - 1].bytesLibres = 0
    memory[memory.length - 1].ocupacion =  memory[memory.length - 1].bytesOcupados

    
    let [usedSpace,freeSpace] = getMemoryInfo(memory)
    
    let salida = `El tipo ${type.name} ocupa ${usedSpace} con desperdicio de ${freeSpace} bytes con registro empaquetado`

    return salida
    
}

/**
 * 
 * @param {Array que representa una memoria} memory 
 * @returns el espacio usado y el libre la struct
 */

let getMemoryInfo = (memory) => {
    let usedSpace = 0
    let freeSpace = 0
    memory.forEach(line => {
        usedSpace += line.ocupacion
        freeSpace += line.bytesLibres
     
    })

    return [usedSpace,freeSpace]

}

/**
 * 
 * @param {instancia de un struct} types 
 * @returns Un string que representa la informacion del struct
 * en caso de que no sea empaquetado.
 */

let describirInfoStructNotPacked = (types) => {
    /* 
        El desperdicio siempre sera 0 en no empaquetado
        y para el espacio ocupado podemos sumar la representacion
        de cada item del array de tipos
    */
    
    let type = types[0]
    let arrayOfTypes = type.arrayOfTypes
    let usedSpace = 0
    let freeSpace = 0
    arrayOfTypes.forEach(type => {
        let typeInfo = getTypeInfo(type)
        usedSpace += typeInfo.representation         
    })

    
    let salida = `El tipo ${type.name} ocupa ${usedSpace} con desperdicio de ${freeSpace} bytes con registros sin empaquetar`

    return salida
    
}