module.exports = ({ name, receiptId, desc, occupation }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<style>
h1{
text-align:center;
font-weight:600;
color:white;
}
.container{
display:flex;
width:100%;
justify-content:center;
align-items:center;
}
form{
width:300px;
background: #4B0082;
border:1px solid rgba(0, 128, 0, 0.3);
margin-left:200px;
border-radius:20px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.fields-data{
margin-bottom:5px;
}
</style>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div class="container">
     <form>
        <div class="fields-data">
          <h1>${name}</h1>
        </div>

        <div class="fields-data">
        <h1>${receiptId}</h1>
        </div>

        <div  class="fields-data">
          <h1>${desc}</h1>
        </div>

        <div  class="fields-data">
         <h1>${occupation}</h1>
        </div>

       
      </form>
    </div>
</body>
</html>
    `;
};
