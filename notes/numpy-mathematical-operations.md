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

# np.sum(), np.mean(), np.std(), np.var(), axis parameter

- they are reduction opetators they do many values to few values 
- `axis` tells NumPy which dimension to collapse/reduce.
- the one axis you specify it will reduce that one and the final answer will not have that dim 
- sum it sum all eleemts 
- mean gives mean, std -> standard deeviation and var gives variance 
- withut axis or `axis = None` they gives all eleemts sum a scalr value 
- `keepdims=True` it will tell it to dotn reduce the axis to 1 not just rremoving it 
- even with axis none it gives the all ements oerational output and dim as `1,1,1` or whatever 
- we can aslo reduce multiple axis like `axis=(0,2)`
- mean here is arthemetic mean 
- it can give and conver the value in float 64 
- variance : `ddof` by default it is `0` it meand the divior by defalult zero means it will use the `N` if `ddof=1` the `N-1`
```
ddof=0 → divide by N
ddof=1 → divide by N-1
```
- on booleand value sum counts the trues 
- mean on boolean values give what faction is tue
- empty arrays give zero no error 
- axis must exist otherwise the axis error 
- we can use negative axises
- `-1` = last dim 
- we can use `where= conditon` to do a conditional oepration
```
x = np.array([1, 2, 3, 4, 5])

np.sum(x, where=x > 2)
```
- also `out=result` it cna send teh answer to resulat and result can recieve it 
- aslo sum supports `initial=10` vallue to start the sum forom default is `0`
- `ddof` is for he std and var both 
- they all give a new array no view ans it is computed 


- it helps to instruct where and along how we have to perform the operation 
- `axis` tells NumPy which dimension is being collapsed/reduced.

---
---

# np.min(), np.max(), np.argmin(), np.argmax()

- `np.min()` → **what is the smallest value?**
- `np.max()` → **what is the largest value?**
- `np.argmin()` → **where is the smallest value?**
- `np.argmax()` → **where is the largest value?**
- they are also the reduction funcions liek the above 
- the arg ones give the index location of the min or max eleemnt present 
```
min  → value
max  → value

argmin → index
argmax → index
```
- min max with no axis arg or `axis=None` gives ou the scalar
- arg min max with no axis arg gives ou the scalar index
- because at this internally it is treated as flatten array
- so the arg min max without will give the index of the flattened artay not the actaul array index postion 
- return a **flat index**, not `(row, column)` coordinates.
- the axis whihc is given as parameter is reduced and the  omparing works as 
```
8   3   5
2   9   4
↓   ↓   ↓

```

```
min(8,2) = 2
min(3,9) = 3
min(5,4) = 4
```

- that  axis wise comparing 
- it may give the multiple values form different axis as the final result 
- it will give the axis index of the array wehre the vlaue is located not the exact location coordinate of it 
- it may differ as per the axis value
```
[[ 2  6  7]
 [92  3  0]
 [ 8 24 -1]] 

Shape a -> (3, 3)
Min -> [ 2  3 -1]
Shape x -> (3,)
Dtype -> int64 

Max -> [92 24  7]
Shape x -> (3,)
Dtype -> int64 

arg Min -> [0 1 2]
Shape x -> (3,)
Dtype -> int64 

arg Min -> [1 2 0]
Shape x -> (3,)
Dtype -> int64
```

- axis not found then axis error 

|Operation|`axis=None`|`axis=0`|`axis=1`|
|---|---|---|---|
|`min`|one minimum overall|minimum of each column|minimum of each row|
|`max`|one maximum overall|maximum of each column|maximum of each row|
|`argmin`|flat index of global minimum|row index for each column|column index for each row|
|`argmax`|flat index of global maximum|row index for each column|column index for each row|

