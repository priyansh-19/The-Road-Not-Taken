export const algorithmDijkstras = (values) =>{
    const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
    const path = [];
    const shortestPath = [];
    const q1 = [];
    const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
    const distance = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(10000));
    const parent = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill([-1,-1]));
    const adj = [[-1,0],[0,1],[1,0],[0,-1]]

    distance[startY][startX] = 0;
    q1.push([0,startY,startX]);
    parent[startY][startX] = [startY,startX];
    let found = false;

    while(q1.length !== 0){
        q1.sort( (a,b) =>{
            return a[0] - b[0];
        });

        const i = q1[0][1];
        const j = q1[0][2];
        q1.shift();

        if(i === endY && j === endX){
            found = true;
            break;
        }
        path.push([i,j]);

        for(let k=0;k<4 ;k++){
            const newY = adj[k][0] + i;
            const newX = adj[k][1] + j;
            if(newX < xNodes && newX >=0 && newY < yNodes && newY >=0 && !vis[newY][newX] && !nodes[newY][newX].isWall){
               const adjNodeDistance = distance[newY][newX];
               const currentDistance = distance[i][j];
               const newDistance  = currentDistance + nodes[newY][newX].weight;
               if(newDistance < adjNodeDistance){
                   q1.push([newDistance,newY,newX]);
                   distance[newY][newX] = newDistance;
                   parent[newY][newX] = [i,j];
               }
            }
        }
        vis[i][j] = true;
    }
 
    if(!found){return [path,[],found];}
    let currentY = endY;
    let currentX = endX;
    while(parent[currentY][currentX][0] !== currentY ||  parent[currentY][currentX][1] !== currentX){
        [currentY,currentX] = parent[currentY][currentX];
        shortestPath.push([currentY,currentX]);
    }
    shortestPath.reverse();
    return [path,shortestPath,found];
}