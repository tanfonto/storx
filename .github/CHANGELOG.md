# v1.1

## new features

-   (pre) state change side effects support;

## bug fixes

-   No longer trying to naively apply uniqueness to the stream, this can
be composed by consuming code if required;

-   Late observers will now receive up-to-date state when subscribing;

## internal

-   Project structure improvements;
-   Dependencies update;
