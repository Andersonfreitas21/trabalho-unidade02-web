import React from 'react'
import { Wrapper, Title, Array, Button } from './ShoppingList.styles'
import Checkbox from '../../shared/Checkbox'

function ShoppingList({ title, products, onToggle }) {
  return <Wrapper>
    <Title>
      {title}:
    </Title>
    <Array>
      {
        products.map(product =>
          <Checkbox
            key={product.id}
            value={product.checked}
            title={product.name}
            onClick={() => onToggle(product.id, product.checked, product.name)}
          />
        )
      }
    </Array>
    <Button as="button"
      onClick={() => alert('It works!')}>
      Excluir
    </Button>
  </Wrapper>
}

export default ShoppingList
