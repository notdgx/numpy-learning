# Topics 

-  np.random.rand(), randn(), randint()
- and new random geneator and behaviours 


----

# Random 

> np.random is NumPy's system for generating pseudo-random numbers and random arrays

- they are not completely random they are pseudo random as computer cannot geenerate pure randomness
- they uses seed to genrate on top of it
- they just staticially behavive like the random numner that is important propertie of it to behave liek random
```
Random data
    ↓
├── ML weight initialization
├── simulations
├── probability/statistics
├── sampling
├── testing
├── games
├── randomized algorithms
└── train/test data operations
```

- `np.random.rand()` : gives a random floating-point number.

- `np.random.randint()` : gives a random integer.

- `np.random.randn()` : gives values from a normal distribution.

- np.random is a  toolbox:

```
np.random
   │
   ├── rand()
   ├── randn()
   ├── randint()
   ├── random()
   ├── normal()
   ├── uniform()
   ├── choice()
   ├── shuffle()
   ├── permutation()
   └── many more
```



- rndint generates random values bw the high and low and then number of values
- if only one agrunment it is consideered as the high and it generates only one value
- the high is excluded
- they form a normal distribution if sampled a lot of values they tend to cluster around the center

```
              /\
             /  \
            /    \
___________/      \___________
               0
```




# Seed

- it is the starting point fromm using it it samples random number based on it

```
seed = 42
   ↓
same starting state
   ↓
same algorithm
   ↓
same sequence
   ↓
same numbers
```

- the old random withou the random generator uses the global seed for all the values to sample
- meaning no states wise or instanced seed trackers and sample extracters
- so for the generators use the
```
rng = np.random.default_rng(42)
rng.random(5)
```
- now it the new random value is bound to the rng
- we can have multiple random seeds and that are beign tracked in steps internally

|                             | Python `random`           | NumPy `np.random`                |
| --------------------------- | ------------------------- | -------------------------------- |
| Comes with                  | Python                    | NumPy                            |
| Main purpose                | General random operations | Numerical/scientific random data |
| Works naturally with arrays | ❌                         | ✅                                |
| Random integer              | `random.randint()`        | `np.random.randint()`            |
| Random float                | `random.random()`         | `np.random.rand()` / `random()`  |
| Normal distribution         | `random.gauss()`          | `np.random.randn()` / `normal()` |
| ML/data science             | Less commonly used        | **Very common**                  |




---

# Random Number Generator

```
Seed / internal state
        ↓
   mathematical
    algorithm
        ↓
   random number
        ↓
   updated state
        ↓
   next random number
        ↓
        ...
        
        
RANDOM
→ unpredictable/statistically random

UNIQUE
→ no value is allowed to repeat
```

- the `rng.random()` it generates random float value on based on the rng seed in the 0=< x < 1
- Randomness + distribution = how the random values are statistically spread.
- they are generally normal distribution clusterd around the zero
- if the seed is not specified then the python generates it from a operating system enthropy a random seed
- by delfault the integer one is high is excluded but can be eabled with endpont = True 
- the floating nu,mbers geenatated are not precise due to the computers float limitation
- multiple values can occur more htan once 

---

NumPy's random generators are designed primarily for:

- numerical computing
- simulations
- statistics
- ML
- scientific applications

They are **not intended for security-sensitive randomness** such as:

- passwords
- authentication tokens
- cryptographic keys

----

a good psedu random number is 

```
No obvious patterns
       +
appropriate distribution
       +
good statistical properties
       +
long period
       +
reproducibility when seeded
```

- Modern generators have extremely long periods, so for ordinary NumPy work you don't normally encounter the repetition.
- **Pseudo-random sequences are finite and eventually repeat.**
- **Randomness = uncertainty of the outcome.**  
- **Distribution = the probability pattern governing the outcome.**
- 
```
np.random
    │
    ├── Generator
    │      │
    │      ├── internal state
    │      ├── algorithm
    │      └── output
    │
    └── functions
           ├── random()
           ├── normal()
           ├── integers()
           ├── uniform()
           ├── choice()
           └── ...
```

## Flow 

### New 

With the modern API:

```
rng = np.random.default_rng(42)

rng.random()
rng.random()
rng.random()
```

You have **one generator**.

Conceptually:

```
default_rng(42)
      ↓
  initial state
      ↓
   random() → A
      ↓
  state changes
      ↓
   random() → B
      ↓
  state changes
      ↓
   random() → C
```

It does **NOT** create a new seed for every call.


### Old 

With the old `np.random.rand()` style

If you do:

```
np.random.rand()
np.random.rand()
np.random.rand()
```

NumPy uses the **global random state**.

Conceptually:

