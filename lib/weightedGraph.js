
var g = {};

var getTotalCost = function(path){
	var value = 0;
	path.forEach(function(edge){
		value += edge.value;
	});
	return value;
}

var arrangeByWeight =function(firstEdge,secondEdge){
	return firstEdge.value > secondEdge.value;
}

var giveShortestPath = function(paths){
	return paths.sort(function(firstPath,secondPath){
		return getTotalCost(firstPath) > getTotalCost(secondPath);
	})[0];
}

g.WeightedGraph = function(){
	this.graph = {};
};

g.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = {};
	},
	addEdge : function(edge){
		if(this.graph[edge.from]==undefined) 
			this.addVertex(edge.from);
		this.graph[edge.from][edge.to] = this.graph[edge.from][edge.to] && this.graph[edge.from][edge.to].concat(edge)||[edge];
		this.graph[edge.from][edge.to].sort(arrangeByWeight);
	},
	shortestPath : function(from,to,traversing,paths,vertices){
		var paths = paths || [];
		var traversing = traversing || [];
		var vertices = vertices || [from];
		if(from==to) return traversing;
		for(var index in this.graph[from]){
			if(vertices.indexOf(index) == -1){
				var path = this.shortestPath(index,to,traversing.concat(this.graph[from][index][0]),paths,vertices.concat(index));
				if(path[path.length-1].to==to)
					paths.push(path);
			}
		}
		return giveShortestPath(paths);
	}
}

g.Edge = function(edgeName,from,to,value){
	this.name = edgeName;
	this.from = from;
	this.to = to;
	this.value = value;
}

module.exports = g;
