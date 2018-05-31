var INFINITY = 1/0;

function DirectedGraph(){
  this.vertices = {};
  this.addVertex = function(name, edges){
    edges = edges || null;
    this.vertices[name] = edges;
  }
}

function findSmallest(dist, q) { 
  var min = Infinity;
  var minNode;

  for (var node in q) {
    if (dist[node] <= min) {
      min = dist[node]
      minNode = node;
    }
  }

  delete q[minNode]
  return minNode;
}

function djikstra(graph, startVertex,endVertex) { 
  var dist = {};
  var prev = {};
  var q = {};
  var shortestPaths = {};

  for (var vertex in graph.vertices) {
    dist[vertex] = INFINITY;
    prev[vertex] = null;
    q[vertex] = graph.vertices[vertex];
    shortestPaths[vertex] = [];
  }

  dist[startVertex] = 0;

  while (Object.keys(q).length !== 0) {
    var smallest = findSmallest(dist, q);
    var smallestNode = graph.vertices[smallest] 
    //searches for the vertex u in the vertex set Q that has the least dist[smallest] value.

    for (var neighbor in smallestNode) {
      var alt = dist[smallest] + smallestNode[neighbor];
      //smallestNode[neighbor] is the distance between smallest and neighbor
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt
        prev[neighbor] = smallest
      }
    }
  }

  getShortestPaths(prev, shortestPaths, startVertex, dist)

  return dist[endVertex];
    // shortestPaths: shortestPaths,
    // shortestDistances: dist
    
  
}

function getShortestPaths(previous, shortestPaths, startVertex, dist) { debugger
  for (var node in shortestPaths) {
    var path = shortestPaths[node];

    while(previous[node]) {
      path.push(node);
      node = previous[node];
    }

    //gets the starting node in there as well if there was a path from it
    if (dist[node] === 0) {
      path.push(node);
    } 
    path.reverse();
  }
}

var graph = new DirectedGraph();

// graph.addVertex('S', {V: 1, W: 4});
// graph.addVertex('W', {T: 3});
// graph.addVertex('V', {W: 2, T: 6});
// graph.addVertex('T');
// console.log(djikstra(graph, 'S'));

graph.addVertex('a',{b:4,h:8});
graph.addVertex('b',{a:4,c:8,h:11});
graph.addVertex('c',{b:8,d:7,f:4,i:2});

graph.addVertex('d',{c:7,e:9,f:14});
graph.addVertex('e',{d:9,f:10});
graph.addVertex('f',{c:4,d:14,e:10,g:2});
graph.addVertex('g',{f:2,h:1.i:6});
graph.addVertex('h',{a:8,b:11,g:1});
graph.addVertex('i',{c:2,g:6});




// ----------------------------------------------------------------------

function display(){
	var src = document.querySelector(".source").value;
	var dst = document.querySelector(".destination").value;
	var answer=djikstra(graph, src, dst);
	var cost=0;
	if(answer>2){
		cost=2*10+(answer-2)*6;
	}
	else{
		cost=answer*10;
	}

	alert("Shortest distance from "+ src + " to "+ dst +" is "+answer+" and Taxi fare is INR "+cost);


}

$("#sub").click(function(){
  alert("Input will be verified in the next 24 hours"});

