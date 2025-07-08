export async function main(ns) {
	//ns.tail()
	ns.disableLog("disableLog")
	ns.disableLog("getHackingLevel")
	ns.disableLog("getServerRequiredHackingLevel")
	ns.disableLog("getServerMoneyAvailable")
	ns.disableLog("getServerMaxMoney")

	const target = ns.args[0];
	const host = ns.getHostname()
	const maxMoney = ns.getServerMaxMoney(target);



	const moneyThresh = maxMoney * .98;
	const minSec = ns.getServerMinSecurityLevel(target)
	const securityThresh = minSec + 2;


	;
	const start = Date.now();
	let timer = Math.round((Date.now() - start) / 1000) // Script run time in seconds

	// Infinite loop that continously weakens/grows the target server
	while (maxMoney) {

		timer = Math.round((Date.now() - start) / 1000) // Script run time in seconds
		if (timer % 60 == 0) ns.scp("_nodes.js", target, "home")

		let hackingLevel = ns.getHackingLevel()
		let canHack = hackingLevel >= minSec
		let lvlsNeeded = ns.getServerRequiredHackingLevel(target) - hackingLevel

		let currentMoney = ns.getServerMoneyAvailable(target)
		let secLevel = ns.getServerSecurityLevel(target)

		ns.clearLog();

		ns.print("Timer: " + timer + 's');



		if (secLevel > securityThresh) {
			ns.print(ns.formatNumber(secLevel / securityThresh * 100, 2) + "% of Required Security Level")
			ns.print("")
			ns.print(ns.formatNumber(currentMoney / maxMoney * 100, 2) + "% of Maximum Money")
			ns.print("")
			await ns.weaken(target);

			// If the server's security level is above our threshold, weaken it
			// print countdown timer bar

		}

		else if (currentMoney < moneyThresh) {
			ns.print('$ns.formatNumber(secLevel / securityThresh * 100, 2) + "% of Required Security Level"')
			ns.print("")
			ns.print(ns.formatNumber(currentMoney / maxMoney * 100, 2) + "% of Maximum Money")
			ns.print("")
			await ns.grow(target);

			// If the server's money is less than our threshold, grow it
			// print countdown timer bar  

		}

		else {

			ns.print(" ")
			ns.print(target + " at or below " + securityThresh + " & " + ns.formatNumber(moneyThresh, 0) + "$")
			if (canHack) {
				ns.print(target + ' ready to hack.')
				ns.print(ns.formatNumber(secLevel / securityThresh * 100, 2) + "% of Required Security Level")
				ns.print("")
				ns.print(ns.formatNumber(currentMoney / maxMoney * 100, 2) + "% of Maximum Money")
				ns.print("")
			}
			else {
				ns.print(lvlsNeeded + " levels needed to hack() " + target)
			}
			await ns.sleep(1000)

		}


	}

	while (!maxMoney) {

		ns.clearLog()

		timer = Math.round((Date.now() - start) / 1000) // Script run time in seconds    
		if (timer % 20 == 0) ns.scp("_nodes.js", target, "home")

		ns.print("Timer: " + timer + 's')
		ns.print("")
		ns.print("No Money on target")
		ns.print("")



		await ns.sleep(1000)


	}
}