var g = {};

var getAllEdges = function(graph){
	var edges = [];
	for( index in graph)
		edges = edges.concat(graph[index]);
	return edges;
};

var getCurrentSource = function(distances, fixedVertex){
	var leastCostVertex;
	for(var index in distances)
		if((!leastCostVertex || distances[index] < distances[leastCostVertex])&&fixedVertex.indexOf(index)==-1)
			leastCostVertex = index;
	return leastCostVertex;
};

var updateDistance = function(source, distances, graph, parent){
	var edges = graph[source];
	for(var index in edges){
		if(!distances[edges[index].to] || distances[edges[index].to] > distances[source]+edges[index].weight){
			distances[edges[index].to] = edges[index].weight;
			parent[edges[index].to] = edges[index];

		}
	}
	return distances;
};

g.WeightedGraph = function(){
	this.graph = {};
};

g.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(edge){
		this.graph[edge.from].push(edge); 
	},
	shortestPath : function(from,to){
		var fixedVertex = [],path = [],distances = {},parent={};
		parent[from] = {from:from};
		var existingEdges = getAllEdges(this.graph);
		distances[from] = 0;
		while(fixedVertex[fixedVertex.length-1]!=to && existingEdges.length!=0){
			var source = getCurrentSource(distances, fixedVertex);
			distances = updateDistance(source, distances,this.graph,parent);
			fixedVertex.push(source);
			existingEdges = existingEdges.filter(function(edge){
				return edge.from != source;
			});
		};
		if(!parent[to]) return path;
		while(currentParent != from){
			var currentParent = parent[to].from;
			path.unshift(parent[to]);
			to = parent[currentParent].to;
		}
		return path;
	}
};

g.Edge = function(edgeName,from,to,weight){
	this.name = edgeName;
	this.from = from;
	this.to = to;
	this.weight = weight;
}

module.exports = g;