- for the 3d axis 0 compares like the two block rows with each other and then in them compare the index wise elements  
- and arg min max give the rows where they are found not the coordinates 
- for the 3d axis 1 they will then compare rows in the speerae blocks internally 
- for the 3d axis 1 they will then compare rows in the speerae blocks internally and give the index of the rows where the max min fpund 
- remembrer the axis which is applied is removed in the ifnal result 
- for the 3d axis 2 they will compare the elemts in the each rows seperately in the speerae blocks internally and give calue of the   max min  
- for the 3d axis 2 they will compare the elemts in the each rows seperately in the speerae blocks internally and give the index of the rows where the max min fpund 
- we can do `keepdims=True` it will resuce the asked axis to 1 not removing it 
- we can use the negative axes alsso 
- we can reduce to the multiple axis aslo wiht `axis=(1,2`
 - if thr axis not exist axis error 
- but the arg min and max only takes one axis only other wise the typeerror 
- the positoin of axis matters like `0,1` and `1,0`
- These functions can also write results into an existing output array using `out=`.
```
result = np.empty(3)

np.min(A, axis=0, out=result)
```
- we can also use `where= condiotn ` it will only scan that 
- alsso `initial` 
- the empty gives out errors 
- when there is mulitple min or max values there is a tei so the arin will giv eht index of the first occurance 
- if ties in a axis index value then aslo teh first occurance 
- the argmin and max return integer valyes 
- use this if data contains nan vlaues
```
np.nanmin(x)
np.nanmax(x)

np.nanargmin()
np.nanargmax()
```

- same dtype return for min max and index for the arg min max 
- doesnr modify original 
- arg min max The returned indices are indices **along the reduced axis**.
- using all tha axis work like the scalar or axis = `None` 
- `argmin` and `argmax` return integer indices
- min and minimum are different 
- `np.min`

Reduction:
```
many values → one value per reduced position
```

- `np.minimum`
Element-wise comparison:
```
A[i] vs B[i] → result[i]
```
```
np.minimum(    [1, 7, 3],    [4, 2, 5])
```
```
[1, 2, 3]
```

- use for finiidng a column with max or min value `np.argmax(A, axis=0)`
- 

```
min    → smallest VALUE
max    → largest VALUE

argmin → INDEX of smallest
argmax → INDEX of largest

axis=None → reduce everything

axis=k → reduce dimension k

reduced axis disappears

keepdims=True → reduced axis stays as size 1

axis=-1 → last dimension

argmin/argmax with axis
→ index is along that axis

argmin/argmax without axis on N-D
→ flat index

ties
→ first occurrence

NaN
→ use nanmin/nanmax/nanargmin/nanargmax when NaNs
   should be ignored
```


```
sum      → value
mean     → value
std      → value
var      → value
min      → value
max      → value

argmin   → index
argmax   → index
```

```
→ → → → →
→ → → → →
→ → → → →
→ → → → →
```

- in arg min max : Indices refer to the reduced axis.
- 


----
---

# np.abs(), np.sqrt(), np.exp(), np.log()


```
np.abs()
np.sqrt()
np.exp()
np.log()
```

- they are the functions applied to all the eleemts of a array hence preserces the shave and these are not reduction fucntions 
- `abs` is the absolute value of each eleemnt  ie modulus 
```
|5|  = 5
|-5| = 5
|0|  = 0
```

- they preseres the sahpe 
- abs on complex numbers do :
- $$ [ |z| = \sqrt{3^2+4^2}=5 ] $$ 
- it doesnt modify the original 
- it is computed on eleemts so it give s a new object + new data 
- sqrt is fro calcualting the square root of the element 
- the sqrt can make the final output in float because of decimal digits 
- so dtype may not be preserced 
- negative values cant b ecomputed it givs a warning and make them `nan`
- it the dtyp eof array s explicitly complex it then converts them into the noraml form 
```
x = np.array([-1, 4], dtype=complex)
```
```
[0.+1.j, 2.+0.j]
```

- `exp` is to clacluate the exponent of the balues 
$$ [ e^x ] $$

where:

$$ [ e \approx 2.71828 ]$$
```
e^0 = 1
e^1 ≈ 2.718
e^2 ≈ 7.389
```

