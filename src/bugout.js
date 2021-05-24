const Util = require( "util" );

let cDirty = 0;
let cDirtyRepeat = 0;
let sLast = "";
let cRepeat = 1;

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fsFromVX(vx){
	return vx.map(( x ) => {
		const s = Util.inspect( x );
		return s.substring( 1, s.length - 1 );
	}).join( ' ' );
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fPrintErasableMessage( ...vx ){
	if ( cDirty > 0 ){
		process.stdout.write( '\b'.repeat( cDirty ));
	}
	if (sLast){
		process.stdout.write( '\n' );
	}

	const s = fsFromVX( vx );
	cDirty = s.length;
	sLast = undefined;
	
	process.stdout.write( s );
}


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fPrintMessage( ...vx ){
	if ( cDirty > 0 ){
		//process.stdout.write( '\b'.repeat( cDirty ));
		process.stdout.write( '\n');
		cDirty = 0;
	}

	const s = fsFromVX( vx );

	if (s == sLast){
		cRepeat += 1;

		if ( cDirtyRepeat > 0 ){
			process.stdout.write( '\b'.repeat( cDirtyRepeat ));
		}

		sRepeat = ` [ ${cRepeat} times]`;
		cDirtyRepeat = sRepeat.length;
		process.stdout.write( sRepeat );
	}
	else{
		if (sLast){
			process.stdout.write( '\n' );
		}
		cRepeat = 1;
		cDirtyRepeat = 0;
		sLast = s;
		process.stdout.write( s );
	}
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fErrorMessage( ...vx ){
	E( ...vx );
}


module.exports = fPrintMessage;

Object.assign( module.exports, {
	I : fPrintErasableMessage,
	D : fPrintMessage,
	E : fErrorMessage,
	indicate : fPrintErasableMessage,
	debug : fPrintMessage,
	error : fErrorMessage
});

