/** @param {NS} ns */

/*

LINE UP ORIGINAL SEQ:
]    hackDelay       |= hack ====================|= hack ====================|= hack ====================|= hack ====================|[
]|=weaken 1 ======================================| wGAP |=weaken'1 ======================================| wGAP |=weaken"1 ==========[
]    weakDelay               |=weaken 2 ======================================| wGAP |=weaken 2'======================================[
]    growDelay1  |= grow1==========================|       growGap       |= grow1==========================|       growGap       |= gr[
]2s|=weaken 3 ======================================|wGapG |=weaken 3'======================================|wGapG |=weaken 3'========[
]    growDelay2                              |= grow2==========================|       growGap       |= grow2=========================[
]    weakDelay4                |=weaken 4 ======================================|wGapG|=weaken 4 =====================================[


LINE UP FINISH SEQ: HWGWWGW
]+hackDelay++++++++++|==hack=====================| ~B~E~L~O~W~ ~ ~ ~ ~ ~ ~ ~ |==hack=====================| ~B~E~L~O~W~ ~ ~ ~ ~ ~ ~ ~ |[
]|==weaken=1======================================|-wGH--|==weaken=1======================================|-wGH--|==weaken=1==========[
]+growDelay1+++++|==grow=1=========================|-growGap-------------|==grow=1=========================|-growGap-------------|==gr[
]2s|==weaken=3======================================|-wGG--|==weaken=3======================================|-wGG--|==weaken=3========[
]+A~B~O~V~E~ ~ ~ ~ ~ | ~A~B~O~V~E~ ~ ~ ~ ~ ~ ~ ~ |==hack=====================| ~A~B~O~V~E~ ~ ~ ~ ~ ~ ~ ~ |==hack=====================|[
]+weakDelay2+++++++++++++++++|==weaken=2======================================|-wGG--|==weaken=2======================================[
]+growDelay2+++++++++++++++++++++++++++++++++|==grow=2=========================|-growGap-------------|==grow=2========================[
]+weakDelay4+++++++++++++++++++|==weaken=4======================================|-wGG--|==weaken=4====================================[

LINE UP START SEQ:WWGHWWG
]|==weaken=1======================================|-wGH--|==weaken=1======================================|-wGH--|==weaken=1==========[
]2s|==weaken=3======================================|-wGG--|==weaken=3======================================|-wGG--|==weaken=3========[
]+growDelay1+++++|==grow=1=========================|-growGap-------------|==grow=1=========================|-growGap-------------|==gr[
]+hackDelay++++++++++|==hack=====================| ~B~E~L~O~W~ ~ ~ ~ ~ ~ ~ ~ |==hack=====================| ~B~E~L~O~W~ ~ ~ ~ ~ ~ ~ ~ |[
]+weakDelay2+++++++++++++++++|==weaken=2======================================|-wGG--|==weaken=2======================================[
]+weakDelay4+++++++++++++++++++|==weaken=4======================================|-wGG--|==weaken=4====================================[
]+growDelay2+++++++++++++++++++++++++++++++++|==grow=2=========================|-growGap-------------|==grow=2========================[


spacer = 25

weakDelay1 = 0

hackDelay = weakTime - hackTime - 25

weakDelay2 = hackDelay + 2 * hackTime - weakTime + 25

weakGapHack = 2 * hackTime - weakTime + 25

weakDelay3 = 2 * spacer

weakDelay4 = growDely2 + growtime -weaktime + 25

weakGapGrow = 

growDelay1 = weakTime - growTime - 25

growDelay2 = weakDelay2 + weakTime + spacer

growGap = 2 * hackTime - growTime


hack() = 812.3547830660004
weaken() = 3249.4191322640017
grow() = 2599.5353058112014


W1 = 0                                timer = start
|                                     sleep(2*gap)
W2 = 2*gap                            exec(W2) 
|                                     sleep(weakTime - growTime + gap)
G = weakTime - growTime + gap         exec(G)
|                                     sleep(weakTime - hackTime - gap)
H = weakTime - hackTime - gap         exec(H)
|
*/



export async function main(ns) {

  ns.tail()
  ns.clearLog()
  const target = ns.args[0];
  const threads = ns.args[1];
  const host = ns.getHostname()
  const gap = 25

  let files = ["sub/weaken.js","sub/grow.js","sub/hack.js"]                           // find and kill any running scripts... 
  let scripts = ns.ps(host)                                                           // ...ditrected at the target...
                                                                                       
    files.forEach(file =>{                                                            // ...before the batcher executes new scripts
    scripts.forEach(script => {
      if (script.filename == file && script.args[0] == target) {
        
        ns.print("script.filename: " + script.filename)
        ns.print("script.args: " + script.args)
        ns.print("script.pid: " + script.pid)
        ns.kill(script.pid)
        ns.print(" ")
        
      }
    })
  })
  
  let hackTime = ns.getHackTime(target)
  ns.print("hackTime: " + hackTime)
  ns.print(" ")

  let weakTime = ns.getWeakenTime(target)
  ns.print("weakTime: " + weakTime)
  ns.print(" ")  

  let growTime = ns.getGrowTime(target)
  ns.print("growTime: " + growTime)
  ns.print(" ")

  ns.exec("sub/weaken.js", host, threads, target);                                      // weaken1() => ns.exec("sub/weaken.js", host, threads, target, interval)
  ns.exec("sub/weaken.js", host, threads, target, 2 * gap);                             // weaken2()
  ns.exec("sub/grow.js", host, threads, target, weakTime - growTime + gap);             // grow()
  ns.exec("sub/hack.js", host, threads, target, weakTime - hackTime - gap);             // hack()


}
