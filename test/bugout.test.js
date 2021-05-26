const {D,I,E} = require( "../src/bugout.js" )

test("test debug", ()=>{
	process.stdout.write = jest.fn();

	D("Hello, World!");
	D("Hello, World!");
	D("Hello, World!");
	D("Hello, World!");
	D("Hello, World!");
	expect(process.stdout.write).toHaveBeenCalled();
	expect(process.stdout.write.mock.calls.[0][0]).toBe("Hello, World!");
	expect(process.stdout.write.mock.calls.[1][0]).toBe(" [ 2 times]");
	// next should clear
	expect(process.stdout.write.mock.calls.[3][0]).toBe(" [ 3 times]");
	// next should clear
	expect(process.stdout.write.mock.calls.[5][0]).toBe(" [ 4 times]");
	// next should clear
	expect(process.stdout.write.mock.calls.[7][0]).toBe(" [ 5 times]");
});

test("test indicate", ()=>{
	process.stdout.write = jest.fn();

	I("Hello, 1");
	I("Hello, 2");
	I("Hello, 3");
	I("Hello, 4");
	expect(process.stdout.write).toHaveBeenCalled();
	expect(process.stdout.write.mock.calls.[0][0]).toBe("\n");
	expect(process.stdout.write.mock.calls.[1][0]).toBe("Hello, 1");
	expect(process.stdout.write.mock.calls.[2][0]).toBe("\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[3][0]).toBe("Hello, 2");
	expect(process.stdout.write.mock.calls.[4][0]).toBe("\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[5][0]).toBe("Hello, 3");
	expect(process.stdout.write.mock.calls.[6][0]).toBe("\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[7][0]).toBe("Hello, 4");
	D();
});

test("test debug+indicate", ()=>{
	process.stdout.write = jest.fn();

	D("Hello, World!");
	D("Hello, World!");
	I("Hello, 1");
	I("Hello, 2");
	I("Hello, 3");
	D("Hello, World!");
	D("Hello, World!");
	D("Hello, World!");
	expect(process.stdout.write).toHaveBeenCalled();
	let n=0;
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("Hello, World!");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe(" [ 2 times]");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("\n");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("Hello, 1");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("Hello, 2");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("Hello, 3");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("Hello, World!");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe(" [ 2 times]");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe("\b\b\b\b\b\b\b\b\b\b\b");
	expect(process.stdout.write.mock.calls.[n++][0]).toBe(" [ 3 times]");
});


		 
