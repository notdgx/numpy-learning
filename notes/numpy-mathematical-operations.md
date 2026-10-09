# Topics 


- Element-wise arithmetic
- Broadcasting rules (memorize these)
- np.dot(), np.matmul(), @ operator
- np.sum(), np.mean(), np.std(), np.var()
- axis parameter
- np.min(), np.max(), np.argmin(), np.argmax()
- np.abs(), np.sqrt(), np.exp(), np.log()
- np.clip()
```
                    MATHEMATICAL OPERATIONS
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
     Element-wise         Reductions          Matrix /
     operations           operations          Linear Algebra
          │                   │                   │
     +  -  *  /              sum             dot
     **                       mean            matmul
                              std             @
                              var
          │                   │
          ▼                   ▼
   Broadcasting             axis
   determines               determines
   whether different        which dimension
   shapes can interact      is reduced
          │
          └───────────────┐
                          │
                          ▼
                 Mathematical ufuncs
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
             abs         sqrt         exp
                          │
                          ▼
                         log
                          │
                          ▼
                        clip
```
```
Element-wise transformations
        │
        ├── abs()
        ├── sqrt()
        ├── exp()
        ├── log()
        └── clip()
```

----
----

# Element-wise arithmetic

- these are done on the all eleemts in a array 
- NumPy arithmetic normally operates on corresponding elements of an array.

|Operation|Operator|Meaning|
|---|---|---|
|Addition|`+`|element-wise addition|
|Subtraction|`-`|element-wise subtraction|
|Multiplication|`*`|element-wise multiplication|
|Division|`/`|element-wise division|
|Floor division|`//`|element-wise floor division|
|Power|`**`|element-wise exponentiation|
|Modulo|`%`|element-wise remainder|
|Unary plus|`+a`|element-wise positive|
|Unary minus|`-a`|element-wise negation|

- the arrys should be of the same shape it will be hten performed and like that eleemnt of arr1 and same positon eleemnt of arr2
```
1×5   2×6
3×7   4×8
```
- we can do it with scalar aslo `a + 10`


---
# Broadcasting rules

- Broadcasting is NumPy's mechanism for allowing arrays with compatible but different shapes to participate in element-wise operations.
- it allows different shape to do the arthemetical operation like 
```
A =

[1 2 3]
[4 5 6]

b =

[10 20 30]
```
```
[1 2 3] + [10 20 30]
[4 5 6] + [10 20 30]
```

- compare dimensions from refht to left 
- align them on right
- think missing dimension as 1 
```
A.shape = (2, 3, 4)
B.shape = (3, 4)
```
```
A = (2, 3, 4)
B =    (3, 4)
```
```
A = (2, 3, 4)
B = (1, 3, 4)
```
```
4 vs 4 → compatible
3 vs 3 → compatible
2 vs 1 → compatible
```

- the lower dim array dims size should be equal or `1`
```
5 and 5 → compatible
5 and 1 → compatible
1 and 5 → compatible
1 and 1 → compatible
```
- missing dims are considered as 1 
```
(2,1)
(2,3)
```
- theese are compatable because of 1 dim and 2 == 2 
- internally  : 
```
A:

[10]
[20]

becomes usable like:

[10 10 10]
[20 20 20]
```
- compatable :
```
(3,1)
(1,4)
```
- the reruened will be n,m if n,1 and 1,m
- if smae then same will appear liek n,m if n,1 and n,m
- if smae then same will appear liek n,m if n,m and n,m
- the operation will be perofomed on values 
- value error if not compatable dims 
- For each broadcasted dimension, the resulting size is the larger compatible dimension.
- a scalar is not exactly a numpy 0 dim array
- but  scalar can act like one in broadcasting 

```
A + b
A - b
A * b
A / b
A // b
A ** b
A % b
```

- this doesnt change the original array 
- wee can do `A += 10` to opeform in place update 
- broadcasting is mostly abou the no of eleemts in a dims because dims can be handled with 1 
- Allows compatible shapes to participate in an operation without requiring the smaller array to be explicitly reshaped/repeated.
- the arthemetic also applies withe dtype promotion rules 
- it may or may not prserve the dtype 
- the divide by zero can give matic of `inf` it doent give error but a warning and give this inf array 
- overflow can be possible 
```
x = np.array([127], dtype=np.int8)
x + 1
```
- we can combine cained operations 
```
result = (A + B) * C
```
```
A + B
   ↓
element-wise addition
   ↓
temporary/result
   ↓
* C
   ↓
element-wise multiplication
```

- use axis in the seperate funcitons to do it along not the braodcasting and the arthemwetic one because this isnt about reducing ht dimesnsitons 
- it retuns a nd array 
- it returns a new array new object  + new data
- because it need to compute first and that compute is stroed hence no view can be proeduced in real time , 
- to imporve effeciy no view 
- it doesnt modify the original until reassigned 

