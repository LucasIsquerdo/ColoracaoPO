const List = [];// A,B,C,D
var fila = [];
var filaAux = [];
var linha = [];
var coluna = [];
var array = []
var onlyLettersList = []
var connectionList = []
var valuesListSplit = []
var searchReturn = []
var graphT = []
var graphV = []
var graphD = []
var visit
var reviewList=[]
var spreeNode = []
var verifyArray = []
var finalListValues = []
var valuesList = []
var solveArray = []
var length
var colorsF

function sendForm()
{
    createList()
    insertConnections()
}

function insertConnections()//envia as arestas
{
  var length = document.getElementById("vertices").value;
  var table="";
  table+=`<label>Informe as ligações</label><br>`
  for (let j=0;j<length;j++)
    table+=
    `<label>${List[j]}</label>
    <input type="text" placeholder="Separe por virgula" id="${"value"+j}"/><p></p>`;
  
  table+= `<p></p><button onclick="generateArray()">Enviar</button>`
  document.getElementById("connections").innerHTML=table;
}

function generateArray()
{
    length = document.getElementById("vertices").value;
    for(let j=0; j<length; j++)
    {
      const arrayList = new Array();
      arrayList.push(List[j])
      let index = document.getElementById("value"+j).value;
      for(let k=0; k<index.length; k++)
      {
        if(index[k] !== ",")
        {    
            arrayList.push(index[k].toUpperCase());
        }
      }
      array.push(arrayList)
    
    }
    MaiorPrimeiro()
    for(let y =0; y<array.length;y++)
    {
      var ListSplit = array[y];
      let first = ListSplit[0]
      for(let x=1; x<ListSplit.length;x++)
      {
        onlyLettersList.push(first+","+ListSplit[x])
        connectionList.push("("+first+", "+ListSplit[x]+")")
      }
    }
    // console.log(connectionList);
    verificaTipo(); //verificar se é completo
    ShowList()
}

function ShowList()//exibe a lista do grafo
{
  
  var content = ""
  content+=`<h4>Representação em Lista:</h4><p></p>`
  var aux = 0
  for(let i=0;i<array.length;i++)
  {
    var separate = array[i].toString()
    var first = separate.split(",")
    content+=`<p>[ ${first[0]} ]`
    for(let j=1;j<first.length;j++)
    {
        content+=` --> [ ${first[j]} |  ]`
        
        aux++
      
    }
    content+=` --> [ / ]`
    content+=`</p>`
    
  }
  var graph = []
  for(let i = 0; i<array.length;i++)
  {
    var separate = array[i].toString()
    var first = separate.split(",")
    var aux = first[0]
    array[i].shift()
    graph[aux] = array[i]
    
  }
  console.log(searchReturn);
  console.log(searchReturn);
  console.log(graphT)
  var table="";
  table+=`<thead>
            <tr>
            <th scope="row">Tabela</th>
            
            `
        var length = document.getElementById("vertices").value
        for(let x=0;x<length;x++)
        {
          table+=`<th scope="col">${x+1}</th>`
        }
        table+=`</tr>
        </thead>`
    let z = 0
    while(z<graphT.length)
    {
        var separate = graphT[z].toString()
        var first = separate.split(",")
        var firstPos = searchReturn.indexOf(first[1])+1
        var secondPos = searchReturn.indexOf(first[0])+1
        valuesList.push(first[0]+"|"+firstPos+","+first[1]+"|"+secondPos)    
        z++
    }
  var length = document.getElementById("vertices").value
//   console.log(valuesList);
  for(let vert=0;vert<length;vert++)
  {
    var letter = List[vert]
    // console.log("Letra: "+letter);
    var menor = 99999
    for(graphPos = 0; graphPos<valuesList.length; graphPos++)
    {
        
        if(valuesList[graphPos].includes(","+letter+"|"))
        {
            var separate = valuesList[graphPos].toString()
            var first = separate.slice(4)
            var pipe = first.slice(2)
            if(parseInt(pipe)<menor)
            {    menor = parseInt(pipe)
                finalListValues.push(menor)
            }
            // console.log("Value: "+pipe)
        }
        else if(valuesList[graphPos].includes(letter+"|"))
        {
            var separate = valuesList[graphPos].toString()
            var first = separate.slice(0,-4)
            var pipe = first.slice(2)
            if(parseInt(pipe)<menor)
            {    menor = parseInt(pipe)
                finalListValues.push(menor)
            }
            // console.log("Value: "+pipe)
        }
        
    }
    if(menor==99999)
        finalListValues.push(menor)
  }
//   console.log(finalListValues)
  var auxArray
  table+=`<tbody>`
  for(let i=0;i<length;i++)
  {
    auxArray = []
    let y = 0
    let flag = false
    while(y<searchReturn.length && flag == false)
    {
        if(searchReturn[y] == List[i])
            flag = true
        else
            y++
    }
    auxArray.push(y+1)
    auxArray.push(finalListValues[i])
    reviewList.push(auxArray)
    if(i==length-1)
    {
        verify()
        var difference = searchReturn.filter(x => !spreeNode.includes(x));
        for(let pos=0; pos<length;pos++)
        {
            if(difference.includes(List[pos]))
                reviewList[pos].push(99999)
        }
        // reviewList[reviewList.length-1].push(99999)
        //console.log(reviewList);
        postOrder()
        
    }
  }
  //solve()
//   MaiorPrimeiro()
  verifyArray.push(difference)
  solve()
  console.log(colorsF);
  for(let y=0; y<length;y++)
  {
    table+=`<tr>
      <th scope="row">${List[y]}`
    var arrayTest = reviewList[y]
    if(arrayTest[1]==99999)
        arrayTest[1] = "-"
    if(arrayTest[2]==99999)
        arrayTest[2]= "-"
    if(difference.includes(List[y]))
        arrayTest[2]= "-"
    for(let x=1;x<=length;x++)
    {
      if(colorsF[List[y]] == x)
        table+=`<td style="color: red">${colorsF[List[y]]}</td>`
      else
        table+=`<td> X </td>`
    }
    table+=`</th>`
    // table+=`
    // <td>${colorsF[List[y]]}</td>
    // <td>${arrayTest[1]}</td>`
    // table+=`<td>${arrayTest[2]}</td>
    //         <td>${arrayTest[3]}</td>
        
  }
  table+=`</tr></tbody>`
  document.getElementById("content").innerHTML = content
  document.getElementById("solveTable").innerHTML = table
 
  
}

