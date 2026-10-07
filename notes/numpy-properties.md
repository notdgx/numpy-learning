# Topics 

- .shape, .ndim, .size, .dtype
- .T (transpose)
- .flat iterator
- internal working of it 


----

# ND array properties


```
a.shape
a.ndim
a.size
a.dtype
a.itemsize
a.nbytes
a.strides 
a.flags
```


| Property    | Importance | What it tells you                  |
| ----------- | ---------: | ---------------------------------- |
| `.shape`    |      ⭐⭐⭐⭐⭐ | Dimensions/size along each axis    |
| `.ndim`     |      ⭐⭐⭐⭐⭐ | Number of dimensions/axes          |
| `.size`     |      ⭐⭐⭐⭐⭐ | Total number of elements           |
| `.dtype`    |      ⭐⭐⭐⭐⭐ | Data type                          |
| `.T`        |      ⭐⭐⭐⭐⭐ | Transposed array                   |
| `.itemsize` |       ⭐⭐⭐⭐ | Bytes per element                  |
| `.nbytes`   |       ⭐⭐⭐⭐ | Data memory usage                  |
| `.strides`  |         ⭐⭐ | Memory steps between elements      |
| `.flags`    |         ⭐⭐ | Memory/layout properties           |
| `.base`     |         ⭐⭐ | Underlying array/view relationship |
| `.flat`     |         ⭐⭐ | Flat iterator                      |
| `.real`     |          ⭐ | Real part of complex array         |
| `.imag`     |          ⭐ | Imaginary part                     |


----

# numpy properties

- Python does not execute NumPy's C code itself. Python calls already-compiled native C code through an interface.

```
Python
  ↓
"multiply this NumPy array by 2"
  ↓
NumPy C/C++ implementation
  ↓
tight native loop
  ↓
CPU
```

- numpy provides a extension to the python it internally uses the teh interpreter to hep to execute the c code as interpreter itself is c written it can call compiled libraries

```
                 PYTHON
                   │
                   │  np.array()
                   │
                   ▼
        ┌─────────────────────┐
        │ NumPy Python API    │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Compiled native     │
        │ NumPy code          │
        │ (.so / .pyd etc.)   │
        └──────────┬──────────┘
                   │
                   ▼
                  CPU
```

- the numpy code is already compiled it just takes input via the python interface and just calculate the vales
```
Python:

add(10, 20)
     │
     ▼
Python → C bridge
     │
     ▼
C function
     │
     ▼
CPU
     │
     ▼
30
     │
     ▼
Python object
```

- the numpy is much faster then looping because it is internally c array that is contigeous 

```
Memory:

┌────┬────┬────┬────┐
│ 1  │ 2  │ 3  │ 4  │
└────┴────┴────┴────┘

NumPy ndarray
┌─────────────────────┐
│ data pointer ───────┼──────→ [1][2][3][4]
│ shape               │
│ dtype               │
│ strides              │
│ dimensions           │
└─────────────────────┘
```

- numpy is C-like memory + Python object/interface
- the array size is fixed 
- they are mutable but not extensible 
- the memeory is unchangable unextensiable but the python interfaced the pointer can be chnaged ie pythojn onject pointer can refer to a new memory now 
- the eleemnt size is similar andd samae 
- it takes up the largest dataype of ement in a array
- it can have direct indexing like c 
- python can help in negative indexinx also 
- it supprts python like slicing 
- it has shape that tell about the rows columns or even higher dimention shape of the array
- it has the c like datatypes 
```
np.int8
np.int16
np.int32
np.int64

np.float32
np.float64
```
- it supports vectorized operation , broadcasting,
- in python doing its type it gives `numpy.ndarray` beacause there is a python object wrapper controllin the actual c memeory arrays 
- from user prespective the garbage collection is python like it manages it internall we can explicitlly do also `del`

----

|Property|Python list|NumPy array|C array|
|---|--:|--:|--:|
|Python object|✅|✅|❌|
|Native contiguous data|❌|✅ usually|✅|
|Fixed element type|❌|✅|✅|
|Fixed element size|❌|✅|✅|
|Fixed array size|❌|✅|✅|
|Mutable|✅|✅|✅|
|`a[0]`|✅|✅|✅|
|Negative indexing|✅|✅|❌|
|Slicing|✅|✅|❌ built-in|
|Slices can share memory|❌ generally|✅|manually possible|
|`.shape`|❌|✅|❌|
|`.dtype`|❌|✅|type known from declaration|
|`.nbytes`|❌|✅|manually calculate|
|Garbage collection|✅|✅|❌|
|`append()`|✅|❌|❌|
|Vectorized math|❌|✅|❌ built-in|
|Broadcasting|❌|✅|❌|
|Pointer access|❌ normally|✅ possible|✅|
|Native compiled operations|❌|✅|✅|