```
             NumPy element-wise arithmetic
                         │
                         ▼
               Look at operand shapes
                         │
                         ▼
                 Are shapes identical?
                    /             \
                  YES              NO
                   │                │
                   │          Try broadcasting
                   │                │
                   │       Compare right → left
                   │                │
                   │       equal OR one is 1
                   │                │
                   │          ┌─────┴─────┐
                   │          │           │
                   │        YES           NO
                   │          │           │
                   └──────────┤         ERROR
                              │
                              ▼
                     Determine output shape
                              │
                              ▼
                    Perform operation
                     element by element
                              │
                              ▼
                        Result ndarray
```

--------
----------

# np.dot() & np.matmul() & @ operator


- we neeed to have a brodcastable shape for the `@`
- but we dont necessary have it for the `dot`
- for the `1d` they both gives out scalar
- for the `2d` they have same behaviour the matric multiplicartion 
- and it need tro follow the `a x n` , `n x b` rule to get `-->` `a x b`
- for the `3d` it chages : the `@` prioces them in batches, allows broadcasting need the broadcasting rules to be there 
- adn do boradcasting batch matrix multiplications 
- but the dot do something elso it not need to have the the bradcastabel shape it still need 4th rule but no the broadcast properties of smae or 1 dim size
- it cannot do if the last two dims are not aligned 
- dot can do the lower dims too if they last two are aligned 
- and it can be like 
```
Shape a -> (2, 3, 4)
Shape f -> (4,)
Shape x -> (2, 3)

Shape a -> (2, 3, 4)
Shape g -> (2, 2, 2, 4, 4)
Shape x -> (2, 3, 2, 2, 2, 4)
```

- in the mat mul we neeed to have the last two aligned dims and the broadcastabel property shape of the rest 
- it can work 
```
Shape a -> (2, 3, 4)
Shape b -> (4,)
Shape x -> (2, 3)
```
- the `a @ b ` != `b @ a` because of the comparison to clarify is is aligned shapes or not that cna change the respect of it 
- 




```
                    Multiplication
                         │
          ┌──────────────┴──────────────┐
          │                             │
    Element-wise                    Linear algebra
          │                             │
          *                         dot / matmul / @
```

```
np.dot()
    ↓
older/general-purpose dot product
    ↓
behavior depends strongly on dimensions

np.matmul()
    ↓
matrix multiplication
    ↓
specifically designed around matrix-multiplication rules

@
    ↓
operator syntax for matrix multiplication
    ↓
same operation as np.matmul()
```

```
A * B       → element-wise multiplication
A @ B       → matrix multiplication
np.matmul() → matrix multiplication
np.dot()    → dot product / dimension-dependent product
```




```
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
```
```
1×4 + 2×5 + 3×6
= 4 + 10 + 18
= 32
```

- for the 1D vectors it and matrix multiplication returns the same `32` and ie their result same 
- `*` is ht element wise multiplication of a scalar or broadcasetes array 
- but in dot it actully add the resultand answer from the `*`
- 


- both do the same
- it is  the matrix multiplication 
- `A @ B`
- for 1D it have same asnwes as the dot product 
- for matrix mul we need a 1st as `n x m` other `m x c` s we can get the `n x c` as a result 
- the inner dim should mathc 
- 

```
(2,3) @ (3,2)
       ↑
    inner dimensions
    must match
```

```
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

B = np.array([
    [10, 20],
    [30, 40],
    [50, 60]
])
```

```
[[19, 22],
 [43, 50]]
```
```
1×5 + 2×7 = 19
1×6 + 2×8 = 22
3×5 + 4×7 = 43
3×6 + 4×8 = 50
```
```
*  → element-wise multiplication
@  → matrix multiplication
```

- batched matrix multiplication it is for high dim matric as the last two dims will only multiply and it depend on it as 
```
A → (2,3,4)
B → (2,4,5)

batch = 2

A contains 2 matrices of shape (3,4)
B contains 2 matrices of shape (4,5)
```
```
(3,4) @ (4,5) → (3,5)
	|
(2,3,5)
```
```
2 batches
│
├── A[0] → (3,4)
│   B[0] → (4,5)
│   ↓
│   result → (3,5)
│
└── A[1] → (3,4)
    B[1] → (4,5)
    ↓
    result → (3,5)
```

- it can broadcast the matic multiplication aslo as 
- `B` can participate through broadcasting over the batch dimension.
```
A.shape = (5, 3, 4)
B.shape = (4, 6)
```
```
A → 5 matrices of shape (3,4)
B → one matrix of shape (4,6)
```
```
(5,3,4) @ (4,6) ---> (5,3,6)
```

