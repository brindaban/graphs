
var g = {};

var getTotalCost = function(path){
	var value = 0;
	path.forEach(function(edge){
		value += edge.value;
	});
	return value;
}

var isLessCost = function(path,recentPath){
	if(!path) return true;
	return getTotalCost(path) > getTotalCost(recentPath);
}

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
	shortestPath : function(from,to,traversing,vertices){
		var traversing = traversing || [];
		if(from==to) return traversing;
		for(var index = 0; index<this.graph[from].length; index++){
			var vertex = this.graph[from][index].to;
			var path = this.shortestPath(vertex,to,traversing.concat(this.graph[from][index]));
			if(path[path.length-1].to==to && isLessCost(shortestPath,path))
				var shortestPath = path;
		}
		return shortestPath;
	}
}

g.Edge = function(edgeName,from,to,value){
	this.name = edgeName;
	this.from = from;
	this.to = to;
	this.value = value;
}

module.exports = g;