----

- reassignment in the same varaible can free the internall memeory of the array it that has no references , ie ref count is now zero  
```
Before:

a ──────→ Array A
           [1][2][3]


After:

a ──────→ Array B
           [10][20][30][40]

Array A
   ↓
no references
   ↓
Python/NumPy can release its memory
```

- appending 

```
a = np.array([1, 2, 3])

a = np.append(a, 4)
```

conceptually does:

```
old:
a ──→ [1][2][3]

        ↓ create new allocation

new:
a ──→ [1][2][3][4]

old array
    ↓
no references
    ↓
released eventually
```

- So **`np.append()` does not grow the original array in-place like a dynamic C++ vector might.**
- deleting aslo creates a new array 
### View 

- but many operation returns a veiw of like slicing 
- any operatoin on dta like changing it not typecasting doenst canhge the underlining array 

### < Un 

- it meand the max unicode points each element is holding 

```python
import numpy as np

a = np.array(["hello", "world"])

print(a.dtype)
```

```
<U5
```

The parts mean roughly:

```
< U 5
│ │ │
│ │ └── 5 Unicode characters
│ └──── Unicode
└────── byte order
```

- the unicode points is 4 bytes per unicode point 
- it is the unicode is 4bytes defining the each eleemt max size for a character and the n is defining the no of charachters in each eleemt of the array 
- if we explicitly defined the dtype less than we actully put in it it just trucate it 
- the `S32` the s is raybytes storage unit for hte each element 
- when we ahve thedtype to the objects then numpy is not stoeing it in the c style memory instead it is referin g to the python datatypes or ref objects which is slow 
- we can have whatever the < Un because n is the max unicode code points 
```
<U35 → 35 × 4 = 140 bytes/element
<U64 → 64 × 4 = 256 bytes/element
<U128 → 128 × 4 = 512 bytes/element

S35 → 35 bytes/element
S64 → 64 bytes/element
S128 → 128 bytes/element
```

- it is different from the utf-8 endcodign as it takes a fixed sized unicode point to acclmate it it of 4bytes to keep the fixed size property 

```
[4 bytes][4 bytes][4 bytes][4 bytes]

1. Unicode  → WHAT character is it?
2. UTF-8    → HOW do we encode that character into bytes?
3. NumPy <U64 / S64 → HOW NumPy stores strings in an array
```

| Character | Code point | UTF-8 size |
| --------- | ---------: | ---------: |
| `A`       |     U+0041 |     1 byte |
| `é`       |     U+00E9 |    2 bytes |
| `€`       |     U+20AC |    3 bytes |
| `😀`      |    U+1F600 |    4 bytes |

|dtype|Meaning|Storage per element|
|---|---|--:|
|`<U1`|1 Unicode code point|4 bytes|
|`<U10`|10 Unicode code points|40 bytes|
|`<U64`|64 Unicode code points|256 bytes|
|`S1`|1 byte|1 byte|
|`S10`|10 bytes|10 bytes|
|`S64`|64 bytes|64 bytes|
![[Pasted image 20261006214950.png]]

- UTF-8 is variable-width; the number of bytes depends on the code-point range.
- python supports to store the uicode characters inside the numpy array in c like memeory but the c memory dont understand for it it is just raw bytes
- most of the charaters take only one code point but there can be some that cna even take 2 code points 
- **accented character created using a combining mark**:

```
é
```

It looks like one `é`, but can actually be:

```
e  +  ◌́
│      │
│      └── U+0301  COMBINING ACUTE ACCENT
└───────── U+0065  LATIN SMALL LETTER E
```
```
"é" = 2 Unicode code points

"é"       → 2 code points → needs <U2
"😀"       → 1 code point → fits <U1
"👨‍👩‍👧‍👦" → multiple code points → needs a larger U size

```

- Even though visually you see **one character**.
- Fixed-width integers have limited ranges. they can overllwo loke int8 overflowing 

```
np.nan
np.inf
-np.inf

1 / 0 → inf
0 / 0 → nan
```
```
np.nan == np.nan
> False
```

