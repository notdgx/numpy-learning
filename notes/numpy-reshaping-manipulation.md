# Topics 

Reshaping & Manipulation

- .reshape()
- .flatten() vs .ravel()
- np.squeeze(), np.expand_dims()

- np.concatenate(), np.stack(), np.vstack(), np.hstack()

- np.split(), np.vsplit(), np.hsplit()
- np.transpose()

----

```
                 NumPy Array
                      │
       ┌──────────────┼──────────────┐
       │              │              │
    CHANGE          COMBINE        DIVIDE
    SHAPE           ARRAYS         ARRAYS
       │              │              │
 reshape()       concatenate()     split()
 flatten()       stack()            vsplit()
 ravel()         vstack()           hsplit()
 squeeze()       hstack()
 expand_dims()
       │
   REARRANGE
    AXES
       │
 transpose()
```


---
# Change Shapes 

- .reshape()
- .flatten() vs .ravel()
- np.squeeze(), np.expand_dims()

---
## .reshape()

- `reshape()` **changes the shape** of an array without changing the number of elements.
- it is used to reshape a array if the shape values product = size 
- the total number of elements remains the same 
- invalid shape will give a value error 
- syntax : `x.reshape((d,e))` or `np.reshape(x,(2,4))`
- we can do anything if we have a valid converter shape 
- we can do expand dims work with it too and squeez also flatten and ravels etc 
- but for them we need to know some parameters but the direct functions make it easy 
- `-1`  : "I don't want to calculate this dimension myself. Figure it out."
```
a = np.arange(12)
a.reshape(3, -1)
```
```
12 total elements
3 × ? = 12

? = 4
```
- numpy auto calulates the dimesion
- only one time `-1` can be implemented
- because multiple can ambigious 
- `0` is invalid dim 
- reshaping into original is valid but due to otipmizaiton it amy return the original data shared object 
- it try to retun a view when possible but for different case it could return a copyty if the requested reshape cannot be represented appropriately as a view under the requested memory ordering.
- the original isnt reshaped in palce 
- it doenst change dtype 
- we can rehape a 0 dim array into a array of shape of profuct 1 only 
- cant reshape a empty array into anything 
- the order also exist of the C -> rwo major 
- F - > Fortran column majoer 
- `a.reshape(-1,order='F')` for doing to flatten or ravel
- `a.reshape(-1)` : for doing to flatten or ravel
- 

----

## .flatten() & .ravel()

- both says give me the 1D version of the aray 
- it converts any array into a 1D array
- but the diff in both is about the memory 
- they both dont change thhe original dtype eelemts etc 
- we can also use the order here C and F 
- `A` Attempts to use Fortran-like order if the array is Fortran-contiguous; otherwise C-like order.
- `K` Uses the array's actual memory layout as closely as possible.
- `K` becomes particularly relevant with complex non-contiguous/strided arrays.
### .flatten()

- flattens creates a new object and new copy data other than original 
- any changes in the returned doenst apply to the source as copy
- it can be high compute as copiing into new etc

### .ravel()

- ravel gives up the view with sam undelining data
- it is flatten + view it whenever possible dont create a copy 
- any changes in the returned does apply to the source as not copy but view 
- it is less compute hravy and fast 

|Property|`flatten()`|`ravel()`|
|---|---|---|
|Result|1-D|1-D|
|Shape|`(n,)`|`(n,)`|
|Copy/view|**Copy**|**View when possible**|
|Memory usage|Usually higher|Usually lower|
|Can affect original?|No|**Yes, if result shares memory**|
|Performance|May require copying|Often faster when view possible|
|`order` parameter|Yes|Yes|
|Common use|Need independent copy|Just need flattened representation|

|Operation|Output shape|Copy guaranteed?|View possible?|
|---|--:|--:|--:|
|`flatten()`|`(n,)`|**Yes**|No|
|`ravel()`|`(n,)`|No|**Yes**|
|`reshape(-1)`|`(n,)`|No|**Yes**|

----

## np.squeeze() & np.expand_dims()

- they both delas wiit the dimensions wiht the size one ie one element in that dimension
### np.squeeze()

