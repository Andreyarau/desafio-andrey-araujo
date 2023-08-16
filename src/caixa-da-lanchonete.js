class CaixaDaLanchonete {

  constructor() {
    this.cardapio = {
      cafe: { valor: 3.00 },
      chantily: { valor: 1.50 },
      suco: { valor: 6.20 },
      sanduiche: { valor: 6.50 },
      queijo: { valor: 2.00 },
      salgado: { valor: 7.25 },
      combo1: { valor: 9.50 },
      combo2: { valor: 7.50 }
    };
    this.metodoDePagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.metodoDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length == 0) {
      return "Não há itens no carrinho de compra!";
    }
    
    let listaDeCodigosPedidos = [];
      itens.forEach(element => {
        listaDeCodigosPedidos.push(element.split(',')[0]);
      });

    let valorTotal = 0;
    for (const itemString of itens) {
      const [codigo, quantidade] = itemString.split(',');
      const item = this.cardapio[codigo];
            
      if (!item) {
        return "Item inválido!";
      }

      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }
      
      if (codigo == "chantily") {       
        if (!listaDeCodigosPedidos.includes("café")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (codigo == "queijo"){
        if (!listaDeCodigosPedidos.includes("sanduiche")){
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (codigo == "combo1" || codigo == "combo2"){
        if(!listaDeCodigosPedidos.includes("cafe" || "suco" || "sanduiche" || "salgado")){
          return "Item não pode ser pedido como principal";
        }
      }

      valorTotal += item.valor * parseInt(quantidade, 10);
    }

    // Aplicar descontos e taxas
    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95; // Desconto de 5% para pagamento em dinheiro
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03; // Acréscimo de 3% para pagamento a crédito
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete }; 
