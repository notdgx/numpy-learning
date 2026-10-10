# Topics 

- np.sort(), np.argsort()
- np.unique()
- np.searchsorted()


|Function|Main question it answers|
|---|---|
|`np.sort()`|**“What does my data look like when sorted?”**|
|`np.argsort()`|**“In what index/order should I arrange my data to sort it?”**|
|`np.unique()`|**“What distinct values exist, and optionally where/how often do they occur?”**|
|`np.searchsorted()`|**“Where should this value be inserted into an already-sorted array?”**|


|Property|`sort`|`argsort`|`unique`|`searchsorted`|
|---|---|---|---|---|
|Purpose|Sort values|Get sorting indices|Find distinct values|Find insertion positions|
|Input|Array-like|Array-like|Array-like|Sorted 1-D array + values|
|Return|ndarray|integer ndarray|ndarray / tuple|integer / ndarray|
|Shape|Usually same|Same|Depends on uniqueness/axis|Follows `v`|
|View/copy|New sorted result|New index array|New result(s)|Position result|
|Modifies original?|No|No|No|No|
|Axis|Yes|Yes|Yes|No axis parameter|
|Main parameters|`axis`, `kind`, `stable`, `order`, `descending`|Same family|`axis`, `return_*`, `equal_nan`, `sorted`|`side`, `sorter`|
|Key idea|Values|Indices|Distinctness|Insertion location|
|Major gotcha|axis / NaN / stability|confusing indices with values|axis changes meaning|input must be sorted unless `sorter` used|



---
---


# np.sort()

```
np.sort(a, axis=-1, kind=None, order=None, *, stable=None, descending=<no value>)
```

- `np.sort()` returns a **sorted copy** of an array. The result has the same shape and type as the input array.
```
• ranking values
• displaying data in order
• preparing data for searching
• finding ranges / ordering
• sorting scores
• preprocessing numerical data
• sorting rows/columns

```
- it gives rhe sorted value 

- the argsort gives the indexes so to be arranges to form sorted array 
- so it can be helpful in creating a index map of sorted values 
- it doesnt modifies the original 
- it gives a computed sorted array 
- defalut sorting is `-1` 
- if `None` then it first flattems and then sort 
- for the `1` it sort across the colums for a 2d array
- for the `2` it sort across the rows for a 2d array
- if axis not found then axis error
- it doesnt change the shape it is not reduction fn 
- it handels the duplicate values normally it doens t remove them 
- numpy can apply the dictionary styled sorting on the stricns too 
- for boolean `False  <  True` 
- NumPy nevertheless defines a sorting order for complex values **lexicographically**:
	1. compare real parts
	2. if equal, compare imaginary parts
- for if `Nan` present they will be sent to the back of the array even if asc or decending sort 
- by default `descending=False` do `descending=True` for descendng it doesnt works though 
- we can choose form the type of sortings with `kind`
```
kind='quicksort'
kind='heapsort'
kind='mergesort'
kind='stable'
```

|Algorithm|Typical speed|Worst case|Extra workspace|Stable?|
|---|--:|--:|--:|---|
|`quicksort`|1|O(n²) in the documented algorithm table|0|❌|
|`heapsort`|3|O(n log n)|0|❌|
|`mergesort`|2|O(n log n)|~n/2|✅|
|`timsort`|2|O(n log n)|~n/2|✅|

- stabel is the type of sort that preserves the original order among equal scores

```
score   name
90      Alice
70      Bob
90      Charlie
70      David
```
```
70 Bob
70 David
90 Alice
90 Charlie
```
```
np.sort(a, stable=True)
```
- NumPy notes that `stable` automatically chooses the best stable sorting implementation for the data type.
- `stabel=True` the stable meand the stable sort and they both cant be provided alsongside 
- NumPy notes that `stable` automatically chooses the best stable sorting implementation for the data type.
- order is to which field to sort by 
```
dtype = [
    ('name', 'U10'),
    ('age', int),
    ('height', float)
]
```
```
EACH RECORD :---> (name, age, height)
```
```
np.sort(a, order='height')
```
- the `order=['age', 'height']` orders can be multiple 
- it is not a efficent way of finding the min and max after sorting
- Don't perform a full sort when you only need one statistic.
- NumPy says that `sort` may create a temporary copy if needed to make data contiguous along the sorting axi
- for the empty arrays no thing to do thus no value 
- one element just give bact that 
- already sorted array just give it back after algorithim 
- repeated values + stable sort 
```
score    original position
90       A
80       B
90       C
80       D
```

