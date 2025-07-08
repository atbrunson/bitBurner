/** @param {NS} ns */
export async function main(ns) {

	// ns.disableLog("ALL");
	const target = ns.args[0];
	const delay = ns.args[1]
	const interval = ns.args[2]
	let growth = 0
	let lastGrowth = 0
	let delta = 0

	await ns.sleep(delay)

	while (true) {																							// Forever TRUE

		await ns.sleep(interval)																	// Waits for interval before starting (sets time for batches)

		growth = await ns.grow(target);														// Execute grow() on "target" & assign it's Promise to growth
		delta = growth - lastGrowth;															// Assigns current change value to delta

		ns.clearLog()																							// Clears log before printing current cycle
		ns.printf('Growth: %.6f from current cycle', growth)		  // Print growth to log
		ns.printf('Change: %+.5f from last cycle', delta)					// Print delta to log
		ns.printf(" ")																						// line break
		ns.printf(" ")																						// line break

		lastGrowth = growth																				// Overwrites privous growth cycle with the current cycle

		/*	TODO:
			- populate and display deltas[].length = 12 => deltas.push(growth)
			- print history of last 12 cycles

		*/
	}



}