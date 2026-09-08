import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Label,
  Range,
  Select,
  Switcher,
  Text,
} from 'components';
import { Drawer } from '../Drawer.tsx';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  inStock: boolean;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Field Notebook', brand: 'Kraft', category: 'stationery', price: 12, inStock: true },
  { id: 2, name: 'Fountain Pen', brand: 'Kraft', category: 'stationery', price: 48, inStock: false },
  { id: 3, name: 'Desk Lamp', brand: 'Lumen', category: 'lighting', price: 89, inStock: true },
  { id: 4, name: 'Clip Lamp', brand: 'Lumen', category: 'lighting', price: 34, inStock: true },
  { id: 5, name: 'Ceramic Mug', brand: 'Terra', category: 'kitchen', price: 18, inStock: true },
  { id: 6, name: 'Pour-over Set', brand: 'Terra', category: 'kitchen', price: 64, inStock: false },
  { id: 7, name: 'Canvas Tote', brand: 'Haul', category: 'bags', price: 26, inStock: true },
  { id: 8, name: 'Weekender Bag', brand: 'Haul', category: 'bags', price: 140, inStock: true },
];

const CATEGORIES = [
  { value: 'stationery', label: 'Stationery' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bags', label: 'Bags' },
];

const BRANDS = ['Kraft', 'Lumen', 'Terra', 'Haul'];

type Filters = {
  maxPrice: number;
  categories: string[];
  brands: string[];
  inStockOnly: boolean;
};

const EMPTY: Filters = {
  maxPrice: 150,
  categories: [],
  brands: [],
  inStockOnly: false,
};

const matches = (product: Product, filters: Filters) => {
  if (product.price > filters.maxPrice) return false;
  if (filters.categories.length && !filters.categories.includes(product.category))
    return false;
  if (filters.brands.length && !filters.brands.includes(product.brand))
    return false;
  if (filters.inStockOnly && !product.inStock) return false;
  return true;
};

export const FilterPanelStory: StoryObj<typeof Drawer> = {
  name: 'Filter panel — scrollable body & footer',
  render: () => {
    const [applied, setApplied] = useState<Filters>(EMPTY);
    const [draft, setDraft] = useState<Filters>(EMPTY);

    const visible = PRODUCTS.filter((product) => matches(product, applied));
    const preview = PRODUCTS.filter((product) => matches(product, draft));

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 560 }}>
        <Flex direction="horizontal" justify="between" align="center">
          <Flex direction="vertical" gap="xs">
            <Text block size={7} weight="bold">
              Catalog
            </Text>
            <Text block size={3} color="muted">
              {visible.length} of {PRODUCTS.length} items
            </Text>
          </Flex>

          <Drawer
            title="Filters"
            placement="start"
            width={360}
            onClose={() => setDraft(applied)}
            content={
              <Form>
                <Form.Field
                  label={`Max price — $${draft.maxPrice}`}
                >
                  <Range
                    min={10}
                    max={150}
                    step={2}
                    value={draft.maxPrice}
                    onChange={(value) =>
                      setDraft((prev) => ({ ...prev, maxPrice: value }))
                    }
                  />
                </Form.Field>

                <Form.Field label="Categories">
                  <Select
                    multiple
                    placeholder="Any category"
                    options={CATEGORIES}
                    value={draft.categories}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        categories: (value as string[]) ?? [],
                      }))
                    }
                  />
                </Form.Field>

                <Form.Field label="Brands">
                  <Flex direction="vertical" gap="xs">
                    {BRANDS.map((brand) => (
                      <Checkbox
                        key={brand}
                        checked={draft.brands.includes(brand)}
                        onChange={(checked) =>
                          setDraft((prev) => ({
                            ...prev,
                            brands: checked
                              ? [...prev.brands, brand]
                              : prev.brands.filter((item) => item !== brand),
                          }))
                        }
                      >
                        {brand}
                      </Checkbox>
                    ))}
                  </Flex>
                </Form.Field>

                <Form.Field>
                  <Switcher
                    checked={draft.inStockOnly}
                    onChange={(checked) =>
                      setDraft((prev) => ({ ...prev, inStockOnly: checked }))
                    }
                  >
                    In stock only
                  </Switcher>
                </Form.Field>
              </Form>
            }
            footer={({ closeDrawer }) => (
              <Flex direction="horizontal" gap="s">
                <Button
                  label="Reset"
                  variant="text"
                  icon={<RotateCcw size={14} />}
                  onClick={() => setDraft(EMPTY)}
                />
                <Button
                  label={`Show ${preview.length}`}
                  variant="submit"
                  onClick={() => {
                    setApplied(draft);
                    closeDrawer();
                  }}
                />
              </Flex>
            )}
          >
            <Button label="Filters" icon={<SlidersHorizontal size={14} />} />
          </Drawer>
        </Flex>

        <Flex direction="vertical" gap="s">
          {visible.map((product) => (
            <Flex
              key={product.id}
              direction="horizontal"
              align="center"
              justify="between"
              gap="m"
            >
              <Flex direction="vertical" gap="xs">
                <Text block size={4} weight="medium">
                  {product.name}
                </Text>
                <Text block size={3} color="muted">
                  {product.brand}
                </Text>
              </Flex>
              <Flex direction="horizontal" align="center" gap="s">
                <Label variant="soft" size="s">
                  {product.category}
                </Label>
                {!product.inStock && (
                  <Label variant="soft" color="warning" size="s">
                    backorder
                  </Label>
                )}
                <Text size={4} weight="medium">
                  ${product.price}
                </Text>
              </Flex>
            </Flex>
          ))}
          {visible.length === 0 && (
            <Text block size={4} color="muted">
              Nothing matches these filters.
            </Text>
          )}
        </Flex>
      </Flex>
    );
  },
};
