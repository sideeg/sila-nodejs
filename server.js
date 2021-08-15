const app = require('express')();
const http = require('http').createServer(app);


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
});


//Socket Logic
const socketio = require('socket.io')(http)
app.post('/sendMessage',(reg,res) =>{
	let data = '';
	

	// res.write(JSON.parse(JSON.stringify(reg.body)));
	reg.on('data', chunk => {
		console.log(`Data chunk available: ${chunk}`)
		data += chunk;
	  })
	  reg.on('end', () => {
		console.log(`in the end data is : ${data}`);
		// console.log(JSON.parse(JSON.stringify(data).user)); // 'Buy the milk'
		console.log(JSON.parse(data));
		socketio.on("connection", (userSocket) => {
		userSocket.on("send_message", (data) => {
			userSocket.broadcast.emit("receive_message"+JSON.parse(data).user.id, data)
		})
		
	})
    	res.end();
	  })
	res.write("done");
	// res.end();
});


http.listen(5000);
console.log("running on port 5000......")