```
80 B
80 D
90 A
90 C
```

|What do you need?|Use|
|---|---|
|Completely sorted values|`np.sort()`|
|Indices that produce sorted order|`np.argsort()`|
|Only smallest value|`np.min()`|
|Only largest value|`np.max()`|
|Distinct values|`np.unique()`|
|Only top/bottom portion/order statistic|`np.partition()`|
|Position where value belongs in sorted data|`np.searchsorted()`|

```
1. np.sort() returns a sorted copy.
2. Original array is not modified.
3. Shape normally stays the same.
4. Default axis = -1.
5. axis=0 sorts vertically.
6. axis=1 sorts horizontally.
7. axis=None flattens then sorts.
8. duplicates remain.
9. dtype is preserved.
10. descending=True gives descending order in current NumPy.
11. stable=True preserves relative order of equal keys.
12. NaNs have special placement.
13. structured arrays can use order=.
14. np.sort() gives values, not indices.
15. a.sort() is the in-place alternative.
```



|`np.sort()`|`np.argsort()`|
|---|---|---|
|Gives|Sorted values|Indices/order|
|Type|ndarray|integer ndarray|
|Main purpose|Get sorted data|Get sorting arrangement|
|Called|Direct sort|Indirect sort|
|Useful for related arrays|Less directly|**Extremely useful**|
|Result shape|Same as input|Same as input|
|Original array|Not modified|Not modified|
|Axis|Yes|Yes|

---
---

# np.argsort()

- i**t gives you the indices that would produce the sorted order**.
- it return a ndarray of the indexes of rhe same shape 
- useful in handleing the other fields of data id one is sorted 
- do the stable true oto preserve the relative order of the eaual vlaues 

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[30 10 20 10 30 10 10  3 32  3] 

[ 3  3 10 10 10 10 20 30 30 32] 

Shape -> (10,) 

[7 9 5 1 6 3 2 0 4 8] 

Shape -> (10,)
```
						|
```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[30 10 20 10 30 10 10  3 32  3] 

[ 3  3 10 10 10 10 20 30 30 32] 

Shape -> (10,) 

[7 9 1 3 5 6 2 0 4 8] 

Shape -> (10,)
```

- 
---
---
# np.unique()

- give array after removing all the duplictes values
- the result is sorted by defalut 
```
original → [4, 2, 4, 3, 2, 4]
unique   → [2, 3, 4]
```
- `return_index=True` for get the index of the first occurance of the each unique eleemnt 
```
unique values → [2, 3, 4]
first index   → [1, 3, 0]
```
- `return_counts=True` :This tells you **how many times each unique value occurs**.

```
a = np.array([4, 2, 4, 3, 2, 4])
np.unique(a, return_counts=True)
```

-  `return_inverse=True`  : For every original element, which position in the unique-values array represents it?

```
a = np.array([4, 2, 4, 3, 2])
values, inverse = np.unique(a, return_inverse=True)
--->>

values  = [2, 3, 4]
inverse = [2, 0, 2, 1, 0]
```


```
a = np.array([4, 2, 4, 3, 2])

values, indices, inverse, counts = np.unique(
    a,
    return_index=True,
    return_inverse=True,
    return_counts=True
)
```
```
values
[2 3 4]

indices
[1 3 0]

inverse
[2 0 2 1 0]

counts
[2 1 2]
```
- for the d arraus it make them 2d output and think all of as elements 
- if axis is added then the unique treat that axis each element as a element to compare with 
```
[1, 2]
[1, 2]
[3, 4]
```
```
[
    [1, 2],
    [3, 4]
]
```

- empty arrays emptt no error 
- all unique then the single vlaue and the ref count as per if enabled 
- `Nan` is considered asn a sinfel vlaue so only one nan is and gives only one nan
- by defalult axis none default check all values flatten like behavviour 
- returns answer in tuple if the argments are True like return index ... 


---
---

# np.searchsorted()

- Find the index where the new value can be inserted while maintaining sorted order.
- it answers : “In this sorted array, at what index should I insert this value so that the array stays sorted?”

```
index:   0   1   2   3
value:  10  20  30  40
                 ↑
              insert 25