function solve()
{
    // console.log(graphD);
    var flag
//     console.log();
    var length = document.getElementById("vertices").value
    for(let len=0;len<graphD.length;len++)
    {
        flag = false
        var elem = graphD[len].split(",")
        var first = elem[0]
        var second = elem[1]
        var firstPos = List.indexOf(first)
        var secondPos = List.indexOf(second)
        var array1 = reviewList[firstPos]
        var array2 = reviewList[secondPos]
        if(array2[2]>=array1[0])
            flag = true
        else
            flag = false
        solveArray.push(first+","+second+","+flag)
    }
    // console.log(solveArray);
}

function postOrder()
{
    // console.log(reviewList);
    for(let i = reviewList.length-1; i>=0; i--)
    {
        var min = reviewList[i]
        var fisrtNum = min[0]
        var secondNum = min[1]
        var thirdNum = min[2]
        if(min[2]=='-')
            thirdNum = 99999
        // console.log(thirdNum);
        var minNum = Math.min(fisrtNum,secondNum, thirdNum)
        // console.log(minNum);
        reviewList[i].push(minNum)
        if(i!=0 && reviewList[i-1].length<3)
            reviewList[i-1].push(minNum)
        
    }
    // console.log(reviewList);

}

function verify()
{
    //console.log(array);
    if(array[0].length==1)
        verifyArray.push(array[0])
    for(let i=0;i<searchReturn.length;i++)
    {
        for(let y=0;y<graphD.length;y++)
        {
            if(graphD[y].includes(searchReturn[i]+",")&& !spreeNode.includes(searchReturn[i]))
                spreeNode.push(searchReturn[i])
        }
        // console.log("Separate:" +separate[0]);
    }
}

function createList() {//cria uma lista de A-Z para representar os vértices escolhidos

    //create list A to Z
    for (let i = 65; i <= 90; i++) {
    const alphabet = String.fromCharCode(i);
    List.push(alphabet);
    }
}

function verificaTipo()//verificar regular, simples, multigrafo
{
  //verificar se é completo
  var visitedC = []
  var flagCompleto = true
  var completo = []; 
  for(let i=0; i<onlyLettersList.length; i++)
  {
    var teste = 0;
    var index1 = onlyLettersList[i].toString(); //a,b
    var index = index1.split(","); 
    var comeca = index[0];
    if(visitedC.includes(comeca))
      teste = 0
    else
    {
      visitedC.push(comeca)
      for(let y=i; y<onlyLettersList.length; y++)
      {
        if(onlyLettersList[y].includes(comeca+","))
          teste++
      }
    }
    if(teste!=0)
      completo.push(teste);
  }
  var tot = document.getElementById("vertices").value

  for(let z=0;z<completo.length;z++)
  {
      if(completo[z]!=tot-1)
        flagCompleto = false
    
  }
  if(flagCompleto==true)
  {
    grafoCompleto();
  }

}

var ListaCores = ["blue", "yellow", "red", "purple", "green", "pink", "orange", "black", "cyan", "gray"]
var GrafhCompleto = new Array();

function grafoCompleto()
{
    let i;
    for(i=0; i<length; i++)
    {
        GrafhCompleto.push(List[i]);
        GrafhCompleto.push(ListaCores[i]);
    }
    console.log(GrafhCompleto);
}

//criando um array com os vertices como indice
function MaiorPrimeiro()
{

    var totalColors = []
    for(let j=0;j<array.length;j++)
    {
       
       totalColors[List[j]] = array[j]
    }
    
    console.log(totalColors);
    colorsF = solution(totalColors)
    
}

//resolve a coloracao em si
function solution(graph) {

  // ordenando os vertices,keys: ex: [a,b,c] -> [0,1,2]
  var vertices = Object.keys(graph).sort((a, b) => graph[b].length - graph[a].length);
  
  // cria um vetor de "cores", o fill preenche todo o array com 0
  var colorsA = new Array(vertices.length).fill(0);
    
  // vértice maior recebe a primeira cor
  colorsA[vertices[0]] = 1;
  
  // atribuindo cores aos restantes
  for (let i = 1; i < vertices.length; i++) {
    var vertice = vertices[i];
    let colorNum = 1;//o metodo some verifica se ao menos 1 elemento combina com a condição
    while (graph[vertice].some(neighbor => colorsA[neighbor] === colorNum)) {
      colorNum++;
    }
    colorsA[vertice] = colorNum;
  }
  
  return colorsA;
}