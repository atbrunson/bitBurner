/** @param {NS} ns */
export async function main(ns) {
	//ns.tail()

	let target = ns.args[0];
	ns.print("Target Server: %s", target);

	let targetMaxMem = ns.getServerMaxRam(target);
	ns.print('Target Server RAM: %dgb', targetMaxMem);

	let targetUsedMem = ns.getServerUsedRam(target);
	let targetFreeMem = targetMaxMem - targetUsedMem;

	ns.print("Target Server Free RAM: %dgb", targetFreeMem);
	ns.print("")

	//If we have the exploit program exsits, use to open that port
	//on the target server

	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(target);
	}

	if (ns.fileExists("FTPCrack.exe", "home")) {
		ns.ftpcrack(target);
	}

	if (ns.fileExists("RelaySMTP.exe", "home")) {
		ns.relaysmtp(target);
	}

	if (ns.fileExists("HTTPWorm.exe", "home")) {
		ns.httpworm(target);
	}

	if (ns.fileExists("SQLInject.exe", "home")) {
		ns.sqlinject(target);
	}
	//copy script files to target server



	//Get root access to target server
	try { ns.nuke(target) }
	catch (error) { ns.print(error) }



}