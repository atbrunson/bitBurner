/** @param {NS} ns */
export async function main(ns) {
	let cached = ns.hacknet.numHashes()
	let cache = ns.hacknet.hashCapacity()

	while (true) {
		cached = ns.hacknet.numHashes()
		cache = ns.hacknet.hashCapacity()

		if (cached / cache > 0.95) {
			ns.hacknet.spendHashes('Sell for Money')
		}
		await ns.sleep(5)
	}
}