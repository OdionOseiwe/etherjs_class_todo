import getContract from "./utils/getContract.js";
const { ethers: etherjs } = ethers;

const signerProvider = new etherjs.providers.Web3Provider(window.ethereum);
 const signer = signerProvider.getSigner();

const connectWallet = async () => {
  await signerProvider.send("eth_requestAccounts");
  await getUserWallet();
};

const getUserWallet = async () => {
  let userAddress = await signer.getAddress();
  //   connectedWallet = userAddress;
  updateUserAddress(userAddress);
  return userAddress;
  //   console.log(connectedWallet, "connected wallet");
};

function updateUserAddress(address) {
  userAdd.innerText = address;
}

connect.addEventListener("click", connectWallet);


async function getTodoList() {
  const contract = getContract();
  try {
    const response = await contract.getTodos();
    const formatted = response.map((item) => {
      return {
        name: item[0],
        description: item[1],
        status: item[2],
      };
    });
    return formatted;
  } catch (error) {
    console.log("error", error);
  }
}


const upadateTodoUI = async () => {
  const data = await getTodoList();
  data.forEach((item) => {
    todos.innerHTML += `   
    <li class='my-2'>${item.description}</li>`;
  });
};

upadateTodoUI();

// add new list

//////////////////////////////////////////////////////////////////////////////////////

async function createtodo(title, des){
  const contract = getContract(true);
  try{
    const list = await contract.createTodo(title, des);
    console.log(list);
  }catch (error){
    console.log("errr", error)
  }
}


formList.addEventListener("submit",(event)=>{
  event.preventDefault();
  createtodo(formList.input.value, formList.input.value);
});


///////////////////////////////////////////////////////////get all todo////////////////////////////////////////////////////////////////
async function getall(){
  const contract = getContract();
  try{
    const gets = await contract.getTodos()
    const all = gets.map((get)=>{
      return{
        name:get[0],
        description:get[1],
        status:get[2],
      }
    })
    console.log(all);
    return all;
  }catch(error){
    console.log("errr", error)
  }
}

getall()

/////////////////////////////////////////////////////////update////////////////////////////////////////////////////////////////////////////////
async function update(index, input, des){
  const contract = getContract(true);
  try{
    const update = await contract.updateTodo(index, input, des);
    console.log(update);
  }catch(error){
    console.log("errr", error);
  }
}

formList2.addEventListener("submit",(event)=>{
  event.preventDefault();
  update(formList2.index.value, formList2.input2.value, formList2.description.value);
});


//////////////////////////////////////////////////////////////getSingleTodo//////////////////////////////////////////////////////////////////

async function getSingleTodo(index){
  const contract = getContract();
  try{
    const getSingleTodo = await contract.getSingleTodo(index);
    console.log(getSingleTodo);
  }catch(error){
    console.log("errr", error);
  }
}

formList3.addEventListener("submit",(event)=>{
  event.preventDefault();
  getSingleTodo(formList3.input3.value);
});

