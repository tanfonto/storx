## v1.1

### new features

*   (pre) state change side effects support;

### bug fixes

*   No longer trying to naively apply uniqueness to the stream, this can
be composed by consuming code if required;

*   Late observers will now receive up-to-date state when subscribing;

### internal

*   Project structure improvements;
*   Dependencies update;

## v1.2

### new features


*   implementation details are now exposed in a form of "building
blocks" which allow custom composition; 
*   the default store implementation api was rearranged and expose
dispatch, observable and (private) _history properties;
-   documentation (aka readme) was adjusted to include these changes;
