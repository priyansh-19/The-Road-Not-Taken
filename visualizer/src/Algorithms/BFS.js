
        export const algorithmBFS = (values) =>{
        const {startX,startY,endX,endY,xNodes,yNodes,nodes} = values;
        const path = [];
        const q1 = [];
        const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
         //implement queue using a vector/array
        q1.push([startY,startX]);
        q1.push([-1,-1])

        while(q1.length !== 0){
            const currentNodeIndex = q1[0];
            q1.shift();

            if(currentNodeIndex[0] === -1){
                if(q1.length === 0){break;}
                q1.push([-1,-1]);
                continue;
            }
            const i = currentNodeIndex[0];
            const j = currentNodeIndex[1];
            if(i === endY && j === endX){break;}
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
                }
            }
        }
        return path;
        
    }
    