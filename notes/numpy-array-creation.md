# Topics

- np.array() from lists
- np.zeros(), np.ones(), np.full()
- np.eye(), np.identity()
- np.arange(), np.linspace()
- np.empty()

----

# np.array()

- create array from a datatype in the python like hte lists 
- no homegeneious in multiple dimension list or datatype can be tramnsalted into array of numpy 
- it cannot create form the strings dictionareis directly if tried then the array with one eleemnt formed 
- It creates a **0-dimensional NumPy array containing the entire dictionary as one object**.
- NumPy treats the **whole string as one element**.
- only tuples and lists to get a good numpy array
- mostly preffered the lists
- use `np.array(list("hello"))` to split the elemets if wanted 

|Input|Result|
|---|---|
|`[1, 2, 3]`|1-D array of numbers|
|`(1, 2, 3)`|1-D array of numbers|
|`"hello"`|0-D array containing `"hello"`|
|`{"a": 1, "b": 2}`|0-D object array containing the dictionary|
|`list("hello")`|1-D array of characters|
|`list(d.values())`|1-D array of values|


-----


# np.zeros()


- it creates the all the elements of the array with zero value
```
np.zeros(dim)
```
- if one eement then 1D array 
- if multi dimentsion then 
```
np.zeros((2,2))
```
- it is a 2D array 
```
np.zeros((2,2,2))
```
- it is a 3D array

# np.ones()

- same idea as the zeros but everywhere is one

# np.full()

- same idea as the zeros but everywhere is the fill value second arrgunment first is the shape

# np.eye() & np.identity()

- they creates the identity matrix 
- but the only diff is the eye can has offset k in it 
- identiy always creates a sq matirx 
- eye doesnt care 

# np.arange()

- it creates the numbers like python range fn 
- start included 
- stop excluded 
- step is the step value by defaut it is 1 


# np.linspace()

- it says about that how many values you want 
- start stop and the size
- size if the no of values you want in bw the start and stop 
- start and stop is included
- equally spaced 

# np.empty()

- it creates a array in the memory with the garbage values 
- instead of init everyhting to 0 one or full
- that takes up time it just init the memory and as like the c it picks up garbage value 
- it is performence related 
- The values are **garbage/uninitialized memory values**. They are **not necessarily zero**.
- it may have zero values but all not necessary that is rando behaviour to it 