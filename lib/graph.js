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
	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	size : function(){
		var total = 0,self = this;
		Object.keys(this.graph).forEach(function(vertex){
			total += self.graph[vertex].length;
		});
		return total/2;
	}
}



module.exports = g;