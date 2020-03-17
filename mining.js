
const SHA256=require('crypto-js/SHA256')


var chain=[]

function hash(input)
{return SHA256(input).toString()}

function getLatestBlock(arr){

return arr[arr.length-1]

}

function Block(index,timestamp, data, previousHash = '')                        //creating block object.previousHash is string
{



    this.index=index
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;

    this.nonce=0
    this.hash=hash(index+previousHash+timestamp+JSON.stringify(data)+this.nonce).toString()




}

function mineBlock(newblock,difficulty){

  while(newblock.hash.substring(0,difficulty)!=Array(difficulty+1).join('0'))                   //to make sure first few digits are 0.the nonce is to keep adding to string till we get a certain number of 0 infront.difficulty=no of 0.
  {
    newblock.nonce++
    newblock.hash=hash(newblock.index+newblock.previousHash+newblock.timestamp+JSON.stringify(newblock.data)+newblock.nonce).toString()

  }

  console.log("Block mined "+newblock.hash)

  }

function  addBlock(newblock){                                      //newblock is a Block object

  newblock.previousHash=getLatestBlock(chain).hash
  mineBlock(newblock,5)
  chain.push(newblock)
}






function ischainValid(arr){

  for(var i=1;i<arr.length;i++)
  {
      const currentBlock=arr[i]
      const previousBlock=arr[i-1]

      if(currentBlock.hash != hash(currentBlock.index+currentBlock.previousHash+currentBlock.timestamp+JSON.stringify(currentBlock.data)).toString())
       {return false}

       if(currentBlock.previousHash != previousBlock.hash)
        {return false}

  }
  return true

}




function main(){

  chain.push(new Block(0,"2020-03-15T06:05:45.117Z","Genesis Block","0"))      //adding genesis block into chain

  addBlock(new Block(1,"2020-03-15T06:46:02.957Z",{amount:4}))                                                                //index=1
  addBlock(new Block(2,"2020-03-15T06:47:20.053Z",{amount:10}))                                                                                                                                //index=2
 console.log(chain)






}
main()