- it is element wise it cna give out float vlaues 
- negative values are valid for it 
$$[ e^{-1}=\frac{1}{e}\approx0.3679 ]$$
- the values generated are very high so that For example, with standard `float64`, values around `exp(1000)` are far too large to represent. we may get `inf`
- log is for caluating the log of values eleemt vise
- it makes negative as `nan`
$$ [ \ln(x) ]$$

That is logarithm with base:

$$ [ e ] $$

$$[ \ln(e)=1 ]$$
$$[ \ln(1)=0 ]$$


```
x = np.array([1, np.e, np.e**2])
```
```
np.log(x)
```
```
[0., 1., 2.]
```

- log of zero is `int`
- we can get `np.log10(x)` , `np.log2(x)` , 
- the log and exp are reverse 
$$[ e^{\ln(x)}=x ]$$

->> 
$$[ \ln(e^x)=x ] $$

```
np.abs(x) → |x|

np.sqrt(x) → √x

np.exp(x) → eˣ

np.log(x) → ln(x)
```

- they are unary element wise fucntions 
- they dont have any axis parameter they are element wise 
- it can convert dtype ot float as calcuation precision 
- There is no positive `+128` representable in `int8`. 
- abs can produce an overflow-related result rather than mathematically representing `128`.
- For small signed integer dtypes, `abs` can overflow at the most-negative value.


```
abs(nan) → nan
sqrt(inf) → inf
exp(-inf) → 0
log(inf) → inf
```
```
np.log(np.exp(1000))
```

- doing this breask because even they are complement of each other they still are calaculted brackedts out so the exp of 1000 will overflow out first causing error 
- `exp()` grows much faster 

```
x      eˣ
0      1
1      2.718
2      7.389
5      148.4
10     22026
```
```
log(1)     = 0
log(e)     = 1
log(e²)    = 2
log(e¹⁰)   = 10
```

```
REDUCTIONS
────────────────────────────
sum     → combine values
mean    → average
var     → variance
std     → standard deviation
min     → smallest value
max     → largest value
argmin  → location of smallest
argmax  → location of largest

ELEMENT-WISE MATH
────────────────────────────
abs     → |x|
sqrt    → √x
exp     → eˣ
log     → ln(x)
```

----
----
---

# np.clip()


- Force every value to stay within a specified minimum and maximum range.
- on each element it apply 
$$[ \operatorname{clip}(x, min, max) = \begin{cases} min & x < min\\ x & min \le x \le max\\ max & x > max \end{cases} ]$$
- So values **below the lower limit are raised**, values **above the upper limit are lowered**, and values already inside the range stay unchanged.
```
Allowed range = [0, 10]

-5  ──────→ 0
 2  ──────→ 2
 7  ──────→ 7
12  ──────→ 10
20  ──────→ 10
```

- it is element wise it operates on each eleemnt
- it doenst have any axis parameter 
- both boundaries upeer adn lower bound are inclusive 
$$[ [min,max] ]$$
```
lower bound
     ↓
x < min  → min

min ≤ x ≤ max → x

x > max → max
     ↑
upper bound
```

- the lowera nd upper bound can be arrays 
- they should be f the same size and shape 
- broadcasting on the bounds is applicable 

```
A = np.array([
    [1, 20, 3],
    [4, 50, 6]
])

lower = np.array([2, 10, 5])
```

- can aply for the the bounds as `NONE` only one of it so that it will only cange that 
- it is so that only one is enforced
- it doesnt sort , keeps the inranfe value as it as 
- it is no t normalization 
- it doenst modify original by defalult it 
- we can do the `out=x` x is the same or self variable to update it 

```
normal clip → doesn't modify x
out=x       → writes result into x
```

- it is not a view it is a computed result which will be a new data or out -> x or wwritten to data 
- if `a_min > a_max`? : The result behavior effectively forces values to the upper bound in this situation, producing:
- it will make all the value same as rh upeer bound then 
- it can be used in image processing as to range the pixel rgb values 
- 