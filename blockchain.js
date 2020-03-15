
const SHA256=require('crypto-js/SHA256')


var chain=[]

function hash(input)
{return SHA256(input).toString()}

function getLatestBlock(arr){

return arr[arr.length-1]

}

function  addBlock(newblock){                                      //newblock is a Block object

  newblock.previousHash=getLatestBlock(chain).hash
  newblock.hash= hash(newblock.index+newblock.previousHash+newblock.timestamp+JSON.stringify(newblock.data)).toString()
  chain.push(newblock)
}


function Block(index,timestamp, data, previousHash = '')                        //creating block object.previousHash is string
{



    this.index=index
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash=hash(index+previousHash+timestamp+JSON.stringify(data)).toString()




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
 console.log(JSON.stringify(chain))
 console.log(ischainValid(chain))

 chain[1].data={amount:100}
 console.log(chain)
console.log(ischainValid(chain))                            //now chain not valid



}
main()
