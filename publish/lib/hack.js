/** @param {NS} ns */
export async function main(ns) {

	//ns.disableLog("ALL");
	const target = ns.args[0];
	const delay = ns.args[1]
	const interval = ns.args[2]
	let returns = 0
	let lastReturn = 0
	let delta = 0
	let sReturns = ""

	await ns.sleep(delay)
	ns.clearLog()

	while (true) {																							// Forever TRUE

		if (interval > 0) await ns.sleep(interval)								// Wait for interval before starting (sets time for batches)	
		returns = await ns.hack(target);													// Execute hack() on "target" & assign it's Promise to returns

		sReturns = ns.formatNumber(returns, 2)										// Assign string formatted version of returns to sReturns

		delta = returns - lastReturn;															// Assign current change value to delta

		ns.clearLog()																							// Clear log before printing current cycle
		ns.printf('Return: %s from current cycle', sReturns)		 	// Print a string formatted returns to log
		ns.printf('Change: %+.5f from last cycle', delta)					// Print delta to log
		ns.printf(" ")																						// Add a line break
		ns.printf(" ")																						// Add a line break

		lastReturn = returns																			// Overwrites previous growth cycle with the current cycle

	}
}