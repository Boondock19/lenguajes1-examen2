

# Def de variables alpha y beta

a = 6
b = 7

def fRecurtion (n) :
    if n < 0 :
        return 0
    elif n >= 0 and n < a*b :
        return n
    else :
        return fRecurtion(n-b*1) + fRecurtion(n-b*2) + fRecurtion(n-b*3) + fRecurtion(n-b*4) + fRecurtion(n-b*5) + fRecurtion(n-b*6)


def tailRecursion(n,acc,i = 0):
    i+=1
    if n == 0 and n < a*b:
        return acc
    else :
        return tailRecursion(n-b*i,acc+1)


def fIterative(n):
    if n < 0: return 0
    if n == 0 and n < a*b : return n
    
    temp = n % (a*b)
    lowestToTop = temp
    
    while lowestToTop <= (a*b):
        lowestToTop += b
    
    return lowestToTop



print("fRecurtion con -20",fRecurtion(-20))
print("fRecurtion con 30",fRecurtion(30))
print("42 es menor que 42?", 42 < 42)
print("fRecurtion con 42",fRecurtion(a*b))
print("fRecurtion con 44",fRecurtion(a*b + 2))
print("fRecurtion con 50",fRecurtion(50))

print("fIterative con 44",fIterative(50))
