$(document).ready(function(){

    var products =[];
    $("#product-form").on("submit", addProductToCart);
    $("#cart-table").on("click", ".btn-danger", removeProuctFromCart);
    $("#generate-invoice").on("click", generateInvoice);

    function addProductToCart(event){
        event.preventDefault();

        var productName = $("#product-name").val();
        var productPrice = $("#product-price").val();

        if (productName !=="" && productPrice !== ""){
            var product ={
                name : productName,
                price : parseFloat(productPrice),
            };
            products.push(product);
            $("#cart-table tbody").append(
                "<tr><td>" + product.name+"</td><td>₹" + product.price.toFixed(2) + '</td><td><button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button></td></tr>'
            );

            updateTotalCost();
            $("#product-name").val("");
            $("#product-price").val("");
            }
        }

        function removeProuctFromCart(){
            var index = $(this).closest("tr").index();
            products.slice(index, 1);
            $(this).closest("tr").remove();
            updateTotalCost();
        }

        function updateTotalCost(){
            var totalCost =0;
            products.forEach(function(product){
                totalCost += product.price;
            });
            $("#total-cost").text("Total Cost: ₹"+ totalCost.toFixed(2));
        }

        function generateInvoice(){
            var invoice =`<html>
            <head>
              <title>Invoice</title>
              <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
              crossorigin="anonymous"
            />
            </head>
            <body>
              <div class="container mt-5">
                <h1 class="text-center">Invoice</h1>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Product Price</th>
                    </tr>
                  </thead>
                  <tbody>`;

                products.forEach(function(product){
                    invoice += "<tr><td>" + product.name +"</td><td>₹"+ product.price.toFixed(2);
                    "</td></tr>";
                });

                invoice += '</tbody></table><p class="text-right">Total Cost: ₹' + getTotalCost() + "</p></div></body><html>";

                var popup = window.open("", "_blank");
                popup.document.open();
                popup.document.write(invoice);
                popup.document.close();
        }

        function getTotalCost(){
            var totalCost =0;
            products.forEach(function(product){
                totalCost += product.price;
            });
            return totalCost.toFixed(2);
        }
    });