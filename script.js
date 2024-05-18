const boxes=document.querySelectorAll(".box");
const currentPlayer=document.querySelector("[turn]");
const newGameBtn=document.querySelector(".btn");

let cp;
let gameGrid;
//  game grid taki ye rakh pae ki saare fill hue hai ya ni
const winningPositions=[[0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]];


function gameinit()
{
    cp="X";
    console.log("function gameinit called") ;
    currentPlayer.innerText=`Current Player-${cp}`;
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>
    {
        boxes[index].innerText="";
        boxes[index].style.pointerEvents="all";
        boxes[index].classList.remove("win");

        //    or  initial css property dedo
        // box.classList=`box box${index+1}`;

    })
    newGameBtn.classList.remove("active");

}
gameinit();

function swapTurn()
{
    if(cp==="X")
        {
            cp="0";
        }
    else
    {
        cp="X";
    }

    currentPlayer.innerText=`Current-Player-${cp}`;

}
function handleClick(index)
{
    if(gameGrid[index]==="")
        {
            // console.log(" box ",index);
            boxes[index].innerText=cp;
            // box me update krna mtlb ui par update krna
            //gamegrid me krna mtlb backend me krna
            gameGrid[index]=cp;
            boxes[index].style.pointerEvents="none";


            swapTurn();

            //check kro koi jeeta to ni;
            checkGameOver(); 




        } 


}

function checkGameOver()
{
    // newGameBtn.classList.add("active");
    let ans="";
    winningPositions.forEach((position)=>
    {
        //all 3 boxes should be not empty and same;
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" &&gameGrid[position[2]]!=="" ) 
            &&(gameGrid[position[0]]===gameGrid[position[1]] ) &&(gameGrid[position[1]]===gameGrid[position[2]] ))
        {
            //check winner x
            if(gameGrid[position[0]]==="X")
                {
                    ans="X";
                }
                else{
                    ans="0";

                }

                
            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }

    });

    if(ans!=="")
        {
            //means we have winner
            currentPlayer.innerText=`Winner Player ${ans }`;
            newGameBtn.classList.add("active");
            //winner mil gaya to saare boxes ko pointer events
            boxes.forEach((box)=>
            {
                box.style.pointerEvents="none";
            })
            return;
        }


        //when game tie
        let fillcount=0;
        gameGrid.forEach((box)=>
        {
            if(box!="")
                fillcount++;
        });

        if(fillcount==9)
            {
                currentPlayer.innerText="Game Tied";
                newGameBtn.classList.add("active");
            }
      



}

boxes.forEach((box,index) =>
    {
        box.addEventListener("click",()=>
        {
            // console.log(" box clicked",index); 
            handleClick(index);
        })
         
    })
newGameBtn.addEventListener("click",()=>
{
    gameinit(); 
})
 
