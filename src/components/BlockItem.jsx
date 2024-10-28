import React from 'react';

const BlockItem = ({ block, onAddBlock }) => {
  const handleAddBlock = () => {
    onAddBlock(block);
  };

  return (
    <div className="block-item" onClick={handleAddBlock}>
      <span>{block.name}</span>
    </div>
  );
};

export default BlockItem;
