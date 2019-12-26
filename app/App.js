import React, { Component } from 'react';


class ProductCategoryRow extends React.Component {
    render() {
        const categoria = this.props.categoria;

        return (
            <tr>
                <th colspan="2">{categoria}</th>
            </tr>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        const produto = this.props.produto;
        const nome = produto.stocked ? 
        produto.nome : 
            <span class='text-danger'>
                {produto.nome}
            </span>;

        return (
            <tr>
                <td>
                    {nome}
                </td>
                <td>
                    {produto.price}
                </td>
            </tr>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const rows = [];
        let ultimaCategoria = null;

        this.props.produtos.forEach((produto) => {
            if(produto.category !== ultimaCategoria) {
                ultimaCategoria = produto.category;
                rows.push(<ProductCategoryRow 
                    categoria={produto.category} 
                    key={produto.category} />
                );
            }

            rows.push(<ProductRow 
                produto={produto}
                key={produto.name} />
            );
            
            ultimaCategoria = produto.category;
        });

        return (
            <table class="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Procurar..."/>
                <p>
                    <label>
                        <input type="checkbox"/>
                        {' '}
                        Mostrar somente produtos em estoque
                    </label>
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />
                <ProductTable produtos={this.props.produtos} />
            </div>
        );
    }
}

const PRODUTOS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable produtos={PRODUTOS} />,
    document.getElementById('container')
);