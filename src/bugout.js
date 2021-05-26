const Util = require( "util" );

let cDirty = 0;
let cDirtyRepeat = 0;
let sLast = "";
let cRepeat = 1;
let bRetain = false;
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fsFromVX(vx){
	return vx.map(( x ) => {
		const s = Util.inspect( x );
		if ( s[0] == "'" || s[0]=='"' ){
			return s.substring( 1, s.length - 1 );
		}
		return s;
	}).join( ' ' );
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fPrintErasableMessage( bKeepIt, ...vx ){
	bRetain = bKeepIt;
	
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
		if ( bRetain ) {
			process.stdout.write( '\n');
		}
		else{
			process.stdout.write( '\b'.repeat( cDirty ));
		}
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
	console.error( ...vx );
}


module.exports = fPrintMessage;

Object.assign( module.exports, {
	I : fPrintErasableMessage.bind(undefined, false),
	IKeep : fPrintErasableMessage.bind(undefined, true),
	D : fPrintMessage,
	E : fErrorMessage,
	indicate : fPrintErasableMessage.bind(undefined, false),
	indicate_keep : fPrintErasableMessage.bind(undefined, false),
	indicate : fPrintErasableMessage,
	debug : fPrintMessage,
	error : fErrorMessage
});