```
A[0] @ B
A[1] @ B
A[2] @ B
A[3] @ B
A[4] @ B
```

- imporant high dim : 
```
A.shape = (2, 1, 3, 4)
B.shape = (5, 4, 6)
```
```
A → batch dimensions + matrix dimensions
   (2, 1) + (3,4)

B → batch dimensions + matrix dimensions
   (5) + (4,6)
```
```
(3,4) @ (4,6)  --- > (3,6)
```
```
A batch → (2,1)
B batch → (5)

(2,1)
(1,5)
  |
  |
(2,5)

---> (2,5,3,6)
```

## dot 

- for `2D` they behave same the dot and the `@`
- `np.dot(a,b)` does **not** use the same simple batched matrix multiplication rule as `matmul`.
- `dot` contracts the **last axis of the first array with the second-to-last axis of the second array**.
```
a → (2,3,4)
b → (5,4,6)

--> (2,3,5,6)
```

- for two `0d` and `0d` -> normal multiply 
- for two `1d` and `1d` -> dot product -> scalar
- for two `2d` and `2d` -> matrx mul -> matrix
- N-D · 1-D The last axis of the N-D array is contracted with the 1-D vector.
- N-D · M-D `dot()` uses:
```
last axis of first array
        ×
second-to-last axis of second array

and combines the remaining dimensions. 
```


## @ 

- for `1-D` @ `1-D` - > dot product -> scalar
- for `2-D` @ `2-D` - > mat multiplication -> maticx
- for `2-D` @ `1-D` - > mat multiplication -> vector
- for `1-D` @ `2-D` - > mat multiplication -> vector
- for `N-D` @ `N-D` - > mat multiplication -> Treat the **last two dimensions as matrices**, and broadcast the earlier dimensions.
- 


```
(2,3) @ (3,4) → (2,4)

(5,2) @ (2,8) → (5,8)

(3,) @ (3,)    → ()

(2,3) @ (3,)   → (2,)

(3,) @ (3,2)   → (2,)

(2,3,4) @ (4,5) → (2,3,5)
```

- on sclaras do the normal `*`
- mostly use the `@` over dot 

|Feature|`np.dot()`|`np.matmul()`|`@`|
|---|---|---|---|
|Element-wise?|No|No|No|
|Matrix multiplication?|Yes for 2-D|Yes|Yes|
|1-D × 1-D|dot product|dot product|dot product|
|2-D × 2-D|matrix multiplication|matrix multiplication|matrix multiplication|
|Higher-D behavior|special `dot` contraction|batched matrix multiplication|same as `matmul`|
|Batch broadcasting|not the same model|Yes|Yes|
|Scalar inputs|more general|not intended|not for scalar `matmul`|
|Main purpose|dimension-dependent dot operation|matrix multiplication|matrix multiplication syntax|

```
0-D + anything
→ multiplication-style behavior

1-D, 1-D
→ scalar dot product

2-D, 2-D
→ matrix multiplication

N-D, 1-D
→ contracts a's last axis with b

N-D, M-D
→ contracts:
   a's last axis
   with b's second-last axis
```

```
(a,) @ (a,)       → ()

(m,n) @ (n,)      → (m,)

(n,) @ (n,p)      → (p,)

(m,n) @ (n,p)     → (m,p)

(...,m,n) @ (n,p) → (...,m,p)

(...,m,n) @ (...,n,p)
                  → broadcasted_batch + (m,p)
```


- they returns a ndarray 
- it doesnt modify thee original 
- it doenst give view as it has computed the rsult it gives a new data and new array 
- befor `@` operation
```
1. What are A.shape and B.shape?
2. Are they 1-D, 2-D, or N-D?
3. If N-D, what are the last two dimensions?
4. Do those matrix dimensions satisfy multiplication?
5. What are the batch dimensions?
6. Can the batch dimensions broadcast?
7. What is the final output shape?
```

- for `@`
```
             B columns
              ↓     ↓

A row →     [ 10   20 ]
            [ 30   40 ]
            [ 50   60 ]

[1 2 3] →   row × column
            ↓
        1×10 + 2×30 + 3×50 = 220

[1 2 3] →   row × column
            ↓
        1×20 + 2×40 + 3×60 = 280

[4 5 6] →   row × column
            ↓
        4×10 + 5×30 + 6×50 = 490

[4 5 6] →   row × column
            ↓
        4×20 + 5×40 + 6×60 = 640
```


---
---

# np.sum(), np.mean(), np.std(), np.var()

- they are reduction opetators they do many values to few values 
- 

# axis parameter

- it helps to instruct where and along how we have to perform the operation 
- `axis` tells NumPy which dimension is being collapsed/reduced.
- 


# np.min(), np.max(), np.argmin(), np.argmax()



# np.abs(), np.sqrt(), np.exp(), np.log()




# np.clip()

