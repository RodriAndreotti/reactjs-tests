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
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let ultimaCategoria = null;

        this.props.produtos.forEach((produto) => {
            if(produto.nome.indexOf(filterText) === -1) {
                return;
            }

            if(inStockOnly && !produto.stocked) {
                return;
            }

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
            <div className="table-reponsive">
                <table className="table table-striped">
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
            </div>
        )
    }
}

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return (
            
            <form>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={filterText} 
                    placeholder="Procurar..." 
                    onChange={this.handleFilterTextChange}/>
                </div>
                
                <div className="form-check">
                   
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={inStockOnly}
                        id="somenteEstoque" 
                        onChange={this.handleInStockChange}/>
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
    
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange} />
                <ProductTable 
                    produtos={this.props.produtos}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly} />
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