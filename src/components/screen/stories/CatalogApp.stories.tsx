import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Label,
  NavigationList,
  Screen,
  Skeleton,
  Splitter,
  Text,
  Toolbar,
} from 'components';
import { Plus, Star, X } from 'lucide-react';
import { screenMeta, useDemoSidebar } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Catalog app',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ── DummyJSON (https://dummyjson.com) — public, no key, CORS-enabled ── */

interface Category {
  slug: string;
  name: string;
}

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  reviews: Review[];
}

const API = 'https://dummyjson.com';
const money = (value: number) => `$${value.toFixed(2)}`;

const stockTone = (stock: number): 'success' | 'warning' | 'danger' =>
  stock === 0 ? 'danger' : stock < 20 ? 'warning' : 'success';

/* ── list column ─────────────────────────────────────────────── */

const ProductCard = ({
  product,
  selected,
  onOpen,
}: {
  product: Product;
  selected: boolean;
  onOpen: () => void;
}) => (
  <Box
    shape="rounded"
    material={selected ? 'translucent' : 'plate'}
    tone={selected ? 'accent' : 'neutral'}
    padding={12}
    pressable
    focusable
    role="button"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    style={{ cursor: 'pointer', width: '100%' }}
  >
    <Flex gap="m" align="center" style={{ width: '100%', minWidth: 0 }}>
      <img
        src={product.thumbnail}
        alt=""
        width={56}
        height={56}
        style={{
          borderRadius: 'var(--radius-m)',
          objectFit: 'cover',
          background: 'var(--gray-a3)',
          flexShrink: 0,
        }}
      />
      <Flex direction="vertical" gap="xxs" style={{ flex: 1, minWidth: 0 }}>
        <Text size={3} weight="medium" truncate block>
          {product.title}
        </Text>
        <Flex align="center" gap="s">
          <Text size={2} color="muted">
            {money(product.price)}
          </Text>
          <Flex align="center" gap="xxs">
            <Star size={12} fill="currentColor" />
            <Text size={2} color="muted">
              {product.rating.toFixed(1)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Label size="mini" variant="soft" color={stockTone(product.stock)}>
        {product.stock === 0 ? 'Out' : `${product.stock} left`}
      </Label>
    </Flex>
  </Box>
);

/* ── inspector column (Screen.Aside content) ─────────────────── */

const Field = ({ label, value }: { label: string; value: string }) => (
  <Flex justify="between" gap="m" align="start">
    <Text size={2} color="muted">
      {label}
    </Text>
    <Text size={2} style={{ textAlign: 'end' }}>
      {value}
    </Text>
  </Flex>
);

const ProductInspector = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const { width, height, depth } = product.dimensions;
  const hasDiscount = product.discountPercentage > 0;
  const wasPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <Flex
      direction="vertical"
      gap="m"
      style={{
        position: 'sticky',
        top: 'calc(var(--screen-header-height) + var(--space-content))',
      }}
    >
      <Flex justify="between" align="start" gap="s">
        <Text size={2} color="muted">
          Product details
        </Text>
        <Button
          variant="text"
          size="s"
          icon={<X />}
          showLabel={false}
          label="Close"
          onClick={onClose}
        />
      </Flex>

      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          objectFit: 'cover',
          borderRadius: 'var(--radius-l)',
          background: 'var(--gray-a3)',
        }}
      />

      <Flex direction="vertical" gap="xxs">
        <Text size={5} weight="bold" block>
          {product.title}
        </Text>
        {product.brand ? (
          <Text size={2} color="muted" block>
            {product.brand}
          </Text>
        ) : null}
      </Flex>

      <Flex align="center" gap="s">
        <Text size={6} weight="bold">
          {money(product.price)}
        </Text>
        {hasDiscount ? (
          <>
            <Text size={3} color="muted" deleted>
              {money(wasPrice)}
            </Text>
            <Label size="mini" variant="soft" color="success">
              −{Math.round(product.discountPercentage)}%
            </Label>
          </>
        ) : null}
      </Flex>

      <Flex align="center" gap="s" wrap>
        <Flex align="center" gap="xxs">
          <Star size={14} fill="currentColor" />
          <Text size={3}>{product.rating.toFixed(1)}</Text>
        </Flex>
        <Label size="mini" variant="soft" color={stockTone(product.stock)}>
          {product.availabilityStatus}
        </Label>
      </Flex>

      <Text size={3} color="muted" block lineClamp={4}>
        {product.description}
      </Text>

      <Divider />

      <Flex direction="vertical" gap="s">
        <Field label="SKU" value={product.sku} />
        <Field label="In stock" value={`${product.stock}`} />
        <Field label="Min. order" value={`${product.minimumOrderQuantity}`} />
        <Field label="Weight" value={`${product.weight} kg`} />
        <Field label="Dimensions" value={`${width} × ${height} × ${depth} cm`} />
        <Field label="Warranty" value={product.warrantyInformation} />
        <Field label="Shipping" value={product.shippingInformation} />
        <Field label="Returns" value={product.returnPolicy} />
      </Flex>

      {product.tags.length > 0 ? (
        <Flex gap="xs" wrap>
          {product.tags.map((tag) => (
            <Label key={tag} size="mini" variant="outline">
              {tag}
            </Label>
          ))}
        </Flex>
      ) : null}

      {product.reviews.length > 0 ? (
        <>
          <Divider />
          <Text size={2} color="muted" block>
            Recent reviews
          </Text>
          <Flex direction="vertical" gap="s">
            {product.reviews.slice(0, 3).map((review, i) => (
              <Box
                key={i}
                shape="rounded"
                material="plate"
                padding={10}
                style={{ width: '100%' }}
              >
                <Flex direction="vertical" gap="xxs">
                  <Flex align="center" gap="s">
                    <Flex align="center" gap="xxs">
                      <Star size={12} fill="currentColor" />
                      <Text size={2}>{review.rating}</Text>
                    </Flex>
                    <Text size={2} color="muted" truncate block>
                      {review.reviewerName}
                    </Text>
                  </Flex>
                  <Text size={2} block>
                    {review.comment}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Flex>
        </>
      ) : null}
    </Flex>
  );
};

/* ── the screen ──────────────────────────────────────────────── */

/**
 * A three-pane store admin on a live REST API (DummyJSON). `Screen.Sidebar`
 * lists product categories; `Screen.Content` is the product list for the
 * active one; `Screen.Aside` holds the selected product's inspector — a full,
 * consumer-owned detail view.
 *
 * `Screen.Aside` itself is just a zone: below the fixed header, shares the row
 * with Content, no background. It has no resize logic of its own — the
 * draggable boundary comes from wrapping `Screen.Content` and `Screen.Aside`
 * each in a `Splitter.Panel`. The inspector panel is `collapsible`, so it can
 * be dragged shut; `Screen`'s greedy content-area rule lets the bare
 * `<Splitter>` land in the content row with no `gridArea` of its own.
 */
export const CatalogApp: StoryObj<typeof Screen> = {
  name: 'Catalog app (three-pane)',
  render: () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [activeCategory, setActiveCategory] = useState('smartphones');
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [error, setError] = useState(false);
    const sidebar = useDemoSidebar('lg');

    useEffect(() => {
      let cancelled = false;
      fetch(`${API}/products/categories`)
        .then((response) => response.json())
        .then((data: Category[]) => {
          if (!cancelled) setCategories(data.slice(0, 9));
        })
        .catch(() => {
          if (!cancelled) setError(true);
        });
      return () => {
        cancelled = true;
      };
    }, []);

    useEffect(() => {
      let cancelled = false;
      setLoadingProducts(true);
      setSelectedId(null);
      fetch(`${API}/products/category/${activeCategory}?limit=0`)
        .then((response) => response.json())
        .then((data: { products: Product[] }) => {
          if (cancelled) return;
          setProducts(data.products);
          setLoadingProducts(false);
        })
        .catch(() => {
          if (cancelled) return;
          setError(true);
          setLoadingProducts(false);
        });
      return () => {
        cancelled = true;
      };
    }, [activeCategory]);

    const selected =
      products?.find((product) => product.id === selectedId) ?? null;

    const categoryLabel =
      categories?.find((category) => category.slug === activeCategory)?.name ??
      activeCategory;

    return (
      <Screen title="Catalog" mobileBreakpoint="lg">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            {sidebar.showToggle ? (
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={sidebar.collapsed}
                  onClick={sidebar.toggle}
                />
              </Toolbar.Group>
            ) : (
              <Toolbar.Logo>
                <img
                  src="https://dummyjson.com/icon/1/64"
                  width={32}
                  height={32}
                  alt=""
                  style={{ borderRadius: 8 }}
                />
              </Toolbar.Logo>
            )}
            <Toolbar.Title label="Catalog" />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.SearchAction showLabel={false} />
              <Toolbar.Action label="Add product" icon={<Plus />} />
            </Toolbar.Group>
            <Toolbar.Group>
              <Avatar firstName="Ada" lastName="Lovelace" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar
          collapsed={sidebar.collapsed}
          onClose={sidebar.onClose}
        >
          <NavigationList>
            <NavigationList.Group title="Categories">
              {categories === null && !error
                ? [...Array(6)].map((_, i) => (
                    <div key={i} style={{ padding: '6px 10px' }}>
                      <Skeleton height="20px" radius="var(--radius-s)" />
                    </div>
                  ))
                : (categories ?? []).map((category) => (
                    <NavigationList.Link
                      key={category.slug}
                      href="#"
                      label={category.name}
                      selected={category.slug === activeCategory}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveCategory(category.slug);
                      }}
                    />
                  ))}
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>

        <Splitter>
          <Splitter.Panel min={40}>
            <Screen.Content>
              <Flex direction="vertical" gap="m">
                <Flex align="end" gap="s">
                  <Text
                    size={6}
                    weight="bold"
                    block
                    style={{ textTransform: 'capitalize' }}
                  >
                    {categoryLabel}
                  </Text>
                  {products ? (
                    <Text size={3} color="muted">
                      {products.length} products
                    </Text>
                  ) : null}
                </Flex>

                {error ? (
                  <Text size={3} color="danger" block>
                    Could not reach dummyjson.com — check the connection and
                    reload.
                  </Text>
                ) : loadingProducts || !products ? (
                  <Flex direction="vertical" gap="s">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} height="80px" radius="var(--radius-l)" />
                    ))}
                  </Flex>
                ) : (
                  <Flex direction="vertical" gap="s">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selected={product.id === selectedId}
                        onOpen={() => setSelectedId(product.id)}
                      />
                    ))}
                  </Flex>
                )}
              </Flex>
            </Screen.Content>
          </Splitter.Panel>

          <Splitter.Panel defaultSize={34} min={24} max={46} collapsible>
            <Screen.Aside>
              {selected ? (
                <ProductInspector
                  product={selected}
                  onClose={() => setSelectedId(null)}
                />
              ) : (
                <Flex
                  direction="vertical"
                  align="center"
                  gap="xs"
                  style={{ paddingBlock: 'var(--space-section)' }}
                >
                  <Text size={3} color="muted">
                    Select a product
                  </Text>
                  <Text size={2} color="muted">
                    Its full detail opens here.
                  </Text>
                </Flex>
              )}
            </Screen.Aside>
          </Splitter.Panel>
        </Splitter>

        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              {products
                ? `${products.length} products in ${categoryLabel}`
                : 'Loading…'}
            </Text>
            <Text size={2} color="muted">
              Live data · dummyjson.com
            </Text>
          </Flex>
        </Screen.Footer>
      </Screen>
    );
  },
};
