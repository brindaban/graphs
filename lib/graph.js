var g = {};
g.UndirectedGraph = function(){
	this.graph = {};
};
g.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(from,to){
		if(this.graph[from]==undefined) 
			this.addVertex(from);
		if(this.graph[to]==undefined) 
			this.addVertex(to);
		this.graph[from].push(to);
		this.graph[to].push(from);
	},
	hasEdgeBetween : function(from,to){
		return this.graph[from].indexOf(to) >= 0;
	}
}



module.exports = g;