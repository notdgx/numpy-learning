---
date: 2026-09-02
time: "21:12:00+05:30"
---
# Numpy Introduction notes 

> reference video -> https://youtu.be/Utgwk0r9Zq4 

## keyterms

- importing : `import numpy as np` 
- `[n]` in juypter notebook it tells about the executed step if this is 4 then it means it is executed in step 4 
- They are written in C, it is compiled part fo the c and it is executed like the multi languaage comined working whihc runs the c compiled numpy arrays and comminute through python interface internally it runs the c code of hte numpy 
- It is like upto 50x faster than the python lists
- The lists in python are the hetrogeneous data structure 
- 

## In jupiter keybindings 

- arrows to navigate `enter` to work on cell, `esc` to exit the working cell
- `Shift + Enter` : Run cell and move to next cell     
- `Ctrl + Enter` :  Run cell and stay in same cell  
- `Alt + Enter`  : Run cell and insert new cell below 
- 
### `Esc mode` :

> Command mode 

|Shortcut|Action|
|---|---|
|`A`|Insert cell above|
|`B`|Insert cell below|
|`D`, `D`|Delete selected cell|
|`Z`|Undo deleted cell|
|`Shift + M`|Merge selected cells|

| Shortcut    | Action                         |
| ----------- | ------------------------------ |
| `↑` / `K`   | Select cell above              |
| `↓` / `J`   | Select cell below              |
| `Shift + ↑` | Select multiple cells upward   |
| `Shift + ↓` | Select multiple cells downward |

- `Ctrl + shitft + ↑` → move cell up
- `Ctrl + shitft + ↓` → move cell down

|Shortcut|Action|
|---|---|
|`C`|Copy cell|
|`X`|Cut cell|
|`V`|Paste cell below|
|`Shift + V`|Paste cell above|

|Shortcut|Action|
|---|---|
|`Y`|Convert to Code cell|
|`M`|Convert to Markdown cell|

`Shift + Enter` : render md 

### `Enter` mode

> Edit mode 

| Shortcut                       | Action                     |
| ------------------------------ | -------------------------- |
| `Tab`                          | Autocomplete / indentation |
| `Shift + Tab`                  | Show documentation tooltip |
| `Ctrl + /`                     | Toggle comment             |
| `Ctrl + Z`                     | Undo                       |
| `Ctrl + Shift + Z // Ctrl + Y` | Redo                       |
| `Ctrl + F`                     | Find                       |
| `Ctrl + H`                     | Find and replace           |


# Functions 

- `array`
- `arange`
- `zeros`
- `ones`
- `linspace`
- `random`
	- `rand`
	- `randint`
	- `randn`
- `arr.min()`
- `arr.max()`
- `arr.sum()` -> pyhton one 
- `np.sum(arr,axis = 0,1)` 
- `np.mean(e)`
- `np.std(e)`
- `np.argmax(e)`
- `np.argmin(e)`
- `arr.reshape(<shape here>)` -> only work if possible 
- 

# Attribute 

- `arr.shape`
- `arr.size`
- `arr.dtype`

# Indexing 

- the [] indexing 
- the [x:y] slicing
- the [x:y,a:b] slicing 


> boolena indexing 


# ARthimetic Operations 

- `+` -> shape eleemnts needed
- `-` -> shape eleemnts needed
- `*` -> shape eleemnts needed
- `/` -> shape eleemnts needed
- `//` -> shape eleemnts needed
- `**` -> shape eleemnts needed

# Broadcasting 

- `arr + 10`
- `arr - 10` 

# Matrix operaiton

- `np.dot(a,b)`
- `np.T`

# Stackinf anf Splitting

- `np.vstack((a,b))`
- `np.hstack((a,b))`
- `np.column_stack((a,b))`

- `np.hsplit(a,n)` - > n should be a num that can divide the array lenght 
- `np.vsplit(a,n)`
