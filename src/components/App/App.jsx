import React, { useState, useEffect } from 'react';
import LineChart from '../../shared/LineChart';
import AppContainer from '../AppContainer/AppContainer';
import AppHeader from '../AppHeader';
import ShoppingList from '../ShoppingList';
import { Wrapper, Container } from './App.styles';
import extractPercentage from '../../utils/extractPercentage';
import Button from '../Button';
import api from '../../services/api';

function App() {
  const colors = ['#62CBC6', '#00ABAD', '#00858C', '#006073', '#004D61'];

  // Usando o State do Hook
  // Declarar uma nova variável de state, na qual chamaremos de "products" , "selectedProducts" , "totalPrice"
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Função para consultar na api fake json-server para obter e listar os produtos
  const loadProducts = async () => {
    try {
      const { data } = await api.get('/products');

      setProducts(data);
    } catch (err) {
      console.log('Erro interno');
    }
  };

  // Lista os produtos ao carregar o componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Monitora o estado do produto para marcar o checkbox
  useEffect(() => {
    const newSelectedProducts = products.filter((product) => product.checked);

    setSelectedProducts(newSelectedProducts);
  }, [products]);

  // Monitora o estado dos produtos selecionados e percorre a lista somando os valores de cada produto
  useEffect(() => {
    const total = selectedProducts
      .map((product) => product.price)
      .reduce((a, b) => a + b, 0);

    setTotalPrice(total);
  }, [selectedProducts]);

  // Função que alterna entre os produtos selecionados no checkbox
  function handleToggle(id) {
    const newProducts = products.map((product) =>
      product.id === id ? { ...product, checked: !product.checked } : product
    );
    setProducts(newProducts);
  }

  // Método que retorna o status da requisição ao remover um produto por id na API fake json-server
  const anAsyncFunction = async (id) => {
    const { status } = await api.delete(`products/${id}`);
    if (status !== 200) {
      throw new Error('Erro na conexão com o backend.');
    }
    return status;
  };

  // Método que recebe uma lista de produtos para deletar
  function removeByList(productsItems) {
    return Promise.all(
      productsItems.map(async (item) => {
        const response = await anAsyncFunction(item.id);
        return response;
      })
    );
  }

  const handleDelete = async () => {
    try {
      // Verifica se o produto está selecionado
      const productsIsChecked = products.filter(
        (product) => product.checked === true
      );

      // Remove a lista de produtos selecionados
      await removeByList(productsIsChecked);

      // Seta o estado dos novos produtos na grid principal
      const newProducts = products.filter(
        (product) => product.checked !== true
      );
      newProducts.map((product) => delete products['id'] === product.id);
      setProducts(newProducts);
    } catch (err) {
      console.log('Erro interno');
    }
  };

  return (
    <Wrapper>
      <Container>
        <AppHeader />
        <AppContainer
          left={
            <>
              <ShoppingList
                title="Produtos disponíveis"
                products={products}
                onToggle={handleToggle}
              />
              <Button title="Excluir" onClick={handleDelete} />
            </>
          }
          middle={
            <ShoppingList
              title="Sua lista de compras"
              products={selectedProducts}
              onToggle={handleToggle}
            />
          }
          right={
            <div>
              Estatisticas
              <LineChart
                color={colors[0]}
                title="Saudável"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes('healthy')
                  ).length
                )}
              />
              <LineChart
                color={colors[1]}
                title="Não tão saudável"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes('junk')
                  ).length
                )}
              />
              <LineChart
                color={colors[2]}
                title="Limpeza"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes('cleaning')
                  ).length
                )}
              />
              <LineChart
                color={colors[3]}
                title="Outros"
                percentage={extractPercentage(
                  selectedProducts.length,
                  selectedProducts.filter((product) =>
                    product.tags.includes('others')
                  ).length
                )}
              />
              <div style={{ marginTop: 12 }}>
                <h2 style={{ fontWeight: 400, fontSize: 12, color: '#00364A' }}>
                  Previsão de gastos:
                </h2>
                <div style={{ fontSize: 24 }}>
                  {totalPrice.toLocaleString('pt-br', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </div>
              </div>
            </div>
          }
        />
      </Container>
    </Wrapper>
  );
}

export default App;
