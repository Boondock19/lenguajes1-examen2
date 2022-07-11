

# Def de variables alpha y beta

a = 6
b = 7

# Funcion recursiva para calcular la funcion F(n)

def fRecurtion (n) :
    if n < 0 :
        return 0
    elif n >= 0 and n < a*b :
        return n
    else :
        return fRecurtion(n-b*1) + fRecurtion(n-b*2) + fRecurtion(n-b*3) + fRecurtion(n-b*4) + fRecurtion(n-b*5) + fRecurtion(n-b*6)


# Funcion iterativa para calcular la funcion F(n)
def fIterative(n):
    if n < 0: return 0
    if n == 0 and n < a*b : return n
    
    temp = n % (a*b)
    lowestToTop = temp
    highestToBottom = temp - b
    arrayOfValues = []
    
    while lowestToTop <= (a*b):
        arrayOfValues.append(lowestToTop)
        lowestToTop += b
    
    while highestToBottom >= 0:
        arrayOfValues.insert(0, highestToBottom)
        highestToBottom -= b

    
    while n >= a*(b+1):

        actualValue = sum(arrayOfValues)

        for i in range(a-1):
            arrayOfValues[i] = arrayOfValues[i+1]

        arrayOfValues[-1] = actualValue

        n -= b

    return sum(arrayOfValues)

print("fRecurtion con -20",fRecurtion(-20))
print("fRecurtion con 30",fRecurtion(30))
print("42 es menor que 42?", 42 < 42)
print("fRecurtion con 42",fRecurtion(a*b))
print("fRecurtion con 44",fRecurtion(a*b + 2))
print("fRecurtion con 50",fRecurtion(50))

print("fIterative con 50",fIterative(50))