```

- the array should be sorted already 
- it did nt give error but a index for the postion it cna be placed if it was already sorted
- if th evalue already exist then it will give the forst or lefted index postion where it cna be added  
- `side='left'` : the **leftmost valid insertion position**.
- `side='right'` : the **rightmost valid insertion position**.
- we cna search multiple vlaues like : `np.searchsorted(a, [5, 15, 35, 50])`
- smaller than anything -> beg and if larger than anything then -> end 
- anything to be in a empty array gives rhe `0` index to be placed 
- it inly works on a 1d array onle
```
a = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

np.searchsorted(a[0], 25)
```

```
np.argsort()
      ↓
find the sorting order

np.searchsorted(..., sorter=...)
      ↓
search inside that sorted order
```

- it doenst modifie the array 
---
---


```
NUMPY SORTING & SEARCHING — CHEAT SHEET
=======================================

1. np.sort(a) — SORT VALUES
---------------------------
Purpose      : Arrange values in sorted order.
Returns      : New ndarray.
Original     : NOT modified.
Shape        : Preserved when sorting along an axis.
dtype        : Normally preserved.
Duplicates   : Retained.
Default axis : -1 (last axis).

Example:
    a = np.array([40, 10, 30, 20])
    np.sort(a)                 # [10, 20, 30, 40]

AXIS:
    axis=0   -> Sort along first axis.
               2D: sort each column.
    axis=1   -> Sort along second axis.
               2D: sort each row.
    axis=-1  -> Sort along last axis (default).
    axis=None-> Flatten everything, then sort.

IMPORTANT PARAMETERS:
    descending=True -> Descending order (NumPy 2.5+).
    stable=True     -> Preserve relative order of equal values.
    kind=           -> Sorting algorithm.

GOTCHAS:
    np.sort(a) -> Returns sorted copy.
    a.sort()   -> Sorts original array in place.
    Sorting does NOT remove duplicates.


2. np.argsort(a) — SORTING INDICES
----------------------------------
Purpose      : Get indices that would sort the array.
Returns      : Integer ndarray.
Original     : NOT modified.
Shape        : Same as input when sorting along an axis.
Default axis : -1 (last axis).

Example:
    a = np.array([40, 10, 30, 20])
    np.argsort(a)              # [1, 3, 2, 0]
    a[np.argsort(a)]           # [10, 20, 30, 40]

AXIS:
    axis=0    -> 2D: indices for sorting each column.
    axis=1    -> 2D: indices for sorting each row.
    axis=-1   -> Last axis.
    axis=None -> Flatten first; returns flat indices.

IMPORTANT PARAMETERS:
    stable=True     -> Preserve order of equal values.
    descending=True -> Descending sorting indices (NumPy 2.5+).
    kind=           -> Sorting algorithm.

PRACTICAL USE:
    marks = np.array([70, 95, 60])
    names = np.array(["A", "B", "C"])
    idx = np.argsort(marks)
    names[idx]                 # ["C", "A", "B"]
    marks[idx]                 # [60, 70, 95]

GOTCHAS:
    Returns indices, NOT sorted values.
    Indices refer to original positions.
    With axis=None, indices are flat indices.
    Use a stable sort if equal-value ordering matters.


3. np.unique(a) — DISTINCT VALUES
---------------------------------
Purpose      : Remove duplicate values.
Returns      : 1D ndarray by default.
Original     : NOT modified.
Shape        : Usually smaller; default output is 1D.
Order        : Sorted by default.
Duplicates   : Removed.

Example:
    a = np.array([4, 2, 4, 3, 2, 4])
    np.unique(a)               # [2, 3, 4]

