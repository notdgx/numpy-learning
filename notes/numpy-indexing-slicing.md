# Topics

- Basic indexing
- Slicing with [start:stop:step]
- Boolean indexing / masking
- Fancy indexing (array of indices)
- np.where()


----
---
---
# Indexing 

- accessing the element from a array that can be multipdimensional 
- index starts form 0 here and go from n-1 
- where n is size 
- negative indexing allowes 
- use this `:` to access full of the dimenstion elemnts
- use `...` to maek like all remaiing dimesions 
- we can access everyrhing rowwise column wise and gropup wise with mixture of these 
- for a single eleement it usually returns the numpy scalar 
- oterwise a view 
- 


# Slicing

- it is to extract a portion from a array 
- it uses `start : stop : step`
- stop is excluded 
- start included 
- for 1D array `a[0:3]`
- for 2D array `a[0:2, 1:3]`
- for nD array `a[0th,1st, ... ]`
- use `:` to include all the eleemts of the dimestion or skip slicing and telling it all 
- use `...` for all the remaining unspecified axis 
- they are not new memeory they are a view 
- new object -> shared data
- 
# Boolean Indexing

- it aslo creates a new obejct with new data
```
a ─────► original data

b ─────► separate data
```
- the boolean mask created is also a new nd array of the same shape ad the intented array of boolean values 


- arthemetic operations is performed over the actal data 
- `x.copy()`  creates a new independednt data and its connected object 


- it creates a new mask array ith boolen values according to the mask condition
- shape of the mask and the arrray is similat 
```
a.shape       = (5,)
mask.shape    = (5,)
```
- we cna create a custom mask arrays and apply thme in the for a axis ie row axis for column asix lie `a[:,mask]` 
- The meaning of the mask depends on what part of the indexing expression it is applied to.
- we can do both eleemt wise mask and the axis wise masks
-  the custom mask shape shoulw match the axis on which it is applied to 
- we can do multipe mask conditions but the shapes must be match 
- it uses the `&` and `|` `!`not the not and or fro multiple conditionsa
- we can use multiplee conditos in a masl `a[(a >= 20) & (a <= 40)]`
- it can aslo modif the data like 
```
a = np.array([10, 20, 30, 40, 50])

a[a > 30] = 0
```
```
Boolean indexing
      ↓
filtering data
      ↓
data preprocessing
      ↓
remove invalid values
select samples
threshold values
handle missing/outlier data
      ↓
AI / ML
```
- it reduce to 1D when conditonal mask for each element 
- 
# np Scalars 

- they are rhe one single valuse that uses a numpy data type 
- like one eleement in the nth axis where n is dimesion 
- these are of tjhe numpy defkined datatypels like int 64 ... 
- and the data created in these type a singke data element is a scalar 

|NumPy dtype|NumPy scalar|
|---|---|
|`int32`|`np.int32`|
|`int64`|`np.int64`|
|`float32`|`np.float32`|
|`float64`|`np.float64`|
|`bool`|`np.bool_`|
|`complex64`|`np.complex64`|

- they are differnt from a 1 elemet array ie 1eleement array : `[1]`
- `x = a[1]` gives a scalar value not a view 

```
0D
scalar
    10


1D
vector
    [10 20 30]


2D
matrix
    [10 20 30
     40 50 60]


3D
tensor
    [
      [10 20 30
       40 50 60]

      [70 80 90
       100 110 120]
    ]


4D
tensor
    collection of 3D tensors


5D
tensor
    collection of 4D tensors
```


# Fancy indexing

- we can pass a colllection like list of indexes to a array and it will only fetch that elemets as the specified inedexes 
- it gvies a new nd array obejct wth indeependednt new data 
```
new ndarray object
+
new independent data
```

- syntax 
```
a[[index1, index2, index3]]
```

- instead of asking a range it asks give me these postions elemets 
- we can repeat the indexes 
- works wiht the negative indexes also
- for multpdimestion we can do `a[:,[1,2]]`
- but for where not `:` like `a[[0, 1, 2], [0, 1, 2]]`
- it actully does 
```
row indices:    [0, 1, 2]
column indices: [0, 1, 2]

pairs:

(0,0) → 10
(1,1) → 50
(2,2) → 90
```

- does **not** mean every combination of those rows and columns.
- It means Pair the corresponding indices.
- it doesnt not return a view ir creates a new aarray with different data and object 
- for doing `a[:,[x,y]]` is same as `a[:,[x,y],:]` 
- for doing `a[[x,y]]` is same as `a[[x,y],:,:]` 
- fancy indexing can aslo be used in assignmets 


```
INDEXING
│
├── Single index
│      a[2]
│      → one element
│
├── Slicing
│      a[2:8]
│      → continuous section
│      → usually VIEW
│
├── Fancy indexing
│      a[[2,5,7]]
│      → specific positions
│      → COPY
│
└── Boolean indexing
       a[a > 50]
       → condition-based selection
       → COPY
```

# where()


- "Where is the condition True?" and can either give you the positions or choose between two values.
- it gives you the opposite of the above it doenst give eleemts but it gives the postition where they are present if they 

```python
np.where(condition)

OR 

np.where(condition, x, y)


----

import numpy as np

a = np.array([10, 20, 30, 40, 50])

np.where(a > 25)
```
```
(array([2, 3, 4]),)
```

- `np.where(condition)` it find postions 
- it retiuns a tuple axis wise index tupe

```
(array([2, 3, 4]),)
```

- The outer `(...)` represents a **tuple**.
```
tuple
  ↓
axis 0 indices
  ↓
[2 3 4]
```

- for a 2D array iti gives 

```
(array([1, 2, 2, 2]),
 array([2, 0, 1, 2]))
 
 |
 *
 
(row, column)

(1,2) → 60
(2,0) → 70
(2,1) → 80
(2,2) → 90
```
```
rows, cols = np.where(a > 50)
```

- where gives the indexed and the normal masking gives the values 

- `np.where(condition, x, y)` — choose values
- `np.where(a > 25, 100, 0)`
- If `a > 25` is True → use `100`
- Otherwise → use `0`
- for true first value for false last value
- it doesnt modify the original 
- it creates a new array with new data and array object
```
a[a > 50]
       ↓
matching VALUES

np.where(a > 50)
       ↓
matching POSITIONS

np.where(a > 50, 1, 0)
       ↓
NEW ARRAY with conditional VALUES
```

```
a = np.array([10, 20, 30, 40])

np.where(a > 25, a * 10, a)
```

|Characteristic|`np.where()`|
|---|---|
|**Purpose**|Find matching positions or choose values conditionally|
|**Input**|Boolean condition; optionally `x` and `y`|
|**Return type**|Tuple of index arrays OR `ndarray`|
|**Shape**|Index arrays contain one coordinate per match; 3-argument form follows broadcasting|
|**View/copy**|3-argument result is a new array, not a view of the input|
|**Original modified?**|❌ No|
|**dtype**|Depends on `x` and `y` and type promotion|
|**Axis behavior**|1-argument form returns coordinates for each axis|
|**Important parameters**|`condition`, `x`, `y`|
|**Gotchas**|`where(condition)` returns positions, not values|
|**Practical use**|Conditional replacement, classification, finding coordinates|
|**ML importance**|⭐⭐⭐|