- a array with zero eleemts is still a valid array 
- zero dimenstion arrays also exists 

```
                         precision / size →
              8-bit       16-bit       32-bit       64-bit
           ┌──────────┬────────────┬────────────┬────────────┐
bool       │          │            │            │            │
           ├──────────┼────────────┼────────────┼────────────┤
uint       │ uint8    │ uint16     │ uint32     │ uint64     │
           ├──────────┼────────────┼────────────┼────────────┤
signed     │ int8     │ int16      │ int32      │ int64      │
           ├──────────┼────────────┼────────────┼────────────┤
float      │ float16  │            │ float32    │ float64    │
           ├──────────┼────────────┼────────────┼────────────┤
complex    │ complex32*│           │ complex64  │ complex128 │
           └──────────┴────────────┴────────────┴────────────┘

* availability/details depend on NumPy/platform/version
```

- castings / promptoons 

```
bool + int8   → int8
bool + int32  → int32
bool + uint8  → uint8
```
```
int64 + uint64 → Float64

- the exact result can depend on whether you're dealing with NumPy scalars, 0-D arrays, Python scalars, and the specific operation**, especially under NumPy 2.x's changed scalar-promotion rules
```
```
uint8 + uint16 → uint16
uint16 + uint32 → uint32
uint32 + uint64 → uint64
```
```
int8 + int16 → int16
int16 + int32 → int32
int32 + int64 → int64
```
```
int8 + float32  → float32
int32 + float32 → float64   ← important
int64 + float64 → float64
```
- Because `float32` cannot exactly represent every possible `int32` value, so NumPy can choose a wider floating type.

```
float16 + float32 → float32
float32 + float64 → float64
```
```
float32 + complex64 → complex64
float64 + complex128 → complex128
```

```
bool
 ↓
int
 ↓
float
 ↓
complex
 ↓
string
 ↓
object
```

|Input A|Input B|Typical promoted dtype|
|---|---|---|
|`bool`|`bool`|`bool`|
|`bool`|`int8`|`int8`|
|`bool`|`uint8`|`uint8`|
|`int8`|`int16`|`int16`|
|`uint8`|`uint16`|`uint16`|
|`int8`|`uint8`|`int16`|
|`int16`|`uint16`|`int32`|
|`int32`|`uint32`|`int64`|
|`int64`|`uint64`|problematic → wider type needed|
|`int32`|`float32`|`float64`|
|`int64`|`float64`|`float64`|
|`float16`|`float32`|`float32`|
|`float32`|`float64`|`float64`|
|`float32`|`complex64`|`complex64`|
|`float64`|`complex128`|`complex128`|

- multipdimenstion epty array can exist
- we can do `a.flags.writeable = False` to make it read only modifing gives a error 


# View vs Copy vs DeepCopy

## Assignment

```python
a = np.array([10, 20, 30])
```
```
Python variable
      a
      │
      ▼
┌──────────────┐
│ ndarray      │  ← array object
│ shape        │
│ dtype        │
│ strides      │
└──────┬───────┘
       │
       ▼
┌────────────────┐
│ 10 │ 20 │ 30   │  ← actual data buffer
└────────────────┘
```


```
a = np.array([10, 20, 30])
b = a
```

**No copy happens.**
Both variables point to the **same ndarray object**.

```
a ─────┐
       ▼
   ndarray
       │
       ▼
 [10 20 30]
       ▲
       │
b ─────┘
```

- change in one reflect in other 
- `a is b` is `True` 

## View 

```
a = np.array([10, 20, 30, 40])
b = a[1:3]
```

A **new ndarray object** is created, but it shares the **same data buffer**.

```
             ┌──────────────┐
a ──────────►│ ndarray A    │
             └──────┬───────┘
                    │
                    ▼
             ┌─────────────────┐
             │ 10  20  30  40  │
             └─────────────────┘
                   ▲     ▲
                   │     │
             ┌─────┴─────┴───┐
b ──────────►│ ndarray B     │
             └───────────────┘
```

`b` is a **view**.

```
b[0] = 999
```

Result:

```
a → [10, 999, 30, 40]
b → [999, 30]
```

But:
```
a is b
```
→ `False`

They are different ndarray objects.

Yet:
```
np.shares_memory(a, b)
```
→ `True`


----
## Copy 

`b = a.copy()`

```
a = np.array([10, 20, 30])
b = a.copy()
```

Now you get:

