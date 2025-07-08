/** @param {NS} ns */
export async function main(ns) {

	//ns.disableLog("ALL");
	const target = ns.args[0];
	const delay = ns.args[1]
	const interval = ns.args[2]
	let secLvl = 0
	let lastSecLvl = 0
	let delta = 0

	await ns.sleep(delay)


	while (true) {																							// Forever TRUE
		ns.print("Inter Start")
		await ns.sleep(interval)																	// Wait for interval before starting (sets time for batches)	
		secLvl = await ns.weaken(target);													// Execute weaken() on "target" & assign it's Promise to secLvl

		delta = secLvl - lastSecLvl;															// Assign current change value to delta

		ns.clearLog()																							// Clear log before printing current cycle
		ns.printf('Return: %.6f from current cycle', secLvl)		 	// Print a string formatted returns to log
		ns.printf('Change: %+.5f from last cycle', delta)					// Print delta to log
		ns.printf(" ")																						// Add a line break
		ns.printf(" ")																						// Add a line break

		lastSecLvl = secLvl																			  // Overwrites previous growth cycle with the current cycle

	}
}