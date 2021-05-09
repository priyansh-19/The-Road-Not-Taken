
     export const algorithmBFS2D = (values) =>{
        const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
        const path = [];
        const shortestPath = [];
        
        const q1 = [];
        const q2 = [];
        const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
        const parent = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill([-1,-1]));
         //implement queue using a vector/array
        q1.push([startY,startX]);
        q2.push([endY,endX]);

        parent[startY][startX] = [startY,startX];
        parent[endY][endX] = [endY,endX];
        let found = false;
        let resNodeSource = [];
        let resNodeTarget = [];
        while(q1.length !== 0 && q2.length!==0){
            const currentNodeS = q1[0];
            const currentNodeD = q2[0];
            q1.shift(); q2.shift();

            const i1 = currentNodeS[0];
            const j1 = currentNodeS[1];
            const i2 = currentNodeD[0];
            const j2 = currentNodeD[1];

            // path.push([i1,j1]);
            // path.push([i2,j2]);

            if(vis[i1][j1] == 2 || vis[i2][j2] == 1){
                found = true;break;
            }
            vis[i1][j1] = 1;
            vis[i2][j2] = 2;

            const adj = [
                [1,0],[0,1],[-1,0],[0,-1]
            ]
            for(let k=0;k<4;k++){
                let newY = adj[k][0] + i1;
                let newX = adj[k][1] + j1;
                if(newX < xNodes && newX >=0 && newY < yNodes && newY >=0 && vis[newY][newX] !== 1 && !nodes[newY][newX].isWall){
                    if(vis[newY][newX] == 2){
                        resNodeSource = [i1,j1];
                        resNodeTarget = [newY,newX];
                        found = true; break;
                    }
                    path.push([newY,newX,0]);
                    q1.push([newY,newX]);
                    vis[newY][newX] = 1;
                    parent[newY][newX] = [i1,j1];
                }
                newY = adj[k][0] + i2;
                newX = adj[k][1] + j2;
                if(newX < xNodes && newX >=0 && newY < yNodes && newY >=0 && vis[newY][newX] !== 2 && !nodes[newY][newX].isWall){
                    if(vis[newY][newX] == 1){
                        resNodeSource = [newY,newX];
                        resNodeTarget = [i2,j2];
                        found = true; break;
                    }
                    path.push([newY,newX,1]);
                    q2.push([newY,newX]);
                    vis[newY][newX] = 2;
                    parent[newY][newX] = [i2,j2];
                }
            }
            if(found){break;}
            
        }
        if(!found){return [path,[],found];}
        let currentY = resNodeSource[0];
        let currentX = resNodeSource[1];
        while(parent[currentY][currentX][0] !== currentY ||  parent[currentY][currentX][1] !== currentX){
            
            shortestPath.push([currentY,currentX]);
            [currentY,currentX] = parent[currentY][currentX];
        }
        shortestPath.reverse();
        currentY = resNodeTarget[0];
        currentX = resNodeTarget[1];
        while(parent[currentY][currentX][0] !== currentY ||  parent[currentY][currentX][1] !== currentX){
            
            shortestPath.push([currentY,currentX]);
            [currentY,currentX] = parent[currentY][currentX];
        }
        shortestPath.push([endY,endX]);
        return [path,shortestPath,found];
    }
    