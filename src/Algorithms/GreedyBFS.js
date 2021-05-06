
        export const algorithmBFS = (values) =>{
            const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
            const path = [];
            const shortestPath = [];
            
            const q1 = [];
            const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
            const parent = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill([-1,-1]));
             //implement queue using a vector/array
            q1.push([startY,startX]);
            q1.push([-1,-1]);
            parent[startY][startX] = [startY,startX];
            let found = false;
    
            while(q1.length !== 0){
                const currentNode = q1[0];
                q1.shift();
    
                if(currentNode[0] === -1){
                    if(q1.length === 0){break;}
                    q1.push([-1,-1]);
                    continue;
                }
                const i = currentNode[0];
                const j = currentNode[1];
                if(i === endY && j === endX){ found = true; break;}
                path.push([i,j]);
                vis[i][j] = 1;
    
                const adj = [
                    [1,0],[0,1],[-1,0],[0,-1]
                ]
                for(let k=0;k<4;k++){
                    const newY = adj[k][0] + i;
                    const newX = adj[k][1] + j;
                    if(newX < xNodes && newX >=0 && newY < yNodes && newY >=0 && !vis[newY][newX] && !nodes[newY][newX].isWall){
                        q1.push([newY,newX]);
                        vis[newY][newX] = 1;
                        parent[newY][newX] = [i,j];
                    }
                }
            }
            if(!found){return [path,[],found];}
            let currentY = endY;
            let currentX = endX;
            while(parent[currentY][currentX][0] !== currentY ||  parent[currentY][currentX][1] !== currentX){
                
                [currentY,currentX] = parent[currentY][currentX];
                shortestPath.push([currentY,currentX]);
            }
            shortestPath.reverse();
            return [path,shortestPath,found,];
            
        }
        