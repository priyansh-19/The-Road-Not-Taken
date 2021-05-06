export const algorithmBellmanFord = (values) => {
    const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
    // we shall run this n - 1 times, n being the number of vertices
    const INF = 1e9+7;
    let distance = new Array(yNodes).fill().map( ()=> new Array(xNodes).fill(INF) );
    let parent = new Array(yNodes).fill().map( ()=> new Array(xNodes).fill([-1,-1]));
    const adj = [[-1,0],[0,1],[1,0],[0,-1]];
    let comparisons = 0;
    
    const iterations  = xNodes*yNodes ;
    distance[startY][startX] = 0;
    parent[startY][startX]  = [startY,startX];
    for(let k=0;k<iterations;k++){
        //create vis here
        let relaxed = false;
        let vis = new Array(yNodes).fill().map( () => new Array(xNodes).fill(0));
        for(let i=0;i<yNodes;i++){
            for(let j=0;j<xNodes;j++){
                if(vis[i][j] || nodes[i][j].isWall){continue;}
                vis[i][j] = 1;
                comparisons ++ ;
                for(let k1=0;k1<4;k1++){
                    let i1 = i + adj[k1][0];
                    let j1 = j + adj[k1][1];
                    if(i1 >= 0 && j1 >=0 && i1 < yNodes && j1 < xNodes && !nodes[i1][j1].isWall && distance[i1][j1] > distance[i][j] + nodes[i1][j1].weight){
                        relaxed = true;
                        distance[i1][j1] = distance[i][j] + nodes[i1][j1].weight;
                        parent[i1][j1] = [i,j];
                    }
                }
            }
        }
        if(!relaxed){break;}
    }
    let found = true;
    if(distance[endY][endX] === INF){console.log("No Path Found");found  = false;}
    if(!found){return [[],[],found];}

    let shortestPath = [];
    let currentY = endY;
    let currentX = endX;
    while(parent[currentY][currentX][0] !== currentY ||  parent[currentY][currentX][1] !== currentX){
        [currentY,currentX] = parent[currentY][currentX];
        shortestPath.push([currentY,currentX]);
    }
    shortestPath.reverse();
    return [[[startY,startX]],shortestPath,found,comparisons]
    }


