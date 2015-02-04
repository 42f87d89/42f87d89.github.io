Number Systems
non positional
    greek/hebrew
    roman

positional
    general
    exponential

the exponential number system
    natural base
    non natural base

these number systems work as a positional number system where each position denotes a power of the base, starting on the right with b^0, then as we move left the exponent increases by one each time

in each position symbols are put, each representing a number. usualy these range from zero to one less than the base

    base 10 as example

(surjective vs injective)

arithmetics becomes quite simple in exponential number systems since there is a clear connection between each value.

to sum two numbers, one can do certain operation digit wise

sum each digit from one number to the corresponding one of to the other. if the result is smaller in value than the biggest symbol, then that will be the symbols in that position. otherwise subtract one plus the value of the maximum symbol untill the result is representable. the number of times you subtract will carry into the place to the left to be added. ***

    base 10
    2 base 8

multiplication is done by repeated addition. a shortcut can be made when you multiply by a power of the base. this simply shifts each digit to the left an amount of spaces corresponding to the exponen of the base. ***

    base 10

(more depth)
As such multiplicatio ncan always be broken down into a sum of multiplications between a number and a number smaller than the base

this only becomes interesting once we start considering complex bases. since there is no range from zero to an imaginary number, it is difficult to see is a base is byjective given a number of symbols

in order to check if it is (sur/in)jective over all complex numbers, you must satisfy there
    add one to a number
    get the negative of a number
    multiple by i
    sum two numbers

(to check for (in/sur)jectivity us a lot more complicated but it can be done using modulo and splitting the numbe into real and imaginary)

adding one to a number might seem simple, but it takes a little bit of thinking. that is, when it overflows

you must find how to represent the value of one plus the maximum digitn your base. then you carry each digit to it's appropriate location

    2 base (-1+i)

however, in complex bases you can represent negative numbers without needing a negative sign *** (move this before "in order to check")
as such additions may sometimes result in numbersboth smaller in smaller and shorter than any of the numbers being summed

this means that you need an extra step to the add one algorithm (aside from carry), otherwise you will get stuck infinitely carrying (since carry always goes to the left, and the number needs to be smaller than the originals)

namely this procedure is eliminating one and negative one

    2 base (-1+i)