- the squeeze removes the all the 1d dimesions froma a array 
- if no 1 D s then it doesnt squeezes 
- it removes all the extra  dims with size 1
- it can have a diffrent `axis` parameter also tellinf it to only remove this one not every
- worite in paramete axis = 0,1,2 ...  to remove that specific only 
- if that axis is not in the size of 1 it creates a error 
- python also allows the negatie axis numebr as for specifing axis 
- it returns a nd array 
- it doesnt change the original or you can explicitly assign it 
- it generally gives a view rather than a copy as just a dim is removed 
- it doenst change the dtypw , no of eleemts


### np.expand_dims()

- the expand dims iinserta a new dimesion of size 1 
- it adds a new dimestion of size 1 at the a axis position 
- it is the opposit eof hte squeex 
- `np.expand_dims()` inserts a new axis of size **1** at a specified position.
```
b = np.expand_dims(a, axis=0)
```
- it will give error is axis too much away form what can be there like 5 if current is 1 only 
- we can use  negative axis accessalso 
- it doenst change dtype , eleemts only ndims and shape only 

|Operation|Main purpose|Number of elements|Dimensions|
|---|---|--:|---|
|`reshape()`|Change to specified shape|Same|Can increase/decrease|
|`flatten()`|Make 1-D copy|Same|Becomes 1|
|`ravel()`|Make 1-D, avoid copy if possible|Same|Becomes 1|
|`squeeze()`|Remove size-1 axes|Same|Decreases|
|`expand_dims()`|Add size-1 axis|Same|Increases|

|Property|`np.squeeze()`|`np.expand_dims()`|
|---|---|---|
|Main purpose|Remove size-1 axes|Add size-1 axis|
|Input|Array-like|Array-like|
|Return|`ndarray`|`ndarray`|
|Elements|Same|Same|
|dtype|Same|Same|
|`ndim`|Decreases|Increases|
|Shape|Removes `1` dimensions|Inserts a `1` dimension|
|`axis`|Optional|Important|
|Copy|Can return view|Can return view|
|Original mutated?|No, result returned|No, result returned|
|Main use|Remove redundant singleton dimensions|Prepare shape/broadcasting/batch/channel dimensions|


---
## Transpose

- it is mathematically matrix like transpose operation on a array 
- it works on the axis 
- it changes the axis postions

----
----

# Combining Arrays 

---

## concatenate() 

- it combines array 
- it joins arrays along a existing axiss 
- it doesnt creates a new dimesion
- it joins the arrays vertically 
- the axis in which we care joining s added other must be same and stay common afterwards 
```
a = np.array([[1, 2],
              [3, 4]])

b = np.array([[5, 6],
              [7, 8]])
              
np.concatenate((a, b), axis=0)

[[1 2]
 [3 4]
 [5 6]
 [7 8]]
 
 (2,2)
+
(2,2)
------
(4,2)
```

```
np.concatenate((a, b), axis=1)

[[1 2 5 6]
 [3 4 7 8]]
 
 (2,2)
+
(2,2)
------
(2,4)
```

- important rule : All dimensions except axis `k` must match. k may or may not match 
- 
## stack()

- join arrays and create a new axis 
- it creates a new axis 
- it place arrays along the axis the new one it creates 
- two should be of same shape

```
original:       (2, 3)

axis=0:         (2, 2, 3)
                 ↑
              new axis

axis=1:         (2, 2, 3)
                    ↑
                 new axis

axis=2:         (2, 3, 2)
                       ↑
                    new axis
```

## vstack()

- it is like stacking but a convineent way
- it is vertical stacking 
- for 2d array it is like same as `np.concatenate((a,b), axis=0)`
- not for every dimension same as concatinate
- 
```
[1 2 3]  →  [1 2 3]
            ---------
[4 5 6]  →  [4 5 6]
```



## hstack()

- it is like stacking but a convineent way
- it is horizontal stacking 
- for 2d it behaves liek `np.concatenate((a,b), axis=1)`
```
vstack 1D → makes rows

hstack 1D → extends the 1D array
```

|Function|Requirement|
|---|---|
|`concatenate`|Same dimensions; all non-concatenated dimensions must match|
|`stack`|Every input must have exactly the same shape|
|`vstack`|Vertical combination; 1D inputs are treated as rows|
|`hstack`|Horizontal combination; behavior depends on dimensionality|


---
---

# Divide arrays 

---

## split()

- genral way of splitting along a axis 

## vsplit() 

- splitting vertically

## hsplit()

- splitting horizontally 

----