```
NumPy global RNG
      ↓
initial state
      ↓
rand() → A
      ↓
state updated
      ↓
rand() → B
      ↓
state updated
      ↓
rand() → C
```

It does **not set a new seed on every `rand()` call**.

If you haven't explicitly seeded it, the global RNG is initialized automaticall

![[Pasted image 20261005212719.png]]

- here they have different states and predictiility of a newnumber from a same seed but the numbers are random and normal distriution non normal distributaion and non uniqueness
```
        rng1                         rng2
         │                            │
    state A                      state B
         │                            │
     random()                    random()
         ↓                            ↓
       value                        value
         │                            │
    state A'                     state B'
```

```
rng1: A → B → C → D → ...
rng2: A → B → C → D → ...
       ↑
       completely separate state
```

- `rand()`, `randn()`, and `randint()` are **older NumPy APIs**. For new code, prefer a generator: `rng = np.random.default_rng()` and then `rng.random()`, `rng.normal()`, `rng.integers()`, etc.



----

# Functions 

## `random()` 

### What it does

Generates random floating-point numbers from a **uniform distribution** over:

```
0 ≤ x < 1
```

### Modern usage

```
rng = np.random.default_rng()

rng.random()
```


---
### `rand` fn

This is the older equivalent of `random()` for basic uniform random floats.

```
np.random.rand(2, 3)
```

Example:

```
[[0.21 0.74 0.12]
 [0.89 0.33 0.57]]
```

Range:

```
0 ≤ x < 1
```

Difference  :

```
rand(2, 3)
       ↑ ↑
    dimensions
```

but:

```
random((2, 3))
        ↑
      shape
```


----

## `normal()` 

Generates random numbers from a **normal (Gaussian) distribution**.

```
rng.normal()
```

Example:

```
-0.42
```

Unlike `random()`, values aren't restricted to `0–1`.

The default distribution is:

```
mean = 0
standard deviation = 1
```

Conceptually:

```
                ▲
              █████
            █████████
          █████████████
________█████████████████________
                0
```

Most values tend to be around `0`.


### Options to manipulate and conrol them 

```
rng.normal(loc=10, scale=2, size=5)
```

```
loc   = mean
scale = standard deviation
size  = output shape
```

- the values extremet to zero is less likely 
- more likely all the values are close the othe zero 


----

## `randn()`

Old shorthand for generating samples from the **standard normal distribution**.

```
np.random.randn(5)
```

Example:

```
[-0.42, 1.13, -0.08, 0.67, -1.54]
```

This corresponds approximately to:

```
rng.normal(0, 1, 5)
```

So:

```
randn()
   ↓
normal distribution
mean = 0
std = 1
```

### Modern equivalent

```
rng.normal(size=5)
```


----
----
## `integers()` / old `randint()` 

Generates random **integers**.

Modern:

```
rng.integers(1, 10)
```

Possible:

```
1 2 3 4 5 6 7 8 9
```

Normally:

```
low ≤ x < high
```

So `10` is excluded.
- use the endpoint = True too include the high also 
- use size to generate multiple values 
---

### Generate multiple

1D
```
rng.integers(1, 10, size=5)
```
2D
```
rng.integers(1, 10, size=(2, 3))
```

### Old version

```
np.random.randint(1, 10, size=(2, 3))
```

- random indices
- simulations
- random labels
- selecting random values
- games
- randomized algorithms

----
## uniform()

- it gives the numbers uniformly distributed 
- the diff is that is can have a range over the random that is bounded to the 0,1 only 
- it gives the uniform distibution not the normal ie clusted around the center 
- 

----

## choice()

- it picks a random number from a passed array to the use 
- we can give size to get preffered shape 
- it can give same vale multiple times also 
- we have to disable it by replace = flase
- if the array contains duplicate value even after repalce false can spit out same values 

----

## shuffle()

- it shuffles the elements of a array in place 
- modiffies the original
- ir doesnst gives anything it modifies in palce 

----

## permutation()

- it doesnt modifies the original in place 
- it returns array just waht shuffle do in palce 


----
---
----

|Function|Produces|Range / distribution|Modifies original?|
|---|---|---|---|
|`random()`|floats|uniform `[0,1)`|No|
|`rand()`|floats|uniform `[0,1)`|No|
|`normal()`|floats|normal, configurable mean/std|No|
|`randn()`|floats|standard normal|No|
|`integers()`|integers|specified integer range|No|
|`randint()`|integers|specified integer range|No|
|`uniform()`|floats|uniform `[low, high)`|No|
|`choice()`|selected values|random sampling|No|
|`shuffle()`|rearrangement|random permutation|**Yes**|
|`permutation()`|rearrangement|random permutation|**No**|

