package main

import "fmt"

/*
	Creamos una interfaz para la los numero de Church.
	Es un convenenio terminar el nombre de la interfaz
	con er
*/

type Churcher interface {
	/*
		Internamente en la interfaz podemos declarar
		metodos que seran usados por ella.
	*/

	suc()
	amountOfChurch()
	createChurchFromInt()
	sumOfChurch(int, int)
	multOfChurch()
}

// Creamos un struck que representa un numero de Church
type church struct {
	churchNumber *church
}

func suc(a *church) *church {

	return &church{a}

}

/*
	Funcion para obtener el numero de church de una instancia de church
*/
func amountOfChurch(a *church) int {
	var actual = a.churchNumber
	var number = 0

	// Si no hay mas numeros de church, entonces es nil
	for actual.churchNumber != nil {

		actual = actual.churchNumber
		number++

	}
	return number
}

/*
	Crea i-1 numeros de church (desde el 0 hasta el i-1)
*/
func createChurchFromInt(i int) *church {
	var church = &church{}

	for i != 0 {
		church = suc(church)
		i--
	}
	return church
}

/*
	Segun la def de los numeros de church, la suma de dos numeros de church
	es igual a la suma de la cantidad de veces que se aplica la funcion F()
	es decir es como una suma de exponente. De manera que primero sumaremos los
	valores de int y luego crearemos un numero de church a partir de ese valor.
*/

func sumOfChurch(firstNumber int, secondNumber int) *church {
	// Agregamos uno adicional porque el primero siempre es 0
	var sum = firstNumber + secondNumber + 1
	return createChurchFromInt(sum)
}

/*
	Similar a la suma de numeros de church, la multiplicacion de numeros de church
	es como una multiplicacion de exponentes. De manera que primero multiplicaremos
	los valores de int y luego crearemos un numero de church a partir de ese valor.
*/

func multOfChurch(firstNumber int, secondNumber int) *church {
	// Agregamos uno adicional porque el primero siempre es 0
	var mult = firstNumber*secondNumber + 1
	return createChurchFromInt(mult)
}

func main() {

	// el zero value de una instancia de church es nil

	var zero = church{
		churchNumber: &church{},
	}

	var churchNumber1 = church{
		churchNumber: &church{
			churchNumber: &church{
				churchNumber: &church{},
			},
		},
	}

	var churchNumber2 = suc(suc(suc(&churchNumber1)))

	// churchNumber1 = 2
	fmt.Printf("churchNumber1 = %+v\n", amountOfChurch(&churchNumber1))
	// churchNumber2 = 5
	fmt.Printf("churchNumber2 = %+v\n", amountOfChurch(churchNumber2))

	var newChurchNumber = createChurchFromInt(10)
	// newChurchNumber = 9
	fmt.Printf("newChurchNumber = %+v\n", amountOfChurch(newChurchNumber))
	// zero  = 0
	fmt.Printf("zero = %+v\n", amountOfChurch(&zero))

	var sumOf1And2 = sumOfChurch(amountOfChurch(&churchNumber1), amountOfChurch(churchNumber2))
	// sumOf1and2 = 7
	fmt.Printf("sumOf1and2 = %+v\n", amountOfChurch(sumOf1And2))
	var multOf1And2 = multOfChurch(amountOfChurch(&churchNumber1), amountOfChurch(churchNumber2))
	// multOf1and2 = 10
	fmt.Printf("multOf1and2 = %+v\n", amountOfChurch(multOf1And2))
}