IMPORTANT PARAMETERS:
    return_index=True
        -> First occurrence indices in original array.

    return_inverse=True
        -> Indices mapping original values to unique values.

    return_counts=True
        -> Frequency of each unique value.

    axis=0
        -> Find unique rows in a 2D array.

    axis=1
        -> Find unique columns in a 2D array.

    equal_nan=True
        -> Treat NaNs as one unique value (default in
           current NumPy).

EXAMPLES:
    a = np.array([4, 2, 4, 3, 2])

    np.unique(a, return_index=True)
    # values: [2, 3, 4]
    # indices: [1, 3, 0]

    np.unique(a, return_counts=True)
    # values: [2, 3, 4]
    # counts: [2, 1, 2]

    values, inverse = np.unique(a, return_inverse=True)
    values[inverse]            # Reconstructs original a.

GOTCHAS:
    Does not preserve first-seen order by default.
    Nearly equal floats are not automatically duplicates.
    axis changes the items being compared (rows/columns).
    Object/structured dtypes have some axis limitations.


4. np.searchsorted(a, v) — INSERTION POSITION
---------------------------------------------
Purpose      : Find where v belongs in sorted a.
Input a      : Sorted 1D array (normally ascending).
Returns      : Integer scalar or integer ndarray.
Original     : NOT modified.
Axis         : No axis parameter.
Output shape : Follows the shape of v.

Example:
    a = np.array([10, 20, 30, 40])

    np.searchsorted(a, 25)     # 2
    np.searchsorted(a, 5)      # 0
    np.searchsorted(a, 50)     # 4

    np.searchsorted(a, [5, 15, 35, 50])
    # [0, 1, 3, 4]

IMPORTANT PARAMETER: side
    side="left"  -> Insert before equal values (default).
    side="right" -> Insert after equal values.

DUPLICATE EXAMPLE:
    a = np.array([10, 20, 20, 20, 30])

    np.searchsorted(a, 20, side="left")   # 1
    np.searchsorted(a, 20, side="right")  # 4

    a[1:4]                   # [20, 20, 20]

IMPORTANT PARAMETER: sorter
    -> Indices describing a sorted order, often from argsort.

    a = np.array([30, 10, 20])
    idx = np.argsort(a)
    np.searchsorted(a, 15, sorter=idx)    # 1

GOTCHAS:
    Input must be sorted for meaningful insertion positions.
    Result can equal len(a), meaning insert at the end.
    Empty array -> insertion position 0.
    Does NOT check whether the value exists.
    Uses binary search: approximately O(log n) per query.


AXIS QUICK REFERENCE
====================
Shape (5,):
    axis=0 / axis=-1 -> Sort the 1D array.

Shape (2, 3):
    axis=0  -> Sort down rows; each column independently.
    axis=1  -> Sort across columns; each row independently.
    axis=-1 -> Same as axis=1.
    axis=None -> Flatten and sort all values.

Shape (2, 3, 4):
    axis=0 -> Sort along dimension 0.
    axis=1 -> Sort along dimension 1.
    axis=2 -> Sort along dimension 2.
    axis=-1 -> Same as axis=2.
    axis=None -> Flatten and sort all values.

For sort/argsort, shape stays the same when an axis is
specified. axis=None produces a 1D result.


FINAL COMPARISON
================
np.sort(a)
    -> WHAT are the sorted values?

np.argsort(a)
    -> WHICH INDICES produce sorted order?

np.unique(a)
    -> WHICH DISTINCT values exist?

np.searchsorted(a, x)
    -> WHERE should x be inserted into sorted a?


COMMON MISTAKES
================
1. sort returns values; argsort returns indices.
2. sort keeps duplicates; unique removes them.
3. unique sorts values by default.
4. searchsorted expects sorted input.
5. searchsorted returns a position, not a matching value.
6. axis=0 sorts columns; axis=1 sorts rows in 2D.
7. axis=None flattens the array for sort/argsort.
8. These functions do not modify the original array.


ML / DATA SCIENCE USES
======================
sort         -> Rank values, order scores, inspect distributions.
argsort      -> Rank samples and reorder related arrays together.
unique       -> Find classes/categories and count frequencies.
searchsorted -> Thresholds, bins, ranges, sorted lookups.
```


----
----
----

## .astype()

- it creates a new array it explicitly helps to convert one ftype to another 
