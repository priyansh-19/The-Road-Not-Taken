

const heuristic = (i,j,ei,ej) =>{
    //this is the manhattan heuristic 
    return (Math.abs(ei-i) + Math.abs(ej - j) )*(1.2);
}

export const algorithmAstar = (values) =>{
    const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
    const path = [];
    const q1 = [];
    const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
    const shortestPath = [];

    let distance = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(
        {
            g:10000,
            h:10000,
            f:10000
        }
    ));
    const parent =  new Array(yNodes).fill(0).map(() => new Array(xNodes).fill([-1,-1]));
    const adj = [[-1,0],[0,1],[1,0],[0,-1]]

    distance[startY][startX] = {g:0,h:0,f:0};

    q1.push([distance[startY][startX].f,startY,startX]);
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
                const gNew = distance[i][j].g + nodes[newY][newX].weight;
                const hNew = heuristic(newY,newX,endY,endX);
                const fNew = gNew + hNew;
                const fOld = distance[newY][newX].f;
                if(fNew < fOld){
                    distance[newY][newX] = {g:gNew,h:hNew,f:fNew}
                    q1.push([fNew,newY,newX]);
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
    return [path,shortestPath,found]
}