```
a ──► ndarray A ──► [10 20 30]

b ──► ndarray B ──► [10 20 30]
```

Two separate buffers.

```
b[0] = 999
```

Results:

```
a → [10 20 30]
b → [999 20 30]
```

So:

```
a is b
```

→ `False`

and:

```
np.shares_memory(a, b)
```

→ `False`

For a normal numeric ndarray, this is effectively an **independent copy of the array data**.

-----------

Copy - > Fancy indexing, boolean indexing, flatten()
View - > Slicing, reshape() , ravel()


| Code                 | New ndarray? | New data buffer? | Changing result affects original? |
| -------------------- | ------------ | ---------------- | --------------------------------- |
| `b = a`              | ❌            | ❌                | ✅                                 |
| `b = a[:]`           | ✅ usually    | ❌ usually        | ✅                                 |
| `b = a[1:3]`         | ✅            | ❌ usually        | ✅                                 |
| `b = a[[1,3]]`       | ✅            | ✅                | ❌                                 |
| `b = a[a > 2]`       | ✅            | ✅                | ❌                                 |
| `b = a.copy()`       | ✅            | ✅                | ❌                                 |
| `b = a.reshape(...)` | ✅            | ❌ often          | often ✅                           |
| `b = a.flatten()`    | ✅            | ✅                | ❌                                 |
| `b = a.ravel()`      | ✅            | ❌ if possible    | often ✅                           |
| `b = a.astype(...)`  | ✅            | ✅ usually        | ❌                                 |
|                      |              |                  |                                   |
| s                    |              |                  |                                   |

------------
----

# Dimensions

### 0D — scalar

```
a = np.array(5)
```

```
5
```

```
ndim  = 0
shape = ()
size  = 1
```

- no axis 

### 1D — vector

```
a = np.array([10, 20, 30, 40])
```

```
[10 20 30 40]
```

```
ndim  = 1
shape = (4,)
size  = 4
```

There is **one axis**:

```
        axis 0
          ↓
[10 20 30 40]
```

### 2D — matrix/table

```
a = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

```
       axis 1 →
       0  1  2
axis 0
  ↓    1  2  3
       4  5  6
```
```
axis 0 ↓

1 2 3
4 5 6

axis 1 →
```

```
ndim  = 2
shape = (2, 3)
size  = 6
```

Meaning:

```
axis 0 → 2 elements
axis 1 → 3 elements
```

So `(2, 3)` means:

> 2 rows × 3 columns.


---

### 3D

Example:

```
a = np.zeros((2, 3, 4))
```

Think of it as **2 matrices**, each `3 × 4`:

```
axis 0
  ↓

Layer 0:
[ ][ ][ ][ ]
[ ][ ][ ][ ]
[ ][ ][ ][ ]

Layer 1:
[ ][ ][ ][ ]
[ ][ ][ ][ ]
[ ][ ][ ][ ]
```

```
ndim  = 3
shape = (2, 3, 4)
size  = 2 × 3 × 4 = 24
```

Axes:

```
axis 0 → 2
axis 1 → 3
axis 2 → 4
```

---

### 4D

```
a = np.zeros((2, 3, 4, 5))
```

Now:

```
ndim  = 4
shape = (2, 3, 4, 5)
size  = 120
```

You can think:

```
2 groups
 └── each has 3 groups
      └── each has 4 groups
           └── each has 5 elements
```

The visualization becomes difficult, but the **mathematical concept is exactly the same**.


----

# Axis 

- An axis is a **direction along which you can move/index**

```
shape       ndim       axes
(5,)         1         axis 0
(2,3)        2         axis 0, axis 1
(2,3,4)      3         axis 0, axis 1, axis 2
(2,3,4,5)    4         axis 0...axis 3
```
```
axis 0 → first dimension
axis 1 → second dimension
axis 2 → third dimension
axis 3 → fourth dimension
```

## 2D 

```
axis 0 ↓

1 2 3
4 5 6

axis 1 →
```

## 3D

```
(2, 3, 4)
 │  │  │
 │  │  └─ axis 2 has 4
 │  └──── axis 1 has 3
 └─────── axis 0 has 2
```

## AXIS EMEMENTS 
### 1D

```
[ elements ]
```

### 2D

```
[ [elements],
  [elements] ]
```

### 3D

```
[
  [ [elements],
    [elements] ],

  [ [elements],
    [elements] ]
]
```

### 4D

Another layer around that.

----
- operation will be performes along where how the indexing of the elements are going on 