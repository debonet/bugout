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
function fPrintErasableMessage( bKeepIt, bContinue, ...vx ){
	bRetain = bKeepIt;
	
	if ( cDirty > 0 ){
		if (bContinue){
			process.stdout.write(' ');
			cDirty++;
		}
		else{
			process.stdout.write(
				'\b'.repeat( cDirty )
					+ ' '.repeat( cDirty )
					+ '\b'.repeat( cDirty )
			);
			cDirty = 0;
		}
	}
	if (sLast){
		process.stdout.write( '\n' );
	}

	const s = fsFromVX( vx );
	cDirty += s.length;
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
			process.stdout.write(
				'\b'.repeat( cDirty )
					+ ' '.repeat( cDirty )
					+ '\b'.repeat( cDirty )
			);
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
process
  .on('unhandledRejection', (reason, p) => {
		fPrintMessage();
  })
  .on('uncaughtException', err => {
		fPrintMessage();
  })
  .on('exit', err => {
		fPrintMessage();
  });

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
function fErrorMessage( ...vx ){
	console.error( ...vx );
}


module.exports = fPrintMessage;

Object.assign( module.exports, {
	I : fPrintErasableMessage.bind(undefined, false, false),

	IKeep : fPrintErasableMessage.bind(undefined, true, false),
	K : fPrintErasableMessage.bind(undefined, true, false),
	
	IContinue : fPrintErasableMessage.bind(undefined, false, true),
	C : fPrintErasableMessage.bind(undefined, false, true),

	IContinue : fPrintErasableMessage.bind(undefined, false, true),
	CK : fPrintErasableMessage.bind(undefined, true, true),

	D : fPrintMessage,
	E : fErrorMessage,
	indicate : fPrintErasableMessage.bind(undefined, false, false),
	indicate_keep : fPrintErasableMessage.bind(undefined, true, false ),
	indicate_continue : fPrintErasableMessage.bind(undefined, false, true),
	indicate : fPrintErasableMessage,
	debug : fPrintMessage,
	error : fErrorMessage
});

