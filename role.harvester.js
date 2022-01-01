module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.say('🚧 Harvester');
                let sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
                if (sites.length) {
                    if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    // if nothing to do, go idle around spawn to not block the energy sources
                    creep.moveTo(Game.spawns['Spawn1'])
                }
            }

            // TODO: 
            // Add some part where it will act as a builder to accomodate itself


        }
	}
}