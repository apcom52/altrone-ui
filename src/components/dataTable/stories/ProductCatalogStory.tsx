import { StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { useState } from 'react';
import { DataTable } from '../DataTable.tsx';
import { ShoppingCart, Copy, Archive, Pencil } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  active: boolean;
  accentColor: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    sku: 'AUD-001',
    category: 'Electronics',
    price: 249.99,
    stock: 143,
    rating: 4.7,
    active: true,
    accentColor: '#6366f1',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard TKL',
    sku: 'INP-002',
    category: 'Electronics',
    price: 129.0,
    stock: 58,
    rating: 4.5,
    active: true,
    accentColor: '#0ea5e9',
  },
  {
    id: 3,
    name: 'Ultra-Wide Monitor 34"',
    sku: 'DSP-003',
    category: 'Electronics',
    price: 699.0,
    stock: 12,
    rating: 4.8,
    active: true,
    accentColor: '#8b5cf6',
  },
  {
    id: 4,
    name: 'USB-C Hub 10-in-1',
    sku: 'ACC-004',
    category: 'Electronics',
    price: 59.99,
    stock: 0,
    rating: 4.2,
    active: false,
    accentColor: '#64748b',
  },
  {
    id: 5,
    name: 'Ergonomic Office Chair',
    sku: 'FRN-005',
    category: 'Home & Office',
    price: 389.0,
    stock: 31,
    rating: 4.6,
    active: true,
    accentColor: '#10b981',
  },
  {
    id: 6,
    name: 'Standing Desk 140×70 cm',
    sku: 'FRN-006',
    category: 'Home & Office',
    price: 549.0,
    stock: 7,
    rating: 4.4,
    active: true,
    accentColor: '#f59e0b',
  },
  {
    id: 7,
    name: 'LED Desk Lamp with USB',
    sku: 'LGT-007',
    category: 'Home & Office',
    price: 44.99,
    stock: 220,
    rating: 4.3,
    active: true,
    accentColor: '#f59e0b',
  },
  {
    id: 8,
    name: 'Bamboo Organiser Tray',
    sku: 'FRN-008',
    category: 'Home & Office',
    price: 29.0,
    stock: 0,
    rating: 3.9,
    active: false,
    accentColor: '#64748b',
  },
  {
    id: 9,
    name: 'Trail Running Shoes',
    sku: 'SPT-009',
    category: 'Sports',
    price: 119.0,
    stock: 84,
    rating: 4.6,
    active: true,
    accentColor: '#ef4444',
  },
  {
    id: 10,
    name: 'Yoga Mat Premium 6mm',
    sku: 'SPT-010',
    category: 'Sports',
    price: 49.99,
    stock: 162,
    rating: 4.5,
    active: true,
    accentColor: '#ec4899',
  },
  {
    id: 11,
    name: 'Protein Shaker Bottle',
    sku: 'SPT-011',
    category: 'Sports',
    price: 18.5,
    stock: 305,
    rating: 4.1,
    active: true,
    accentColor: '#14b8a6',
  },
  {
    id: 12,
    name: 'Resistance Band Set',
    sku: 'SPT-012',
    category: 'Sports',
    price: 24.99,
    stock: 3,
    rating: 4.4,
    active: true,
    accentColor: '#ef4444',
  },
  {
    id: 13,
    name: 'Merino Wool Crew-Neck',
    sku: 'CLO-013',
    category: 'Clothing',
    price: 79.0,
    stock: 48,
    rating: 4.7,
    active: true,
    accentColor: '#a78bfa',
  },
  {
    id: 14,
    name: 'Waterproof Hiking Jacket',
    sku: 'CLO-014',
    category: 'Clothing',
    price: 159.0,
    stock: 21,
    rating: 4.6,
    active: true,
    accentColor: '#0ea5e9',
  },
  {
    id: 15,
    name: 'Slim-Fit Chinos',
    sku: 'CLO-015',
    category: 'Clothing',
    price: 65.0,
    stock: 0,
    rating: 4.0,
    active: false,
    accentColor: '#64748b',
  },
  {
    id: 16,
    name: 'Clean Code (book)',
    sku: 'BKS-016',
    category: 'Books',
    price: 34.99,
    stock: 500,
    rating: 4.9,
    active: true,
    accentColor: '#f97316',
  },
  {
    id: 17,
    name: 'Atomic Habits (book)',
    sku: 'BKS-017',
    category: 'Books',
    price: 22.0,
    stock: 500,
    rating: 4.8,
    active: true,
    accentColor: '#f59e0b',
  },
  {
    id: 18,
    name: 'The Pragmatic Programmer',
    sku: 'BKS-018',
    category: 'Books',
    price: 39.99,
    stock: 245,
    rating: 4.8,
    active: true,
    accentColor: '#6366f1',
  },
  {
    id: 19,
    name: 'Portable Bluetooth Speaker',
    sku: 'AUD-019',
    category: 'Electronics',
    price: 89.0,
    stock: 67,
    rating: 4.3,
    active: true,
    accentColor: '#0ea5e9',
  },
  {
    id: 20,
    name: 'Webcam 4K Auto-Focus',
    sku: 'INP-020',
    category: 'Electronics',
    price: 149.0,
    stock: 4,
    rating: 4.5,
    active: true,
    accentColor: '#8b5cf6',
  },
  {
    id: 21,
    name: 'Foam Roller Deep Tissue',
    sku: 'SPT-021',
    category: 'Sports',
    price: 34.0,
    stock: 88,
    rating: 4.2,
    active: true,
    accentColor: '#14b8a6',
  },
  {
    id: 22,
    name: 'Wireless Charging Pad',
    sku: 'ACC-022',
    category: 'Electronics',
    price: 39.99,
    stock: 0,
    rating: 3.8,
    active: false,
    accentColor: '#64748b',
  },
];

