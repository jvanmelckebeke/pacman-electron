const log = require('electron-log');

module.exports = {
    PathFinder: (grid, gridHeight, gridWidth) => {
        function getTile(x, y, ncost) {
            for (let closedItem of closedList) {
                if (closedItem.x === x && closedItem.y === y) return closedItem;
            }
            for (let openItem of openList) {
                if (openItem.x === x && openItem.y === y) return openItem;
            }
            return {x: x, y: y, cost: ncost};
        }

        /* grid;
         gridHeight;
         gridWidth;
         startTile;
         endTile;

         /!** Array of the already checked tiles. *!/
         closedList = [];
         openList = [];*/

        log.info('activated');
        let openList = [];
        let closedList = [];
        let startTile, endTile;


        function searchPath(start, end, callback) {
            end.cost = 0;
            end.total = 0;
            startTile = start;
            endTile = end;

            /** Path validation */
            if (grid[start.y][start.x] === 0) {
                log.warn('The start tile in not walkable, choose different tile than', start, grid[start.y][start.x]);
                callback([]);
            }
            if (grid[end.y][end.x] === 0) {
                log.warn('The end tile in not walkable, choose different tile than', end);
                callback([]);
            }
            /** Start A* Algorithm */
            start.cost = 1;
            start.total = 1;
            /** Add the starting tile to the openList */
            openList.push(start);


            let currentTile;
            while (openList.length > 0) {
                // log.info('openlist = ', openList);
                //current node = node for open list with the lowest cost.
                currentTile = getTileWithLowestTotal();
                // log.info('currenttile', currentTile);
                //if the currentTile is the endTile, then we can stop searching
                if (currentTile.x === end.x && currentTile.y === end.y) {
                    // log.info('found you');
                    end.cost = currentTile.cost + 1;
                    end.total = currentTile.total + 1;
                    shortestPath(callback);
                }
                else {
                    // log.info('currentTile', currentTile);
                    closedList.push(currentTile);
                    openList.splice(openList.indexOf(currentTile), 1);
                    getAdjacentTiles(currentTile, (adjacentTiles) => {
                        // log.info('adjecentTiles: ', adjacentTiles);
                        for (let adjacentTile of adjacentTiles) {
                            //Get tile is not in the open list
                            if (notIncludesOpenListNorClosedList(adjacentTile)) {
                                //move it to the open list and calculate cost
                                //calculate the cost
                                adjacentTile.cost = currentTile.cost + 1;

                                //calculate the manhattan distance
                                adjacentTile.heuristic = manhattanDistance(adjacentTile);

                                // calculate the total amount
                                adjacentTile.total = adjacentTile.cost + adjacentTile.heuristic;

                                openList.push(adjacentTile);
                            }
                        }
                    });
                }
            }
            log.warn('no path found');
        }

        function inClosedListOrOpenList(tile) {
            for (let closedItem of closedList) {
                if (closedItem.x === tile.x && closedItem.y === tile.y) return true;
            }
            for (let openItem of openList) {
                if (openItem.x === tile.x && openItem.y === tile.y) return true;
            }
            return false;
        }

        function getTileWithLowestTotal() {
            let tileWithLowestTotal = {};
            let lowestTotal = 999999999;
            /** Search open tiles and get the tile with the lowest total cost */
            for (let openTile of openList) {
                if (openTile.total <= lowestTotal) {
                    //clone lowestTotal
                    lowestTotal = openTile.total;
                    tileWithLowestTotal = openTile;
                }
            }
            return tileWithLowestTotal;
        }

        function getAdjacentTiles(current, callback) {
            let adjacentTiles = [];
            let adjacentTile = {};
            let ncost = current.cost + 1;
            // log.debug('ncost', ncost);
            //Tile to left
            if (current.x - 1 >= 0) {
                adjacentTile = grid[current.y][current.x - 1];
                if (adjacentTile !== 0) {
                    adjacentTiles.push(getTile(current.x - 1, current.y, ncost));
                }
            }

            //Tile to right
            if (current.x + 1 < gridWidth) {
                adjacentTile = grid[current.y][current.x + 1];
                if (adjacentTile !== 0) {
                    adjacentTiles.push(getTile(current.x + 1, current.y, ncost));
                }
            }

            //Tile to Under
            if (current.y + 1 < gridHeight) {
                adjacentTile = grid[current.y + 1][current.x];
                if (adjacentTile !== 0) {
                    adjacentTiles.push(getTile(current.x, current.y + 1, ncost));
                }
            }

            //Tile to Above
            if (current.y - 1 >= 0) {
                adjacentTile = grid[current.y - 1][current.x];
                if (adjacentTile !== 0) {
                    adjacentTiles.push(getTile(current.x, current.y - 1, ncost));
                }
            }
            // log.debug('boo adjacentTiles:', adjacentTiles);
            callback(adjacentTiles);
        }

        /** Calculate the manhattan distance */
        function manhattanDistance(adjacentTile) {
            return Math.abs((endTile.x - adjacentTile.x) + (endTile.y - adjacentTile.y));
        }

        function removeElement(tile) {
            for (let closedItemIndex in closedList) {
                if (closedList.hasOwnProperty(closedItemIndex))
                    if (closedList[closedItemIndex].x === tile.x && closedList[closedItemIndex].y === tile.y) {
                        closedList.splice(closedItemIndex, 1);
                        return;
                    }
            }
            for (let openItemIndex in openList) {
                if (openList.hasOwnProperty(openItemIndex))
                    if (openList[openItemIndex].x === tile.x && openList[openItemIndex].y === tile.y) {
                        openList.splice(openItemIndex, 1);
                        return;
                    }
            }
        }

        function shortestPath(callback) {
            let startFound = false;
            let currentTile = endTile;
            let pathTiles = [];

            //includes the end tile in the path
            pathTiles.push(endTile);
            while (!startFound) {
                getAdjacentTiles(currentTile, (adjacentTiles) => {
                    // log.info('adjacent Tiles when reconstructing path', adjacentTiles);
                    for (let adjacentTile of adjacentTiles) {
                        //check if it is the start tile
                        if (adjacentTile.x === startTile.x && adjacentTile.y === startTile.y) {
                            callback(pathTiles);
                            return;
                        }

                        //it has to be inside the closedList or openList
                        if (inClosedListOrOpenList(adjacentTile)) {
                            // log.debug(`cost of adjacentTile ${JSON.stringify(adjacentTile)} is ${adjacentTile.cost}`);
                            if (adjacentTile.cost <= currentTile.cost && adjacentTile.cost > 0) {
                                //change the current tile.
                                currentTile = adjacentTile;
                                //Add this adjacentTile to the path list
                                pathTiles.push(adjacentTile);
                            }
                        }
                    }
                    log.info('pathTiles:', pathTiles);
                });
            }

        }

        function notIncludesOpenListNorClosedList(adjacentTile) {
            for (let openItemIndex in openList) {
                if (adjacentTile.x === openList[openItemIndex].x && adjacentTile.y === openList[openItemIndex].y) {
                    return false;
                }
            }
            for (let closedItem in closedList) {
                if (adjacentTile.x === closedList[closedItem].x && adjacentTile.y === closedList[closedItem].y) {
                    return false;
                }
            }
            return true;
        }

        return {
            searchPath: (start, end, clback) => searchPath(start, end, clback),
        };
    }
};