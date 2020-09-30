import React from 'react';
import { Button } from './style';

export default function ({ title, onClick }) {
  return (
    <Button as="button" onClick={onClick}>
      {title}
    </Button>
  );
}