// Stock badge: colored pill based on stock quantity
const StockBadge = ({ stock }: { stock: number }) => {
  const [bg, color, label] =
    stock === 0
      ? ['#fee2e2', '#b91c1c', 'Out of stock']
      : stock < 10
        ? ['#fef9c3', '#92400e', `Low · ${stock}`]
        : ['#dcfce7', '#15803d', `In stock · ${stock}`];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: 20,
        background: bg,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

// Star rating display
const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span style={{ fontSize: 13, color: '#f59e0b', whiteSpace: 'nowrap' }}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
      <span style={{ marginLeft: 4, color: 'var(--text-1)', fontSize: 11 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
};

// Product cell: color accent + name + SKU
const ProductCell = ({ name, sku, accentColor, active }: Product) => (
  <Flex direction="horizontal" gap="s" align="center">
    <div
      style={{
        width: 8,
        height: 36,
        borderRadius: 4,
        background: active ? accentColor : 'var(--border-2)',
        flexShrink: 0,
      }}
    />
    <div>
      <Text block weight="medium" style={{ opacity: active ? 1 : 0.5 }}>
        {name}
      </Text>
      <Text style={{ fontSize: 11, color: 'var(--text-1)' }}>{sku}</Text>
    </div>
  </Flex>
);

export const ProductCatalogStory: StoryObj<typeof Flex> = {
  name: 'Product Catalog — Selection & Bulk Actions',
  render: () => {
    const [data, setData] = useState(PRODUCTS);
    const [discountApplied, setDiscountApplied] = useState(false);

    const applyDiscount = (selected: Product[]) => {
      setData((prev) =>
        prev.map((p) =>
          selected.find((s) => s.id === p.id)
            ? { ...p, price: parseFloat((p.price * 0.9).toFixed(2)) }
            : p,
        ),
      );
      setDiscountApplied(true);
      setTimeout(() => setDiscountApplied(false), 2000);
    };

    const deactivate = (id: number) =>
      setData((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, active: false, accentColor: '#64748b' } : p,
        ),
      );

    return (
      <Flex direction="vertical" gap="l">
        <Flex direction="horizontal" gap="m" align="center">
          <Text size={5} weight="bold">
            Product Catalog
          </Text>
          {discountApplied && (
            <Text style={{ color: '#15803d', fontWeight: 600 }}>
              ✓ 10% discount applied
            </Text>
          )}
        </Flex>
        <DataTable
          data={data}
          rowsPerPage={10}
          selectable
          columns={[
            {
              accessor: 'name',
              label: 'Product',
              filterable: 'string',
              options: {
                renderReadMode: ({ item }) => (
                  <ProductCell {...(item as Product)} />
                ),
              },
              type: 'custom',
            },
            {
              accessor: 'category',
              label: 'Category',
              type: 'select',
              filterable: true,
              width: 140,
            },
            {
              accessor: 'price',
              label: 'Price',
              type: 'currency',
              sortable: true,
              filterable: true,
              width: 110,
              options: { currency: 'USD' },
            },
            {
              accessor: 'stock',
              label: 'Stock',
              sortable: true,
              filterable: true,
              type: 'custom',
              width: 140,
              options: {
                renderReadMode: ({ value }) => (
                  <StockBadge stock={value as number} />
                ),
              },
            },
            {
              accessor: 'rating',
              label: 'Rating',
              sortable: true,
              type: 'custom',
              width: 130,
              options: {
                renderReadMode: ({ value }) => (
                  <Stars rating={value as number} />
                ),
              },
            },
            {
              accessor: 'active',
              label: 'Active',
              type: 'boolean',
              filterable: true,
              width: 80,
            },
          ]}
          renderRowActions={({ row }) => {
            const product = row as Product;
            return (
              <DataTable.RowActions>
                <DataTable.RowAction
                  label="Edit"
                  icon={<Pencil size={14} />}
                  showLabel={false}
                  onClick={() => {}}
                />
                <DataTable.RowAction
                  label="Duplicate"
                  icon={<Copy size={14} />}
                  collapsed
                  onClick={() => {}}
                />
                <DataTable.RowAction
                  label="Deactivate"
                  icon={<Archive size={14} />}
                  collapsed
                  danger
                  onClick={() => deactivate(product.id)}
                />
              </DataTable.RowActions>
            );
          }}
        >
          {({ selectableMode, selectedItems }) => (
            <>
              {!selectableMode && (
                <DataTable.Action
                  label="Add Product"
                  icon={<ShoppingCart size={14} />}
                  onClick={() => {}}
                />
              )}
              {selectableMode && selectedItems.length > 0 && (
                <>
                  <DataTable.Action
                    label={`Apply 10% Discount (${selectedItems.length})`}
                    onClick={() => applyDiscount(selectedItems as Product[])}
                  />
                  <DataTable.Action
                    label={`Deactivate (${selectedItems.length})`}
                    onClick={() =>
                      (selectedItems as Product[]).forEach((p) =>
                        deactivate(p.id),
                      )
                    }
                  />
                </>
              )}
            </>
          )}
        </DataTable>
      </Flex>
    );
  },
};
