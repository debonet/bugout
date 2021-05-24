# bugout

A few tools for making debug messages to the console more usable
 
# Usage

```javascript

	const {D, I, E} = require( `@debonet/bugout` );
	const {D, I, E} = require( "./DebugOutput.js" );

	D("Hello World!");
	D("Hello World!");
	D("Hello Mars!");
	D("Hello World!");
	D("Hello World!");
	D("Hello World!");
	for (let n=0; n<1000; n++){
		I(`I'm showing ${n}`);
	}
	D("Hello World!");
	D("Hello World!");
	for (let n=0; n<1000; n++){
		D("HELLO WORLD!");
	}
```

Yields output

> Hello World! [ 2 times]  
> Hello Mars!  
> Hello World! [ 3 times]  
> I'm showing 999  
> Hello World! [ 2 times]  
> HELLO WORLD! [ 1000 times]



# API

## D( values* )
## debug( values* ) 

prints values to standard out. If a line would be repeated exactly, instead of being printed again it simply gets "[ # times ]" appended to it

## I( values* )
## indicate( values* )

prints values to standard out, but overwrites any imediately preceeding output from an `indicate()` call.

## E( values* )
## error( values* ) 

Currently this is exactly console.error




# Installation
```
npm install @debonet/bugout
```
 
 
