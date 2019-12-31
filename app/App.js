import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';


class ProductCategoryRow extends React.Component {
    render() {
        const categoria = this.props.categoria;

        return (
            <tr>
                <th colSpan="2">{categoria}</th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const produto = this.props.produto;
        const nome = produto.stocked ? 
        produto.nome : 
            <span className='text-danger'>
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
                key={produto.nome} />
            );
            
            ultimaCategoria = produto.category;
        });

        return (
            <table className="table table-responsive table-striped">
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
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Procurar..."/>
                </div>
                
                <div className="form-check">
                   
                    <input type="checkbox" className="form-check-input" id="somenteEstoque"/>
                    {' '}
                    <label className="form-check-label" htmlFor="somenteEstoque">
                        Mostrar somente produtos em estoque
                    </label>
                </div>
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
  {category: 'Sporting Goods', price: '$49.99', stocked: true, nome: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, nome: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, nome: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, nome: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, nome: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, nome: 'Nexus 7'}
];

ReactDOM.render(
    (<FilterableProductTable produtos={PRODUTOS} />),
    document.getElementById('container')
);