let found = false;
const dfs = (i,j,n,m,endY,endX,path,vis,nodes) => {
    if(i>=n || j>=m || i<0 || j<0 || vis[i][j]){return ;}
    if(i === endY && j === endX){found = true ;return;}
    vis[i][j] = true;
    path.push([i,j]);

    const adj = [[-1,0],[0,1],[1,0],[0,-1]]
    for(let k=0;k<4 && !found ;k++){
        const newY = adj[k][0] + i;
        const newX = adj[k][1] + j;
        if(newX < m && newX >=0 && newY < n && newY >=0 && !vis[newY][newX] && !nodes[newY][newX].isWall){
           dfs(newY,newX,n,m,endY,endX,path,vis,nodes);
           vis[newY][newX] = true;
    
        }
    }
}

export const algorithmDFS = (values) =>{
    const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
    const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
    const path = [];
    // const shortestPath =  [];
    dfs(startY,startX,yNodes,xNodes,endY,endX,path,vis,nodes);
    const isFound = found;
    found = false;
    const shortestPath = (isFound) ? path : [] ;
    return [path,shortestPath,isFound];

}