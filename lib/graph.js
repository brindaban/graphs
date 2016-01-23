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
	},
	pathBetween : function(from,to,traversing){
		var traversing = traversing || [from];
		if(traversing.indexOf(to)!= -1) return traversing;
		for(index in this.graph[from]){
			var vertex = this.graph[from][index];
			if(traversing.indexOf(vertex)==-1){
				var path = this.pathBetween(vertex,to,traversing.concat(vertex));
			}
			if(path && path.indexOf(to)!= -1) return path;
		}
		return [];
	},
	farthestVertex : function(from,traversing){
		var traversing = traversing || [from];
		for(index in this.graph[from]){
			var vertex = this.graph[from][index];
			if(traversing.indexOf(vertex)==-1){
				return this.farthestVertex(vertex,traversing.concat(vertex));
			}
		}
		return from;
	}
}

g.DirectedGraph = function(){
	this.graph = {};
};

g.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(from,to){
		this.graph[from].push(to);
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
		return total;
	},
	pathBetween : function(from,to,traversing){
		var traversing = traversing || [from];
		if(traversing.indexOf(to)!= -1) return traversing;
		for(index in this.graph[from]){
			var vertex = this.graph[from][index];
			if(traversing.indexOf(vertex)==-1){
				var path = this.pathBetween(vertex,to,traversing.concat(vertex));
			}
			if(path && path.indexOf(to)!= -1) return path;
		}
		return [];
	},
	farthestVertex : function(from,traversing){
		var traversing = traversing || [from];
		for(index in this.graph[from]){
			var vertex = this.graph[from][index];
			if(traversing.indexOf(vertex)==-1){
				return this.farthestVertex(vertex,traversing.concat(vertex));
			}
		}
		return from;
	}
}

module.exports = g;