/*

@param {NS} ns

*/

export async function main(ns) {
	ns.tail()                                   //TODO: Disply custom tail with formatted output with network map & node detail

	let nodes = new Map();                        //Define & initalize empty nodes{} map object
	let temp = {};                                //Define & initalize empty temp{} object
	let stack = [];                               //Define & initalize empty stack[] array
	let seen = [];                                //Define & initalize empty seen[] array


	const host = ns.getHostname();                //Define & initalize host server
	stack.push(host);                             //Add host to stack[]
	ns.scan(host).forEach((s) => stack.push(s))   //Add host's neighbors to stack[]



	while (stack.length > 0) {                    //Loop through stack[] while stack[] is populated

		stack.forEach((n) => {                      //Loop through each element, n , in stack[]

			temp = (ns.getServer(n));                 //Create and initialize a temp{} server object 

			temp.hackTime = ns.getHackTime(n)
			temp.growTime = 3.2 * temp.hackTime
			temp.weakenTime = 4 * temp.hackTime


			temp.children = ns.scan(n)                                          //Add array of .children[] to temp{} 

			temp.children.forEach(child => {                                    // Loop through each child of children:

				if (!seen.includes(child) && !stack.includes(child)) {            //If seen[] dosn't include child and stack[] ...  
					stack.push(child);                                              //...add the child to the stack[]
					//ns.tprint(child + " pushed to stack");                        //Print that the child was added to the stack[]
				}

			});

			seen.push(n);                            //Add the stack[n] element to the seen[] list
			//ns.tprint("Seen: " + seen);            //Print the list of elements already in the seen[] list

			stack = stack.filter(e => e !== n)       //Remove the stack[n] element from the stack[] 
			//ns.tprint("Stack[n]: " + n);           //Print the list of elements already in the stack[] list

			nodes.set(n, temp)                       //Add temp[] server to nodes[] object list            

			temp = {}                                //Clear all data from the temp[] server for next stack[n] element
		});


	};



	nodes.forEach(node => {

		ns.write("_nodes.js", JSON.stringify(Array.from(nodes.entries()), null, "\t"), "w")   //writes a copy of the map nodes{} to the node.hostname

		ns.print(node.hostname + " Root Access: " + node.hasAdminRights)

		if (!node.hasAdminRights) {
			try {
				ns.exec("unlock.js", host, 1, node.hostname)
			}
			catch (error) {
				ns.tprintf('Failed executing unlock.js: %s', node.hostname)
			}
		}

		let files = ["main.js"]                                                            // find and kill any running scripts... 
		let scripts = ns.ps(node.hostname)                                                 // ...ditrected at the node.hostname...
		files.forEach(file => {                                                            // ...before the batcher executes new scripts
			scripts.forEach(script => {
				if (script.filename == file && script.args[0] == node.hostname) {
					ns.print("script.filename: " + script.filename)
					ns.print("script.args: " + script.args)
					ns.print("script.pid: " + script.pid)
					ns.kill(script.pid)
					ns.print(" ")
				}
			})
		})

		// Copies files to target node //
		// TODO: array of files => scan files => file_config.xml

		ns.scp("_nodes.js", node.hostname, "home");
		ns.scp("batcher.js", node.hostname, "home");
		ns.scp("main.js", node.hostname, "home");
		ns.scp("sub/hack.js", node.hostname, "home");
		ns.scp("sub/grow.js", node.hostname, "home");
		ns.scp("sub/weaken.js", node.hostname, "home");
		ns.scp("unlock.js", node.hostname, "home");

		/* if (!node.purchasedByPlayer){
				node.hostname.contains("hacknet")? => !hacknet.js?running => exec('hacknet.js')

				}
		*/

		if (!node.purchasedByPlayer) {
			try {
				ns.exec("main.js", node.hostname, 1, node.hostname)
			}
			catch (error) {
				ns.tprintf('Failed executing main.js: %s', node.hostname)
			}
		}
	})

	//console.log(nodes)


}