const express=require('express');
const app=express();

app.use(express.static('dist/medIn/'));

app.get('*', function(req,res) {
    res.sendFile(path.resolve('dist/medIn/index.html'));
});



app.listen(7000,()=>{
    console.log('app running on 7000')
})
